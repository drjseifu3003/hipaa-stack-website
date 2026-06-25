"use client";

import { useState } from "react";
import { Network, Shield, Key, Eye, Lock, Layers } from "lucide-react";

interface ComponentDetail {
  title: string;
  citation: string;
  desc: string;
  details: string[];
}

const componentDetails: Record<string, ComponentDetail> = {
  vpc: {
    title: "AWS VPC (Isolated Network)",
    citation: "§ 164.312(a)(1) - Access Control",
    desc: "Provides physical and logical network boundary isolation.",
    details: [
      "Custom subnets with zero direct public routes",
      "VPC Flow Logs enabled for security analysis",
      "PrivateLink Endpoints route AWS API traffic internally"
    ]
  },
  waf: {
    title: "AWS WAFv2 (Web Application Firewall)",
    citation: "§ 164.312(a)(1) - Exploit Shield",
    desc: "Shields public-facing application endpoints from exploits.",
    details: [
      "Mitigates SQL Injection (SQLi) and XSS attacks",
      "Core Rule Set protects Application Load Balancers",
      "Rate limiting blocks automated scraping and DDoS attempts"
    ]
  },
  vpn: {
    title: "AWS Client VPN (Secure Ingress)",
    citation: "§ 164.312(a)(1) - Secure Access",
    desc: "Enforces TLS-encrypted tunnels for administrative access.",
    details: [
      "Mutual certificate-based authentication",
      "Restricted ingress to private VPC resources",
      "Detailed connection logging exported to CloudWatch"
    ]
  },
  fargate: {
    title: "AWS Fargate (Isolated Compute)",
    citation: "§ 164.312(a)(1) - Isolated Runtime",
    desc: "Serverless container compute running in private subnets.",
    details: [
      "No shared kernel or host level access",
      "IAM task roles enforce least-privilege AWS API access",
      "Stdout/stderr logs encrypted and sent to CloudWatch"
    ]
  },
  rds: {
    title: "RDS PostgreSQL (Secure Database)",
    citation: "§ 164.312(a)(2)(iv) - Secure Storage",
    desc: "Relational database service in multi-AZ isolated groups.",
    details: [
      "Full storage and backup encryption with KMS CMK",
      "Enforces SSL/TLS database connections (rds.force_ssl = 1)",
      "IAM database authentication enabled"
    ]
  },
  s3: {
    title: "Amazon S3 (Immutable Object Storage)",
    citation: "§ 164.312(c)(1) - Data Integrity",
    desc: "Highly durable storage for patient documents and clinical files.",
    details: [
      "Server-side encryption backed by Customer Managed Keys (SSE-KMS) utilizing the CMK",
      "S3 Public Access Block enabled to explicitly block public ACLs and bucket policies",
      "S3 Object Versioning prevents accidental deletion",
      "Explicit bucket policy denying non-HTTPS requests"
    ]
  },
  kms: {
    title: "AWS KMS (Customer Managed Keys)",
    citation: "§ 164.312(a)(2)(iv) - Key Management",
    desc: "Centralized key generation, rotation, and access control.",
    details: [
      "Customer Managed Key (CMK) with automated annual rotation",
      "Least-privilege key policies restricting access to VPC origins",
      "Full audit trail for key usage"
    ]
  },
  cloudtrail: {
    title: "AWS CloudTrail (Administrative Auditing)",
    citation: "§ 164.312(b) - Audit Controls",
    desc: "Continuously records account activity and S3 access events.",
    details: [
      "Tamper-proof log file validation enabled",
      "Captures management operations and S3 data-plane reads/writes",
      "Streams trails directly to KMS-encrypted CloudWatch groups"
    ]
  },
  healthlake: {
    title: "Amazon HealthLake (FHIR Clinical Store)",
    citation: "§ 164.312(a)(2)(iv) - Standardized Exchange",
    desc: "Native FHIR R4 clinical data repository for health records.",
    details: [
      "Standardized HL7 FHIR structured data queries",
      "Database-level encryption with CMK key",
      "Fine-grained IAM data access controls"
    ]
  }
};

