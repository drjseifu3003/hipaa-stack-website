"use client";

import { useState } from "react";
import { FileCode, Copy, Check, Lock } from "lucide-react";

interface CodeSnippet {
  name: string;
  filename: string;
  language: "hcl" | "python";
  citation: string;
  summary: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    name: "S3 Secure Storage",
    filename: "services/s3/main.tf",
    language: "hcl",
    citation: "§ 164.312(a)(2)(iv) Encryption, § 164.312(c)(1) Integrity, § 164.312(e)(1) Transmission",
    summary: "Configures default KMS-SSE bucket encryption, blocks all public access paths, enforces object versioning, and denies non-HTTPS transport operations.",
    code: `# HIPAA-Compliant S3 Storage Service
# Aligns with: 164.312(a)(2)(iv) Encryption, 164.312(c)(1) Integrity, 164.312(e)(1) Transmission Security

resource "aws_s3_bucket" "phi" {
  bucket        = var.bucket_name
  force_destroy = false

  tags = {
    Environment = var.environment
    Compliance  = "HIPAA"
  }
}

resource "aws_s3_bucket_public_access_block" "phi_block" {
  bucket = aws_s3_bucket.phi.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "phi_versioning" {
  bucket = aws_s3_bucket.phi.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "phi_encryption" {
  bucket = aws_s3_bucket.phi.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = var.kms_key_arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_policy" "phi_policy" {
  bucket = aws_s3_bucket.phi.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "EnforceTLSRequestsOnly"
        Effect    = "Deny"
        Principal = "*"
        Action    = "s3:*"
        Resource = [
          aws_s3_bucket.phi.arn,
          "\${aws_s3_bucket.phi.arn}/*"
        ]
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })
}`
  },
  {
    name: "KMS Encryption Keys",
    filename: "services/kms/main.tf",
    language: "hcl",
    citation: "§ 164.312(a)(2)(iv) Encryption Key Control",
    summary: "Creates a Customer Managed Key (CMK) enforcing automatic annual rotation and a key policy restricting use to authorized VPC origins.",
    code: `# HIPAA-Compliant KMS Encryption Keys
# Aligns with: 164.312(a)(2)(iv) Encryption Key Control

resource "aws_kms_key" "app_encryption_key" {
  description             = "Customer Managed Key for HIPAA compliance data encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true # Required under HIPAA Security Rule

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowIAMAdministrators"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::\${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "RestrictToVPCOrigins"
        Effect = "Deny"
        Principal = "*"
        Action    = "kms:*"
        Condition = {
          StringNotEquals = {
            "aws:sourceVpc" = var.vpc_id
          }
        }
      }
    ]
  })

  tags = {
    Environment = var.environment
    Compliance  = "HIPAA"
  }
}

resource "aws_kms_alias" "key_alias" {
  name          = "alias/\${var.key_alias}"
  target_key_id = aws_kms_key.app_encryption_key.key_id
}`
  },
  {
    name: "Redacted Audit Log",
    filename: "app/audit_logging.py",
    language: "python",
    citation: "§ 164.312(b) Audit Controls, § 164.312(c)(1) Integrity",
    summary: "Constructs structured JSON audit trails using database hashes. Implements regex pattern scrubbing to filter and redact raw PHI from diagnostic log streams.",
    code: `import json
import uuid
import re
import logging
from datetime import datetime, timezone
from enum import Enum

audit_logger = logging.getLogger("hipaa.audit")

class AccessAction(Enum):
    READ   = "READ"
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"
    EXPORT = "EXPORT"

def record_audit_event(
    user_identity: str,
    action: AccessAction,
    record_type: str,
    record_id: str,
    client_ip: str,
    status: str = "SUCCESS",
    error_details: str = None
) -> dict:
    """
    Constructs and writes a HIPAA-compliant audit trail event.
    IMPORTANT: Do not pass clinical text, patient names, or contact data here.
    """
    event = {
        "event_uuid": str(uuid.uuid4()),
        "utc_timestamp": datetime.now(timezone.utc).isoformat(),
        "actor": user_identity,
        "action": action.value,
        "target_type": record_type,
        "target_id": record_id, # Must be a database UUID or hash, not patient name/MRN
        "origin_ip": client_ip,
        "outcome": status
    }
    
    if error_details:
        event["error_summary"] = filter_phi_from_error(error_details)
        
    audit_logger.info(json.dumps(event))
    return event

def filter_phi_from_error(raw_message: str) -> str:
    """Removes potential identifiers from diagnostic log messages."""
    # Redact standard formats (SSNs, emails, phone numbers)
    clean = re.sub(r'\\b\\d{3}-\\d{2}-\\d{4}\\b', '[SSN_REDACTED]', raw_message)
    clean = re.sub(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', '[EMAIL_REDACTED]', clean)
    clean = re.sub(r'\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b', '[PHONE_REDACTED]', clean)
    return clean`
  },
  {
    name: "Role Access Control",
    filename: "app/access_control.py",
    language: "python",
    citation: "§ 164.312(a)(1) Access Control",
    summary: "Decorators enforcing the 'Minimum Necessary' disclosure standard using role-based clearances mapping to specific database record types.",
    code: `from functools import wraps
from flask import g, abort
from enum import Enum

class StaffRole(Enum):
    PHYSICIAN = "physician"
    CLINICAL_SUPPORT = "clinical_support"
    BILLING = "billing"
    ADMINISTRATOR = "administrator"

# Permissions matrix mapping access permissions to patient data types
ACCESS_POLICY = {
    StaffRole.PHYSICIAN:         {"clinical": True,  "billing": True},
    StaffRole.CLINICAL_SUPPORT:  {"clinical": True,  "billing": False},
    StaffRole.BILLING:           {"clinical": False, "billing": True},
    StaffRole.ADMINISTRATOR:     {"clinical": False, "billing": False}
}

def enforce_access_scope(required_scope: str):
    """Enforces the 'Minimum Necessary' disclosure standard."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            current_role = StaffRole(g.user.role)
            has_permission = ACCESS_POLICY.get(current_role, {}).get(required_scope, False)
            
            if not has_permission:
                record_audit_event(
                    user_identity=g.user.username,
                    action=AccessAction.READ,
                    record_type=required_scope,
                    record_id="ACCESS_DENIED",
                    client_ip=g.user.ip_address,
                    status="DENIED"
                )
                abort(403, "Access Denied: Insufficient scope clearance.")
                
            return func(*args, **kwargs)
        return wrapper
    return decorator`
  }
];

