import React, { useState, useEffect } from "react";
import { 
    FaCheckCircle, 
    FaTimesCircle, 
    FaExclamationTriangle, 
    FaBrain, 
    FaBolt, 
    FaShieldAlt, 
    FaExternalLinkAlt,
    FaCogs,
    FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa';

const BackendResponse = ({ jsonResponse }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [confidenceBar, setConfidenceBar] = useState(0);

    if (!jsonResponse || jsonResponse.length === 0) return null;

    // Sanitize response data to handle backend issues (e.g., np.float64)
    const sanitizeResponse = (response) => {
        if (!response) return null;
        
        return {
            ...response,
            verdict: response.verdict === false || response.verdict === 'false' ? 'False' : 
                     response.verdict === true || response.verdict === 'true' ? 'True' : 
                     String(response.verdict || 'Unknown'),
            claim: String(response.claim || 'No claim provided'),
            explanation: String(response.explanation || 'No explanation available'),
            confidence_score: typeof response.confidence_score === 'number' ? response.confidence_score : 
                            typeof response.confidence === 'number' ? response.confidence : 0,
            techniques: Array.isArray(response.techniques) ? response.techniques : [],
            sources: Array.isArray(response.sources) ? response.sources : [],
            checklist: Array.isArray(response.checklist) ? response.checklist : [],
        };
    };

    const getColorScheme = (claim) => {
        if (!claim) return null;

        if (claim.verdict === "True") {
            return {
                gradient: 'from-emerald-50 to-green-50',
                border: 'border-gray-300',
                icon: FaCheckCircle,
                accentBg: 'bg-emerald-50',
                accentBorder: 'border-emerald-200',
                textAccent: 'text-emerald-600',
                progressBg: 'bg-emerald-500',
            };
        } else if (claim.verdict === "False") {
            return {
                gradient: 'from-red-900 to-rose-900',
                border: 'border-gray-300',
                icon: FaTimesCircle,
                accentBg: 'bg-red-50',
                accentBorder: 'border-red-200',
                textAccent: 'text-red-600',
                progressBg: 'bg-red-500',
            };
        } else {
            return {
                gradient: 'from-amber-50 to-yellow-50',
                border: 'border-gray-300',
                icon: FaExclamationTriangle,
                accentBg: 'bg-amber-50',
                accentBorder: 'border-amber-200',
                textAccent: 'text-amber-600',
                progressBg: 'bg-amber-500',
            };
        }
    };

    useEffect(() => {
        if (jsonResponse[currentIndex]) {
            setConfidenceBar(0);
            const timer = setTimeout(() => {
                const confidence = jsonResponse[currentIndex].confidence_score || 
                                 jsonResponse[currentIndex].confidence || 0;
                
               
                const confidenceValue = confidence <= 1 
                    ? Math.round(confidence * 100) 
                    : Math.round(confidence);
                
                setConfidenceBar(confidenceValue);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [jsonResponse, currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? jsonResponse.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === jsonResponse.length - 1 ? 0 : prev + 1
        );
    };

    const response = sanitizeResponse(jsonResponse[currentIndex]);
    
    // Safety check
    if (!response) {
        return (
            <div className="text-center p-8 text-red-600">
                Error: Invalid response data
            </div>
        );
    }
    
    const colorScheme = getColorScheme(response);
    
    // Additional safety check for colorScheme
    if (!colorScheme) {
        return (
            <div className="text-center p-8 text-red-600">
                Error: Unable to determine verdict color scheme
            </div>
        );
    }
    
    const IconComponent = colorScheme.icon;
    const techniques = response.techniques || [];
    const sources = response.sources || [];
    const checklist = response.checklist || [];

    return (
        <div className="relative flex flex-col items-center w-full mx-auto">
            {/* Response Card */}
            <div className="w-full pr-2">
                <div
                    className={`${colorScheme.border} relative p-8 rounded-3xl border 
                    bg-gradient-to-b from-[#fffdf7] to-[#fef9ed] 
                    shadow-[0_4px_25px_rgba(0,0,0,0.07)] border-[#ede8da] 
                    w-full backdrop-blur-md`}
                >
                    {/* Navigation Controls - Top Right */}
                    {jsonResponse.length > 1 && (
                        <div className="absolute top-4 right-4 flex items-center gap-3">
                            <button
                                onClick={handlePrev}
                                className="flex items-center justify-center w-8 h-8 bg-white/60 backdrop-blur-xl hover:bg-white/80 border border-gray-300/40 rounded-lg text-gray-700 transition-all duration-200 shadow-sm"
                            >
                                <FaArrowLeft className="w-3 h-3" />
                            </button>
                            
                            <div className="text-gray-600 text-sm font-medium">
                                {currentIndex + 1} / {jsonResponse.length}
                            </div>
                            
                            <button
                                onClick={handleNext}
                                className="flex items-center justify-center w-8 h-8 bg-white/60 backdrop-blur-xl hover:bg-white/80 border border-gray-300/40 rounded-lg text-gray-700 transition-all duration-200 shadow-sm"
                            >
                                <FaArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    )}

                    <div className="relative space-y-4">
                        {/* Claim Header */}
                        <div className="flex items-center gap-2">
                            <FaBolt className="w-4 h-4 text-blue-500" />
                            <h3 className="text-sm uppercase tracking-wider text-blue-500 font-semibold">Claim To Check</h3>
                        </div>

                        {/* Claim */}
                        <div className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-6`}>
                            <p className="text-gray-800 leading-relaxed text-lg">
                                "{response.claim}"
                            </p>
                        </div>

                        {/* Verdict & Confidence */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaShieldAlt className="w-4 h-4 text-gray-600" />
                                    <h4 className="text-sm uppercase tracking-wider text-gray-600 font-semibold">Verdict</h4>
                                </div>
                                <div className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-4`}>
                                    <div className="flex items-center gap-3">
                                        <IconComponent className={`w-6 h-6 ${colorScheme.textAccent}`} />
                                        <span className={`text-xl font-medium ${colorScheme.textAccent}`}>
                                            {response.verdict}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaBolt className="w-4 h-4 text-gray-600" />
                                    <h4 className="text-sm uppercase tracking-wider text-gray-600 font-semibold">Confidence Level</h4>
                                </div>
                                <div className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-2xl font-bold ${colorScheme.textAccent}`}>{confidenceBar}%</span>
                                        <span className="text-sm text-gray-600">Certainty</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className={`${colorScheme.progressBg} h-2 rounded-full transition-all duration-700`} 
                                            style={{ width: `${confidenceBar}%` }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Techniques */}
                        {techniques.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaCogs className="w-4 h-4 text-indigo-500" />
                                    <h4 className="text-sm uppercase tracking-wider text-indigo-500 font-semibold">Analysis Techniques</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {techniques.map((technique, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white/50 border border-gray-200/60 text-gray-700 text-sm rounded-lg backdrop-blur-sm hover:bg-white/70 transition-colors duration-200"
                                        >
                                            {technique}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* AI Analysis */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FaBrain className="w-4 h-4 text-purple-500" />
                                <h4 className="text-sm uppercase tracking-wider text-purple-500 font-semibold">AI Analysis</h4>
                            </div>
                            <div className="bg-white/50 border border-gray-200/60 rounded-xl p-6 backdrop-blur-sm">
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {response.explanation}
                                </p>
                            </div>
                        </div>

                        {/* Sources */}
                        {sources.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaExternalLinkAlt className="w-4 h-4 text-cyan-500" />
                                    <h4 className="text-sm uppercase tracking-wider text-cyan-500 font-semibold">Sources</h4>
                                </div>

                                <div className="bg-white/50 border border-gray-200/60 rounded-xl p-6 space-y-3 backdrop-blur-sm">
                                    {sources.map((source, index) => (
                                        <div key={index} className="flex items-center gap-3 group">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center">
                                                <span className="text-xs text-cyan-600 font-medium">{index + 1}</span>
                                            </div>
                                            <a
                                                href={source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-gray-700 hover:text-cyan-600 transition-colors duration-200 group-hover:underline decoration-cyan-400 break-words"
                                            >
                                                {source}
                                                <FaExternalLinkAlt className="inline w-3 h-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Checklist */}
                        {checklist.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="w-4 h-4 text-emerald-500" />
                                    <h4 className="text-sm uppercase tracking-wider text-emerald-500 font-semibold">Verification Checklist</h4>
                                </div>
                                <div className="bg-white/50 border border-gray-200/60 rounded-xl p-4 space-y-3 backdrop-blur-sm">
                                    {checklist.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center mt-0.5">
                                                <span className="text-xs text-cyan-600 font-medium">{index + 1}</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackendResponse;