export default function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeDetail = hovered ? componentDetails[hovered] : componentDetails.vpc;

  return (
    <section id="architecture" className="py-24 border-t border-slate-200 bg-[#F7F9F6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F1D15] sm:text-4xl font-mono">
            Hardened AWS Architecture Blueprint
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-medium">
            Hover over the components in the interactive network topology diagram to examine their configuration details and regulatory mappings.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 items-start">
          {/* SVG Diagram Column */}
          <div className="lg:col-span-3 bg-[#FFFFFF] rounded-xl border border-slate-300 p-6 shadow-lg shadow-slate-950/2 overflow-x-auto">
            <div className="min-w-[600px] relative">
              <svg viewBox="0 0 760 440" className="w-full h-auto select-none">
                {/* Definitions for filters */}
                <defs>
                  <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-slate" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* AWS Cloud Outline */}
                <rect x="10" y="10" width="740" height="420" rx="12" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                <text x="25" y="32" className="font-mono text-[10px] font-bold fill-slate-500 uppercase tracking-wider">AWS Cloud Boundary</text>

                {/* VPC Outline */}
                <rect
                  x="140"
                  y="50"
                  width="440"
                  height="340"
                  rx="10"
                  fill="#f8fafc"
                  stroke={hovered === "vpc" ? "#0A472E" : "#cbd5e1"}
                  strokeWidth={hovered === "vpc" ? "2" : "1.5"}
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHovered("vpc")}
                  onMouseLeave={() => setHovered(null)}
                />
                <text x="155" y="72" className="font-mono text-[10px] font-bold fill-[#1D3E4C] uppercase tracking-wider">Isolated VPC (10.0.0.0/16)</text>

                {/* Public Subnet */}
                <rect x="160" y="90" width="180" height="280" rx="8" fill="#f1f5f9" fillOpacity="0.8" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
                <text x="170" y="110" className="font-mono text-[9px] font-bold fill-slate-600 uppercase">Public Subnet (Ingress)</text>

                {/* WAF */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("waf")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="180"
                    y="130"
                    width="140"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "waf" ? "#0A472E" : "#94a3b8"}
                    strokeWidth="1.5"
                    filter={hovered === "waf" ? "url(#glow-emerald)" : undefined}
                    className="transition-all"
                  />
                  <text x="250" y="155" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "waf" ? "fill-[#0A472E]" : "fill-[#0F1D15]"}`}>AWS WAFv2</text>
                  <text x="250" y="168" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Exploit Shield</text>
                </g>

                {/* VPN Endpoint */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("vpn")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="180"
                    y="200"
                    width="140"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "vpn" ? "#0A472E" : "#94a3b8"}
                    strokeWidth="1.5"
                    filter={hovered === "vpn" ? "url(#glow-emerald)" : undefined}
                    className="transition-all"
                  />
                  <text x="250" y="225" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "vpn" ? "fill-[#0A472E]" : "fill-[#0F1D15]"}`}>Client VPN</text>
                  <text x="250" y="238" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Secure Ingress</text>
                </g>

                {/* Private Subnet */}
                <rect x="370" y="90" width="190" height="280" rx="8" fill="#edf2f7" fillOpacity="0.8" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
                <text x="380" y="110" className="font-mono text-[9px] font-bold fill-slate-600 uppercase">Private Subnet (Workloads)</text>

                {/* ECS Fargate */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("fargate")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="390"
                    y="130"
                    width="150"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "fargate" ? "#1D3E4C" : "#94a3b8"}
                    strokeWidth="1.5"
                    filter={hovered === "fargate" ? "url(#glow-slate)" : undefined}
                    className="transition-all"
                  />
                  <text x="465" y="155" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "fargate" ? "fill-[#1D3E4C]" : "fill-[#0F1D15]"}`}>ECS Fargate</text>
                  <text x="465" y="168" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Isolated Containers</text>
                </g>

                {/* RDS PostgreSQL */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("rds")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="390"
                    y="200"
                    width="150"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "rds" ? "#1D3E4C" : "#94a3b8"}
                    strokeWidth="1.5"
                    filter={hovered === "rds" ? "url(#glow-slate)" : undefined}
                    className="transition-all"
                  />
                  <text x="465" y="225" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "rds" ? "fill-[#1D3E4C]" : "fill-[#0F1D15]"}`}>RDS PostgreSQL</text>
                  <text x="465" y="238" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Encrypted DB</text>
                </g>

                {/* HealthLake */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("healthlake")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="390"
                    y="270"
                    width="150"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "healthlake" ? "#1D3E4C" : "#94a3b8"}
                    strokeWidth="1.5"
                    filter={hovered === "healthlake" ? "url(#glow-slate)" : undefined}
                    className="transition-all"
                  />
                  <text x="465" y="295" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "healthlake" ? "fill-[#1D3E4C]" : "fill-[#0F1D15]"}`}>Amazon HealthLake</text>
                  <text x="465" y="308" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">FHIR Clinical Store</text>
                </g>

                {/* AWS KMS */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("kms")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="600"
                    y="70"
                    width="130"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "kms" ? "#1D3E4C" : "#cbd5e1"}
                    strokeWidth="1.5"
                    filter={hovered === "kms" ? "url(#glow-slate)" : undefined}
                    className="transition-all"
                  />
                  <text x="665" y="95" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "kms" ? "fill-[#1D3E4C]" : "fill-[#0F1D15]"}`}>AWS KMS</text>
                  <text x="665" y="108" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Key Management</text>
                </g>

                {/* S3 Storage */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("s3")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="600"
                    y="140"
                    width="130"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "s3" ? "#0A472E" : "#cbd5e1"}
                    strokeWidth="1.5"
                    filter={hovered === "s3" ? "url(#glow-emerald)" : undefined}
                    className="transition-all"
                  />
                  <text x="665" y="165" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "s3" ? "fill-[#0A472E]" : "fill-[#0F1D15]"}`}>Amazon S3</text>
                  <text x="665" y="178" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Secure Buckets</text>
                </g>

                {/* CloudTrail */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHovered("cloudtrail")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect
                    x="600"
                    y="210"
                    width="130"
                    height="50"
                    rx="6"
                    fill="#FFFFFF"
                    stroke={hovered === "cloudtrail" ? "#1D3E4C" : "#cbd5e1"}
                    strokeWidth="1.5"
                    filter={hovered === "cloudtrail" ? "url(#glow-slate)" : undefined}
                    className="transition-all"
                  />
                  <text x="665" y="235" textAnchor="middle" className={`font-mono text-[11px] font-bold transition-colors ${hovered === "cloudtrail" ? "fill-[#1D3E4C]" : "fill-[#0F1D15]"}`}>AWS CloudTrail</text>
                  <text x="665" y="248" textAnchor="middle" className="font-sans text-[9px] fill-slate-500 font-medium">Audit Logs</text>
                </g>

                {/* Connection Lines */}
                {/* External User to WAF */}
                <path d="M 60,155 L 180,155" fill="none" stroke="#0A472E" strokeWidth="2" strokeDasharray="3,3" />
                <circle cx="60" cy="155" r="4.5" fill="#0A472E" />
                <text x="70" y="145" className="font-sans text-[9px] fill-slate-600 font-semibold">Client Ingress</text>

                {/* WAF to Fargate */}
                <path d="M 320,155 L 390,155" fill="none" stroke="#1D3E4C" strokeWidth="2" />
                <circle cx="320" cy="155" r="3.5" fill="#1D3E4C" />

                {/* Fargate to RDS */}
                <path d="M 465,180 L 465,200" fill="none" stroke="#1D3E4C" strokeWidth="2" />
                <circle cx="465" cy="200" r="3.5" fill="#1D3E4C" />

                {/* Fargate to HealthLake */}
                <path d="M 500,180 L 500,270" fill="none" stroke="#1D3E4C" strokeWidth="2" />
                <circle cx="500" cy="270" r="3.5" fill="#1D3E4C" />

                {/* PrivateLink connections */}
                <path d="M 540,155 C 570,155 570,95 600,95" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M 540,155 C 570,155 570,165 600,165" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M 540,225 C 570,225 570,165 600,165" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2,2" />

                {/* CloudTrail Logging */}
                <path d="M 540,225 C 570,225 570,235 600,235" fill="none" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="540" cy="225" r="3.5" fill="#64748b" />
              </svg>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-6 border border-slate-300 glow-sage">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#0A472E]/5 border border-[#0A472E]/15 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-[#0A472E] stroke-[2.2]" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#0A472E] uppercase font-bold tracking-wider">{activeDetail.citation}</span>
                  <h3 className="text-base font-bold text-[#0F1D15] font-mono">{activeDetail.title}</h3>
                </div>
              </div>
              
              <p className="text-xs text-slate-700 leading-relaxed font-medium mb-6">
                {activeDetail.desc}
              </p>

              <div className="border-t border-slate-200 pt-5">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 font-mono flex items-center">
                  <Lock className="h-3.5 w-3.5 mr-1.5 text-[#0A472E]" /> Hardened Security Rules
                </h4>
                <ul className="space-y-3">
                  {activeDetail.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0A472E] mt-1.5 mr-2.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-slate-300 bg-[#FFFFFF] p-4 font-mono text-[11px] text-slate-700 shadow-sm">
              <div className="flex items-center space-x-2 text-[#0A472E] mb-2">
                <Network className="h-4 w-4 text-[#0A472E] stroke-[2.2]" />
                <span className="font-bold uppercase tracking-wider text-[10px]">Architectural Rule</span>
              </div>
              Zero ePHI is allowed to pass through public channels. All transactions between client compute and persistent stores route through PrivateLink or CMK encryption.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
