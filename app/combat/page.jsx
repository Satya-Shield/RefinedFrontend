"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchInput";
import BackendResponse from "@/components/BackendResponse";
import FeatureCards from "@/components/FeatureCards";
import { useSearchParams } from "next/navigation"; 
import { useSession } from "next-auth/react";

const Combat = () => {
  const searchParams = useSearchParams();
  const { data : session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [jsonResponse, setJsonResponse] = useState([
    {
      claim: "Everything seen on the internet is true.",
      verdict: "False",
      confidence: 75,
      explanation:
        "False. The claim that everything on the internet is true is fundamentally incorrect. The internet is an open platform containing a vast mix of accurate information, opinions, satire, errors, and deliberate misinformation. The provided evidence ironically supports this verdict through satire. One source sarcastically states to believe everything [1], while another uses a fake Abraham Lincoln quote to demonstrate the absurdity of the claim [2]. The core principle of digital literacy is to critically evaluate, question, and verify information found online rather than accepting it at face value.",
      techniques: ["Cross-referencing", "Scientific consensus", "Source reliability"],
      sources: [
        "https://www.quora.com/Is-it-true-that-you-can-and-should-trust-everything-that-you-read-on-the-internet",
        "https://developersalliance.org/2019-11-18-everything-you-see-on-the-internet-is-true-abraham-lincoln/",
      ],
      checklist: [
        "Check if the source is peer-reviewed",
        "Look for scientific consensus",
        "Verify with health organizations",
      ],
    },
  ]);

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    }
  }, [searchParams]);

  const saveHistory = async(respSave)=>{
    if(!session){
      return;
    }
    try{
      await fetch('/api/history',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(respSave)
    });
      console.log('History aayi hai');
    }catch(error){
      console.log('Nahi save hui history')
    }

  }

  
  const verifyAPI = async (query) => {
    console.log("Handling request for the basic query type");
    setLoading(true);
    try {
      const res = await fetch("https://satyashield-backend-60le.onrender.com/api/run_agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`Error gaining response from /api/run_agent ${res.status}`);

      const data = await res.json();
      console.log(data);
      setJsonResponse(data);
      await saveHistory(data);
    } catch (err) {
      console.error("Error hai code mei:", err);
      setJsonResponse([
        {
          claim: query,
          verdict: "Error",
          confidence: 0,
          explanation:
            "There has been an error from our end. We will be right back with your query verification!",
          techniques: [],
          sources: [],
          checklist: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const verifyImageAPI = async (file, query) => {
    console.log("Handling request for the image");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("query", query);

      const res = await fetch("https://satyashield-backend-60ie.onrender.com/api/read_image_file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Error from handling image ${res.status}`);

      const data = await res.json();
      console.log("From image verification", data);
      setJsonResponse(data);
      await saveHistory(data);
    } catch (err) {
      console.error("From image verification", err);
      setJsonResponse([
        {
          claim: `Image verification, ${query}`,
          verdict: `Error`,
          confidence: 0,
          explanation:
            "There has been an error from our end. We will be right back with your image verification!",
          techniques: [],
          sources: [],
          checklist: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const verifyImageUrlAPI = async (imageUrl, query) => {
    console.log("Sending request for the url");
    setLoading(true);
    try {
      const res = await fetch("https://satyashield-backend-60le.onrender.com/api/read_image_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, image: imageUrl }),
      });

      if (!res.ok) throw new Error(`Error from image url handling ${res.status}`);

      const data = await res.json();
      console.log("From url results", data);
      setJsonResponse(data);
      await saveHistory(data)
    } catch (err) {
      console.error("Error in URL verification", err);
      setJsonResponse([
        {
          claim: `URL verification : ${query}`,
          verdict: `Error`,
          confidence: 0,
          explanation:
            "There has been some error from our end. We will be right back with your url verification!",
          techniques: [],
          sources: [],
          checklist: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    console.log("Hello from handle search");
    const { query, file, url } = searchData;

    if (file) {
      console.log("We will be verifying the image file");
      verifyImageAPI(file, query);
    } else if (url) {
      console.log("We will be verifying the url file");
      verifyImageUrlAPI(url, query);
    } else {
      console.log("We will be verifying the basic query type");
      verifyAPI(query);
    }

    setSearchQuery(query);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedUrl("");
  };

  const handleUrlSelect = (url) => {
    setSelectedUrl(url);
    setSelectedFile(null);
  };

  const handleClearFile = () => setSelectedFile(null);
  const handleClearUrl = () => setSelectedUrl("");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base Light Beige Gradient Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25">
      </div>

      {/* Subtle Circular Gradient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Top Left - Large Diffuse Glow */}
        <div className="absolute -top-60 -left-60 w-[1000px] h-[1000px] rounded-full opacity-25"
             style={{ 
               background: 'radial-gradient(circle at 60% 40%, rgba(245,245,220,0.15) 0%, rgba(255,228,181,0.08) 30%, rgba(255,248,220,0.04) 60%, transparent 100%)',
               filter: 'blur(150px)'
             }}>
        </div>
        
        {/* Top Right - Medium Diffuse Glow */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-20"
             style={{ 
               background: 'radial-gradient(circle at 40% 60%, rgba(245,245,220,0.12) 0%, rgba(255,228,181,0.06) 40%, rgba(255,248,220,0.03) 70%, transparent 100%)',
               filter: 'blur(120px)'
             }}>
        </div>
        
        {/* Bottom Left - Subtle Glow */}
        <div className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full opacity-15"
             style={{ 
               background: 'radial-gradient(circle at 70% 30%, rgba(245,245,220,0.1) 0%, rgba(255,228,181,0.05) 50%, transparent 100%)',
               filter: 'blur(100px)'
             }}>
        </div>
        
        {/* Bottom Right - Soft Glow */}
        <div className="absolute -bottom-40 -right-60 w-[600px] h-[600px] rounded-full opacity-18"
             style={{ 
               background: 'radial-gradient(circle at 30% 70%, rgba(245,245,220,0.08) 0%, rgba(255,228,181,0.04) 60%, transparent 100%)',
               filter: 'blur(110px)'
             }}>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="w-full flex flex-col lg:flex-row lg:items-start gap-8 px-6 pt-12">
          <div className="flex flex-col space-y-6 lg:w-1/2 mt-0">
            <div className="-mt-20">
              <SearchInput
                onSearch={handleSearch}
                loading={loading}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFile={selectedFile}
                selectedUrl={selectedUrl}
                onClearFile={handleClearFile}
                onClearUrl={handleClearUrl}
              />
            </div>
            <div className="-mt-5">
              <FeatureCards onFileSelect={handleFileSelect} onUrlSelect={handleUrlSelect} />
            </div>
          </div>

          <div className="flex justify-center lg:justify-start lg:w-1/2 -mt-8">
            {jsonResponse && (
              <div className="mt-6">
                <BackendResponse jsonResponse={jsonResponse} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Combat;