export default function CodePlayground() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // High-contrast syntax highlighter for light mode (Warm Sage & Chalk)
  const formatLine = (line: string, lang: "hcl" | "python") => {
    const trimmed = line.trim();
    if (trimmed.startsWith("#") || trimmed.startsWith('"""') || trimmed.startsWith('*')) {
      return <span className="text-slate-500 italic font-semibold">{line}</span>;
    }

    if (lang === "hcl") {
      // Colorize keywords: resource, variable, output
      if (trimmed.startsWith("resource ") || trimmed.startsWith("variable ") || trimmed.startsWith("output ")) {
        const firstWord = trimmed.split(" ")[0];
        const rest = line.substring(line.indexOf(firstWord) + firstWord.length);
        return (
          <>
            <span className="text-[#0A472E] font-black">{firstWord}</span>
            <span className="text-slate-800 font-medium">{rest}</span>
          </>
        );
      }
    } else if (lang === "python") {
      // Colorize decorators
      if (trimmed.startsWith("@")) {
        return <span className="text-[#1D3E4C] font-bold">{line}</span>;
      }
      // Colorize definitions/classes
      if (trimmed.startsWith("def ") || trimmed.startsWith("class ") || trimmed.startsWith("import ") || trimmed.startsWith("from ")) {
        const firstWord = trimmed.split(" ")[0];
        const rest = line.substring(line.indexOf(firstWord) + firstWord.length);
        return (
          <>
            <span className="text-[#0A472E] font-black">{firstWord} </span>
            <span className="text-slate-800 font-medium">{rest}</span>
          </>
        );
      }
    }

    // Default high contrast line
    return <span className="text-slate-800 font-medium">{line}</span>;
  };

  return (
    <section id="playground" className="py-24 border-t border-slate-200 bg-[#F7F9F6]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-bold text-[#0A472E] uppercase tracking-widest">Code integrations</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F1D15] sm:text-4xl mt-2 font-mono">
            Compliant Integration Templates
          </h2>
          <p className="mt-4 text-slate-600 text-sm font-medium">
            Examine production-ready, security-hardened configurations. Switch between infrastructure blueprints and application logic patterns.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4 items-start">
          
          {/* File Selection Tabs Column */}
          <div className="lg:col-span-1 space-y-2">
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-4 font-mono">Select Template</h4>
            {snippets.map((snippet, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx);
                  setCopied(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#0A472E]/5 border-[#0A472E]/25 text-[#0A472E] font-bold shadow-sm"
                    : "border-slate-300 bg-[#FFFFFF] text-slate-700 hover:text-[#0F1D15] hover:border-slate-400 shadow-sm"
                }`}
              >
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <FileCode className="h-4 w-4 shrink-0" />
                  <span className="truncate">{snippet.name}</span>
                </div>
              </button>
            ))}

            <div className="mt-8 p-4 rounded-xl border border-slate-300 bg-[#FFFFFF] shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <Lock className="h-4 w-4 text-[#0A472E] stroke-[2.2]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider">CFR Security Citation</span>
              </div>
              <p className="text-[11px] font-mono text-[#0A472E] leading-normal font-extrabold">
                {activeSnippet.citation}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {activeSnippet.summary}
              </p>
            </div>
          </div>

          {/* Code Viewer Column */}
          <div className="lg:col-span-3 rounded-xl border border-slate-300 bg-[#FFFFFF] shadow-lg shadow-slate-950/2 overflow-hidden flex flex-col">
            
            {/* Code Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
              <span className="font-mono text-xs text-slate-600 font-bold">
                {activeSnippet.filename}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-md border border-slate-300 hover:border-slate-400 bg-[#FFFFFF] text-[10px] font-mono text-slate-700 hover:text-black transition-all cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#0A472E] stroke-[2.5]" />
                    <span className="text-[#0A472E] font-extrabold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="font-bold">COPY CODE</span>
                  </>
                )}
              </button>
            </div>

            {/* Fenced Code Container */}
            <div className="p-5 overflow-auto font-mono text-xs leading-relaxed max-h-[480px] min-h-[380px] bg-[#FBFBFA]">
              <pre className="whitespace-pre">
                {activeSnippet.code.split("\n").map((line, idx) => (
                  <div key={idx} className="flex hover:bg-slate-200/20 py-0.5 px-1 rounded transition-colors">
                    <span className="w-8 text-slate-500 font-bold text-right pr-4 select-none border-r border-slate-300 mr-4">{idx + 1}</span>
                    <code>{formatLine(line, activeSnippet.language)}</code>
                  </div>
                ))}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
