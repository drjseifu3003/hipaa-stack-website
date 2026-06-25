import Header from "@/components/Header";
import TerminalMock from "@/components/TerminalMock";
import Safeguards from "@/components/Safeguards";
import Architecture from "@/components/Architecture";
import ModuleExplorer from "@/components/ModuleExplorer";
import CodePlayground from "@/components/CodePlayground";
import PhiEducation from "@/components/PhiEducation";
import Footer from "@/components/Footer";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F6]">
      {/* Premium Sticky Navigation Header */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Extremely soft light radial background glows */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/3 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-slate-600/3 blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              
              {/* Hero Copy */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Compliance Badge */}
                <div className="inline-flex items-center space-x-2 rounded-full border border-[#0A472E]/25 bg-[#0A472E]/5 px-3 py-1 text-[11px] font-mono font-bold text-[#0A472E] shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1 text-[#0A472E]" />
                  <span>CFR § 164.312 COMPLIANT INFRASTRUCTURE</span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-[#0F1D15] sm:text-5xl md:text-6xl leading-[1.1] font-mono">
                  HIPAA-Compliant AWS Infrastructure, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A472E] to-[#1D3E4C]">Defined as Code</span>
                </h1>
                
                <p className="max-w-2xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                  Deploy secure, modular, and battle-tested AWS environments utilizing Terraform blueprints. Engineered specifically to satisfy the HIPAA/HITECH Technical Safeguards with zero manual configuration.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://github.com/drjseifu3003/hipaa-stack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0A472E] px-5 py-2.5 text-xs font-mono font-bold text-white shadow-md shadow-emerald-950/10 hover:bg-[#083623] transition-all group cursor-pointer"
                  >
                    <span>Deploy Blueprints</span>
                    <ArrowUpRight className="h-4 w-4 ml-1.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href="#modules"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-[#FFFFFF] px-5 py-2.5 text-xs font-mono font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:text-black transition-all cursor-pointer"
                  >
                    Explore 13 Modules
                  </a>
                </div>
              </div>

              {/* Terminal Simulator */}
              <div className="lg:col-span-5 w-full">
                <TerminalMock />
              </div>

            </div>
          </div>
        </section>

        {/* Safeguards Grid Section */}
        <Safeguards />

        {/* Interactive SVG Architecture Section */}
        <Architecture />

        {/* Searchable/Filterable Modules Explorer */}
        <ModuleExplorer />

        {/* Code Snippets tabbed playground */}
        <CodePlayground />

        {/* PHI 18 Identifiers and Scrubber Sandbox */}
        <PhiEducation />

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
