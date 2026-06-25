"use client";

import { useEffect, useState } from "react";

const terminalLines = [
  { text: "Initializing provider plugins...", delay: 600, color: "text-slate-600" },
  { text: "Terraform will perform the following actions:", delay: 500, color: "text-slate-700 font-medium" },
  { text: "  + module.compliance_kms.aws_kms_key.app_encryption_key", delay: 400, color: "text-[#1D3E4C] font-semibold" },
  { text: "  + module.compliance_vpc.aws_vpc.main", delay: 300, color: "text-[#1D3E4C] font-semibold" },
  { text: "  + module.compliance_storage.aws_s3_bucket.phi", delay: 300, color: "text-[#1D3E4C] font-semibold" },
  { text: "  + module.compliance_database.aws_db_instance.phi_rds", delay: 400, color: "text-[#1D3E4C] font-semibold" },
  { text: "Plan: 18 to add, 0 to change, 0 to destroy.", delay: 600, color: "text-slate-700 font-medium" },
  { text: "module.compliance_kms.aws_kms_key.app_encryption_key: Creating...", delay: 800, color: "text-slate-500" },
  { text: "module.compliance_kms.aws_kms_key.app_encryption_key: Creation complete [id=arn:aws:kms:us-east-1:123456789012:key/phi-key]", delay: 700, color: "text-[#0A472E] font-bold" },
  { text: "module.compliance_storage.aws_s3_bucket.phi: Creating...", delay: 600, color: "text-slate-500" },
  { text: "module.compliance_storage.aws_s3_bucket.phi: Creation complete [id=clinical-patient-records-prod]", delay: 500, color: "text-[#0A472E] font-bold" },
  { text: "Apply complete! Resources: 18 added, 0 changed, 0 destroyed.", delay: 800, color: "text-[#0A472E] font-black tracking-wide" },
];

export default function TerminalMock() {
  const [displayedLines, setDisplayedLines] = useState<typeof terminalLines>([]);
  const [commandTyped, setCommandTyped] = useState("");
  const [step, setStep] = useState(0); // 0: typing command, 1: running output, 2: completed

  useEffect(() => {
    if (step === 0) {
      const command = "terraform apply -auto-approve";
      let currentIndex = 0;
      setCommandTyped("");
      
      const interval = setInterval(() => {
        if (currentIndex < command.length) {
          setCommandTyped(command.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStep(1), 500);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 1) {
      let currentLineIndex = 0;
      const runNextLine = () => {
        if (currentLineIndex < terminalLines.length) {
          const nextLine = terminalLines[currentLineIndex];
          setDisplayedLines((prev) => [...prev, nextLine]);
          currentLineIndex++;
          setTimeout(runNextLine, nextLine.delay);
        } else {
          setStep(2);
        }
      };
      runNextLine();
    }
  }, [step]);

  const handleReset = () => {
    setDisplayedLines([]);
    setCommandTyped("");
    setStep(0);
  };

  return (
    <div className="w-full rounded-xl border border-slate-300 bg-[#f0f4f1] p-5 shadow-lg shadow-slate-900/5 font-mono text-xs text-slate-700">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-400"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
        </div>
        <div className="flex items-center space-x-3">
          {step === 2 && (
            <button
              onClick={handleReset}
              className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-slate-300 bg-[#FFFFFF] hover:bg-slate-100 hover:border-slate-400 text-slate-700 hover:text-[#0F1D15] transition-all cursor-pointer shadow-sm"
            >
              Re-run
            </button>
          )}
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">terraform CLI</span>
        </div>
      </div>
      <div className="space-y-2 text-[11px] leading-relaxed min-h-[260px]">
        <p className="text-[#0F1D15] font-bold">
          <span className="text-[#0A472E] font-black mr-2">$</span>
          {commandTyped}
          {step === 0 && <span className="inline-block w-1.5 h-3.5 bg-[#0A472E] ml-0.5 terminal-cursor"></span>}
        </p>
        
        {displayedLines.map((line, idx) => (
          <p key={idx} className={`${line.color} transition-opacity duration-300`}>
            {line.text}
          </p>
        ))}

        {step === 1 && (
          <p className="text-slate-500">
            <span className="inline-block w-1.5 h-3.5 bg-slate-500 terminal-cursor"></span>
          </p>
        )}
      </div>
    </div>
  );
}
