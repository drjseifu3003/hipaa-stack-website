"use client";

import { useState, useMemo } from "react";
import { 
  Search, Shield, Network, Server, Key, Database, FileText, 
  Eye, Settings, AlertTriangle, Cloud, RotateCcw, X 
} from "lucide-react";

interface ModuleItem {
  id: string;
  name: string;
  category: "network" | "storage" | "compute" | "security";
  path: string;
  citation: string;
  icon: any;
  shortDesc: string;
  complianceDetails: string;
  securityFeatures: string[];
}

const modulesData: ModuleItem[] = [
  {
    id: "vpc",
    name: "VPC (Virtual Private Cloud)",
    category: "network",
    path: "services/vpc",
    citation: "§ 164.312(a)(1) - Access Control",
    icon: Network,
    shortDesc: "Logical network isolation for compute workloads and database clusters.",
    complianceDetails: "Enforces strict boundary security to isolate clinical workloads and administrative channels.",
    securityFeatures: [
      "Custom VPC topology with completely isolated private subnets",
      "No public routes or direct internet ingress/egress pathways",
      "VPC Flow Logs enabled, streaming records to CloudWatch Log Groups",
      "AWS PrivateLink Interface Endpoints for secure, internal network routing of S3, KMS, and Secrets Manager API calls"
    ]
  },
  {
    id: "kms",
    name: "KMS (Key Management Service)",
    category: "security",
    path: "services/kms",
    citation: "§ 164.312(a)(2)(iv) - Encryption",
    icon: Key,
    shortDesc: "Centralized Customer Managed Keys with automated rotation.",
    complianceDetails: "Provides administrative and technical controls for encryption key management.",
    securityFeatures: [
      "Customer Managed Key (CMK) provisioning with annual automatic rotation",
      "Strict IAM and resource-based key policies restricting access to designated service roles",
      "VPC-scoped key usage conditions preventing access outside private networks",
      "Integration with CloudTrail to log 100% of key API accesses (encrypt, decrypt, rotate)"
    ]
  },
  {
    id: "s3",
    name: "Amazon S3 (Simple Storage Service)",
    category: "storage",
    path: "services/s3",
    citation: "§ 164.312(c)(1) - Data Integrity",
    icon: Database,
    shortDesc: "Secure, versioned, and encrypted patient file storage.",
    complianceDetails: "Ensures durability, auditability, and protection of patient medical records.",
    securityFeatures: [
      "Server-side encryption backed by Customer Managed Keys (SSE-KMS) utilizing the CMK",
      "S3 Public Access Block enabled to explicitly block public ACLs and bucket policies",
      "S3 Object Versioning to retain history and protect against accidental alteration or deletion",
      "Bucket policies enforcing secure TLS transport layer requests only (deny aws:SecureTransport = false)",
      "Access logs exported to a dedicated, independent secure audit bucket"
    ]
  },
  {
    id: "rds",
    name: "RDS PostgreSQL (Database)",
    category: "storage",
    path: "services/rds",
    citation: "§ 164.312(a)(2)(iv) - Encryption",
    icon: Server,
    shortDesc: "Relational database service in multi-AZ groups with SSL forced.",
    complianceDetails: "Protects persistent clinical databases and patient information schemas.",
    securityFeatures: [
      "Deploys PostgreSQL database instances exclusively inside isolated private subnets",
      "Full storage and backup-level encryption utilizing the Customer Managed Key (CMK)",
      "SSL/TLS connections mandated via custom DB parameter groups (rds.force_ssl = 1)",
      "IAM Database Authentication enabled for fine-grained database user accounts"
    ]
  },
  {
    id: "healthlake",
    name: "Amazon HealthLake (FHIR Store)",
    category: "storage",
    path: "services/healthlake",
    citation: "§ 164.312(a)(2)(iv) - Exchange",
    icon: FileText,
    shortDesc: "Standardized HL7 FHIR R4 clinical data storage.",
    complianceDetails: "Implements standard specifications for healthcare information exchanges.",
    securityFeatures: [
      "Native HL7 FHIR R4 API compliance for clinical resource ingestion and queries",
      "Database-level encryption with Customer Managed Keys",
      "Fine-grained IAM policy integration for read/write resource operations",
      "Pre-integrated clinical search, query, and analysis filters"
    ]
  },
  {
    id: "fargate",
    name: "ECS Fargate (Container Compute)",
    category: "compute",
    path: "services/fargate",
    citation: "§ 164.312(a)(1) - Access Control",
    icon: Shield,
    shortDesc: "Serverless container execution inside isolated subnets.",
    complianceDetails: "Hosts application runtimes and API microservices securely.",
    securityFeatures: [
      "AWS Fargate serverless infrastructure removes host-level operational access",
      "Task Execution and Task IAM roles restrict containers to least-privilege API permissions",
      "Containers operate strictly inside isolated private subnets with no public exposure",
      "Application stdout/stderr log streams routed directly to KMS-encrypted CloudWatch groups"
    ]
  },
  {
    id: "vpn",
    name: "AWS Client VPN (Secure Access)",
    category: "network",
    path: "services/vpn",
    citation: "§ 164.312(a)(1) - Access Control",
    icon: Network,
    shortDesc: "Certificate-authenticated VPN tunnels for administrators.",
    complianceDetails: "Controls remote developer and administration network entrances.",
    securityFeatures: [
      "Provisioning of AWS Client VPN Endpoint mapping to isolated subnets",
      "Certificate-based authentication with mutual TLS encryption",
      "VPC security groups restricting client endpoints to secure target resources",
      "Full connection logging capturing client IP, connection time, and duration in CloudWatch"
    ]
  },
  {
    id: "waf",
    name: "AWS WAFv2 (Web ACL)",
    category: "network",
    path: "services/waf",
    citation: "§ 164.312(a)(1) - Access Control",
    icon: Shield,
    shortDesc: "Web Application Firewall shielding public Load Balancers.",
    complianceDetails: "Defends web-facing endpoints against automated attacks and exploits.",
    securityFeatures: [
      "Web ACL deployments protecting public Application Load Balancers",
      "AWS-managed rule groups including SQL Injection (SQLi) and Cross-Site Scripting (XSS)",
      "Core Rule Set configured to handle OWASP Top 10 vulnerabilities",
      "Rate limiting rules blocking brute-force attempts and anomalous request flows"
    ]
  },
  {
    id: "cloudtrail",
    name: "AWS CloudTrail (Auditing)",
    category: "security",
    path: "services/cloudtrail",
    citation: "§ 164.312(b) - Audit Controls",
    icon: Eye,
    shortDesc: "Administrative API and S3 data-plane audit logging.",
    complianceDetails: "Establishes a complete, tamper-proof record of AWS account activity.",
    securityFeatures: [
      "Multi-region, organizational CloudTrail capturing 100% of management actions",
      "S3 data-plane event tracking (captures S3 object reads, writes, and deletes)",
      "Log File Validation enabled to verify file integrity and prevent tampering",
      "Logs stored in a secure, KMS-encrypted S3 bucket with strict object lock policies"
    ]
  },
  {
    id: "cloudwatch",
    name: "CloudWatch (Encryption Logs)",
    category: "security",
    path: "services/cloudwatch",
    citation: "§ 164.312(b) - Audit Controls",
    icon: FileText,
    shortDesc: "Centralized, encrypted logs with a 365-day retention policy.",
    complianceDetails: "Maintains log records for clinical auditing compliance timeframes.",
    securityFeatures: [
      "Centralized log groups for containers, VPC flows, databases, and VPNs",
      "Storage encryption enforced utilizing the Customer Managed Key (CMK)",
      "Enforces a minimum retention policy of 365 days to meet clinical audit regulations",
      "Log metric filters triggering real-time alerts on anomalous configuration changes"
    ]
  },
  {
    id: "secretsmanager",
    name: "Secrets Manager (Credentials)",
    category: "security",
    path: "services/secretsmanager",
    citation: "§ 164.312(a)(2)(iv) - Encryption",
    icon: Key,
    shortDesc: "Secure storage and rotation of credentials and API keys.",
    complianceDetails: "Protects database passwords, API tokens, and certificate stores.",
    securityFeatures: [
      "Encryption of secrets at rest utilizing the KMS Customer Managed Key",
      "Automated credentials rotation schedules (e.g. rotating RDS passwords every 30 days)",
      "Removes the need to hardcode secrets in container runtimes or source control",
      "Least-privilege IAM policies restricting secret access to specific container task roles"
    ]
  },
  {
    id: "guardduty",
    name: "AWS GuardDuty (Threat Intel)",
    category: "security",
    path: "services/guardduty",
    citation: "§ 164.312(b) - Audit Controls",
    icon: Eye,
    shortDesc: "Intelligent scanning of flow logs and trails for anomalies.",
    complianceDetails: "Proactively identifies security threat vectors and indicators.",
    securityFeatures: [
      "Continuous machine-learning scanning of VPC Flow Logs, DNS queries, and CloudTrail events",
      "Detects credential leakage, API abuse patterns, and brute-force SSH attacks",
      "Real-time event alerts bridged with AWS EventBridge for instant routing",
      "Zero impact on active compute workloads or database performance"
    ]
  },
  {
    id: "backup",
    name: "AWS Backup (Disaster Recovery)",
    category: "storage",
    path: "services/backup",
    citation: "§ 164.312(c)(1) - Data Integrity",
    icon: RotateCcw,
    shortDesc: "Automated daily backups with custom vault locks.",
    complianceDetails: "Ensures disaster recovery and data preservation capabilities.",
    securityFeatures: [
      "Centralized backup plans executing automated daily snapshots of RDS and S3 resources",
      "Secure backup vaults locked with a custom compliance vault lock (prevents early deletion)",
      "Automated lifecycle transition policies from active backups to cold storage",
      "Cross-region backup replication options for geographically redundant disaster recovery"
    ]
  }
];

