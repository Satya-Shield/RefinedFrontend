import React from "react";
import {
  FaCheckCircle,
  FaBrain,
  FaBolt,
  FaCogs,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

const ResponseCard = ({
  idx,
  total,
  colorScheme,
  IconComponent,
  response,
  handleNext,
  handlePrev,
}) => {
  const techniques = response.techniques || [];
  const sources = response.sources || [];
  const checklist = response.checklist || [];
  const confidenceBar = response.confidence || 0;

  return (
    <div
      key={idx}
      className={`w-full ${colorScheme.border} p-4 rounded-2xl ${colorScheme.gradient} ${colorScheme.bg} shadow-elegant max-h-[83vh] overflow-y-auto response-card-scrollbar`}
    >
      {/* Claim */}
      <div className="mb-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-2">
            <FaBolt className="w-4 h-4" />
            <h3 className="text-sm uppercase tracking-wider">Claim To Check</h3>
          </div>
          <div className="flex-col gap-x-1 items-center justify-center">
            <div className="flex gap-x-1 text-[13px]">
              {total > 1 && (
                <button onClick={handlePrev}>
                  <FaArrowLeft />
                </button>
              )}
              {total > 1 && (
                <button onClick={handleNext}>
                  <FaArrowRight />
                </button>
              )}
            </div>
            <div className="text-[12px] h-fit text-center">
              {idx + 1}/{total}
            </div>
          </div>
        </div>
        <div
          className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-4`}
        >
          <p className="text-foreground text-lg leading-relaxed">
            "{response.claim}"
          </p>
        </div>
      </div>

      {/* Verdict & Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <FaShieldAlt className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
              Verdict
            </h4>
          </div>
          <div className="h-full pb-3 flex justify-center items-center">
            <div
              className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-3 w-full h-fit`}
            >
              <div className="flex items-center gap-2">
                <IconComponent className={`w-6 h-6 ${colorScheme.textAccent}`} />
                <span
                  className={`text-xl font-medium ${colorScheme.textAccent}`}
                >
                  {response.verdict}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaBolt className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
              Confidence Level
            </h4>
          </div>
          <div
            className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-3`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-2xl font-bold ${colorScheme.textAccent}`}>
                {confidenceBar}%
              </span>
              <span className="text-sm text-muted-foreground">Certainty</span>
            </div>
            <div className="w-full h-2 bg-muted/40 rounded-full overflow-hidden">
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
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCogs className="w-4 h-4" />
            <h4 className="text-sm uppercase tracking-wider">
              Analysis Techniques
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {techniques.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-card/80 border border-border text-muted-foreground text-sm rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Explanation */}
      {response.explanation && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaBrain className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm uppercase tracking-wider text-purple-400">
              AI Analysis
            </h4>
          </div>
          <div className="bg-card/50 border border-border rounded-xl p-4">
            <p className="text-muted-foreground">{response.explanation}</p>
          </div>
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaExternalLinkAlt className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm uppercase tracking-wider text-cyan-400">
              Sources
            </h4>
          </div>
          <div className="bg-card/50 border border-border rounded-xl p-4 space-y-2">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-cyan-300 transition-colors break-words"
              >
                <span>{index + 1}.</span>
                {source}
                <FaExternalLinkAlt className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      {checklist.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="w-4 h-4" />
            <h4 className="text-sm uppercase tracking-wider">
              Verification Checklist
            </h4>
          </div>
          <div className="bg-card/50 border border-border rounded-xl p-4 space-y-2">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs text-accent-foreground">
                  {idx + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseCard;
