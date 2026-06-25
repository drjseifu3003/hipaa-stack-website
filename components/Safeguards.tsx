import { Shield, Key, Eye, RefreshCw } from "lucide-react";

const safeguards = [
  {
    title: "Data Isolation & Network Security",
    citation: "§ 164.312(a)(1)",
    icon: Shield,
    color: "text-[#0A472E]",
    desc: "Deploy databases (RDS PostgreSQL) and compute workloads (ECS Fargate) solely in isolated private subnets. Enforce zero public routing. Secure external ingress through AWS WAFv2 and AWS Client VPN tunnel interfaces."
  },
  {
    title: "Encryption Everywhere",
    citation: "§ 164.312(a)(2)(iv)",
    icon: Key,
    color: "text-[#1D3E4C]",
    desc: "Enforce AES-256 Server-Side Encryption (SSE-KMS) backed by a Customer Managed Key (CMK) with automated annual rotation. Reject non-HTTPS traffic on S3 and mandate SSL/TLS on database channels."
  },
  {
    title: "Immutable Auditing & Monitoring",
    citation: "§ 164.312(b)",
    icon: Eye,
    color: "text-amber-700",
    desc: "Capture management and S3 data-plane events using AWS CloudTrail. Centralize system activity in KMS-encrypted CloudWatch Log Groups, retaining records for a clinical-audit compliant 365 days."
  },
  {
    title: "Integrity & Disaster Recovery",
    citation: "§ 164.312(c)(1)",
    icon: RefreshCw,
    color: "text-indigo-700",
    desc: "Protect ePHI from accidental deletion or malicious modification. Enforce S3 Object Versioning alongside automated daily snapshot backups utilizing AWS Backup vaults with custom retention locks."
  }
];

export default function Safeguards() {
  return (
    <section id="features" className="py-24 border-t border-slate-200 bg-[#F7F9F6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F1D15] sm:text-4xl font-mono">
            Hardened to Meet CFR § 164.312 Safeguards
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-medium">
            Every module in the stack corresponds directly to a technical safeguard mandated by the HIPAA Security Rule.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {safeguards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-card rounded-xl p-6 border border-slate-300 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <Icon className={`h-5 w-5 ${item.color} stroke-[2.2]`} />
                  </div>
                  <span className="font-mono text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">{item.citation}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0F1D15] mb-2 font-mono">{item.title}</h3>
                <p className="text-xs text-[#334D3E] leading-relaxed font-medium">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
