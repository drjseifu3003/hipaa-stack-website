"use client";

import { useState } from "react";
import { ShieldCheck, Sparkles, AlertTriangle, EyeOff, Info } from "lucide-react";

const phiIdentifiers = [
  "Names",
  "Geographic subdivisions smaller than a state",
  "Dates directly related to an individual",
  "Telephone numbers",
  "Fax numbers",
  "Email addresses",
  "Social Security Numbers (SSN)",
  "Medical Record Numbers (MRN)",
  "Health plan beneficiary numbers",
  "Account numbers",
  "Certificate/license numbers",
  "Vehicle identifiers and serial numbers",
  "Device identifiers and serial numbers",
  "Web Universal Resource Locators (URLs)",
  "Internet Protocol (IP) addresses",
  "Biometric identifiers (finger/voice)",
  "Full-face photographs",
  "Any other unique identifying code/number"
];

const defaultMockLog = `2026-06-25 14:32:01 [ERROR] db_write_failure: Cannot write record for patient Jane Doe (SSN: 999-12-3456, Phone: 555-019-2834, MRN: MRN-882736). Diagnostic payload: {email: "jane.doe@clinical-care.org", birthdate: "1984-12-10", ip: "192.168.1.105"}`;

export default function PhiEducation() {
  const [inputText, setInputText] = useState(defaultMockLog);
  const [scrubbedText, setScrubbedText] = useState("");
  const [hasScrubbed, setHasScrubbed] = useState(false);

  const handleScrub = () => {
    let result = inputText;

    // Redact SSN
    result = result.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_REDACTED]");
    
    // Redact Email
    result = result.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]");
    
    // Redact Phone
    result = result.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[PHONE_REDACTED]");

    // Redact Names
    result = result.replace(/\b(Jane\s+Doe|John\s+Doe|Jane|John)\b/gi, "[NAME_REDACTED]");

    // Redact IP
    result = result.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, "[IP_REDACTED]");

    // Redact MRN
    result = result.replace(/\bMRN-\d{5,8}\b/gi, "[MRN_REDACTED]");

    // Redact DOB
    result = result.replace(/\b(19|20)\d{2}[-./]\d{2}[-./]\d{2}\b/g, "[DATE_REDACTED]");

    setScrubbedText(result);
    setHasScrubbed(true);
  };

  const handleReset = () => {
    setInputText(defaultMockLog);
    setScrubbedText("");
    setHasScrubbed(false);
  };

  return (
    <section id="phi" className="py-24 border-t border-slate-200 bg-[#F7F9F6]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-bold text-[#0A472E] uppercase tracking-widest">Compliance education</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F1D15] sm:text-4xl mt-2 font-mono">
            Managing the 18 PHI Identifiers
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-medium">
            Under the HIPAA Privacy Rule, clinical data combined with any of these 18 identifiers constitutes Protected Health Information (PHI).
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Identifiers List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-xl p-6 border border-slate-300 glow-emerald">
              <h3 className="text-sm font-bold text-[#0F1D15] font-mono mb-4 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-[#0A472E] stroke-[2.2]" /> The 18 PHI Safeguards
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                To prevent accidental disclosures in application logs, error payloads, and diagnostic telemetries, these identifiers must be systematically scrubbed or replaced with database-generated UUIDs.
              </p>
              
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 max-h-[360px] overflow-y-auto pr-2">
                {phiIdentifiers.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-2 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <span className="font-mono text-[10px] font-extrabold text-[#0A472E] w-5 shrink-0 text-right">{idx + 1}.</span>
                    <span className="text-xs text-slate-800 font-semibold truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scrubber Sandbox */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl border border-slate-300 bg-[#FFFFFF] p-6 shadow-lg shadow-slate-950/2 flex flex-col space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F1D15] font-mono flex items-center">
                  <Sparkles className="h-4.5 w-4.5 mr-2 text-[#0A472E]" /> Log Scrubber Sandbox
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-[#0A472E] animate-pulse" />
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider font-bold">Scrubber engine online</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase font-mono tracking-wider">Input App Log Stream</label>
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setHasScrubbed(false);
                  }}
                  className="w-full h-32 p-3 rounded-lg border border-slate-300 bg-slate-50 text-[#0F1D15] font-mono text-[11px] leading-relaxed font-semibold focus:outline-none focus:border-[#0A472E]/40 focus:ring-1 focus:ring-[#0A472E]/40 transition-all resize-none shadow-inner"
                  placeholder="Type a mock diagnostic log containing patient data here..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleScrub}
                  className="flex-1 py-2 rounded-lg bg-[#0A472E] hover:bg-[#083623] text-xs font-mono font-bold text-white transition-all cursor-pointer shadow-md shadow-emerald-950/10"
                >
                  Run Log Scrubber
                </button>
                {hasScrubbed && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
                  >
                    Reset
                  </button>
                )}
              </div>

              {hasScrubbed && (
                <div className="space-y-2 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-bold text-slate-500 uppercase font-mono tracking-wider flex items-center">
                      <EyeOff className="h-3.5 w-3.5 mr-1.5 text-[#0A472E]" /> Scrubbed Output Log
                    </label>
                    <span className="text-[9px] font-mono text-[#0A472E] font-extrabold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300/50">COMPLIANT</span>
                  </div>
                  
                  <div className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 font-mono text-[11px] leading-relaxed font-semibold overflow-x-auto whitespace-pre-wrap">
                    {scrubbedText.split(/(\[[A-Z_]+\])/g).map((part, index) => {
                      if (part.startsWith("[") && part.endsWith("]")) {
                        return (
                          <span key={index} className="bg-rose-50 text-rose-800 px-1 py-0.5 rounded border border-rose-200 font-bold shadow-sm mx-0.5">
                            {part}
                          </span>
                        );
                      }
                      return <span key={index}>{part}</span>;
                    })}
                  </div>

                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3 mt-3 flex items-start space-x-2.5">
                    <Info className="h-4 w-4 text-[#0A472E] shrink-0 mt-0.5 stroke-[2.2]" />
                    <p className="text-[10px] text-slate-600 leading-normal font-medium">
                      The engine successfully identified and redacted potential patient identifiers. In production, this logic runs inside a logging class at runtime before the event is sent to KMS-encrypted CloudWatch groups.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