export default function ModuleExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "network" | "storage" | "compute" | "security">("all");
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);

  const filteredModules = useMemo(() => {
    return modulesData.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.citation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section id="modules" className="py-24 border-t border-slate-200 bg-[#F7F9F6]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold text-[#0A472E] uppercase tracking-widest">Library catalog</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F1D15] sm:text-4xl mt-2 font-mono">
              Modular Service Catalog
            </h2>
            <p className="mt-3 text-slate-600 text-sm font-medium">
              Explore the 13 modular, production-ready services included in the stack. Click on any module to view its exact technical security controls.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-6 md:mt-0 relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search services, paths, rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-[#FFFFFF] text-[#0F1D15] placeholder-slate-500 focus:outline-none focus:border-[#0A472E]/50 focus:ring-1 focus:ring-[#0A472E]/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-5">
          {(["all", "network", "storage", "compute", "security"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0A472E]/5 border-[#0A472E]/25 text-[#0A472E] font-bold shadow-sm"
                  : "border-transparent text-slate-600 hover:text-[#0F1D15] hover:bg-slate-100"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedModule(item)}
                className="glass-card rounded-xl p-6 flex flex-col justify-between border border-slate-300 hover:border-slate-400 cursor-pointer transition-all duration-300 hover:scale-[1.01] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-9 w-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#0A472E]/5 group-hover:border-[#0A472E]/15 transition-all">
                      <Icon className="h-4.5 w-4.5 text-slate-600 group-hover:text-[#0A472E] transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wide">{item.citation}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-[#0F1D15] mb-1 font-mono group-hover:text-[#0A472E] transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-mono text-[10px] text-slate-500 font-medium mb-3">{item.path}</p>
                  
                  <p className="text-xs text-[#334D3E] leading-relaxed font-medium">
                    {item.shortDesc}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-[#0A472E] group-hover:text-[#083623] font-bold transition-colors">
                  <span>VIEW CONTROLS →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredModules.length === 0 && (
          <div className="text-center py-16 rounded-xl border border-slate-300 bg-[#FFFFFF]">
            <AlertTriangle className="h-8 w-8 text-slate-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-[#0F1D15]">No services match your query</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching for another term.</p>
          </div>
        )}

        {/* Side Drawer Modal */}
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-sm">
            <div 
              className="h-full w-full max-w-lg bg-[#FFFFFF] border-l border-slate-300 p-8 overflow-y-auto shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-200 mb-6">
                  <span className="font-mono text-[10px] text-[#0A472E] font-bold uppercase tracking-wider">
                    {selectedModule.citation}
                  </span>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="h-8 w-8 rounded-lg border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-850 transition-all cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-[#0A472E]/5 border border-[#0A472E]/15 flex items-center justify-center">
                      {(() => {
                        const Icon = selectedModule.icon;
                        return <Icon className="h-6 w-6 text-[#0A472E]" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0F1D15] font-mono">{selectedModule.name}</h3>
                      <p className="text-xs font-mono text-slate-500 font-medium">{selectedModule.path}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 font-mono">Compliance Impact</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedModule.complianceDetails}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 font-mono">Configured Security Controls</h4>
                    <ul className="space-y-3">
                      {selectedModule.securityFeatures.map((feature, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0A472E] mt-1.5 mr-3 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-slate-200 mt-8">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="w-full py-2.5 rounded-lg bg-[#0A472E] hover:bg-[#083623] text-xs font-mono font-bold text-[#FFFFFF] transition-all cursor-pointer shadow-sm"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
