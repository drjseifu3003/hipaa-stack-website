# HIPAA Stack Website Agent Guidelines

This document defines the development rules, design system, SEO/AIO requirements, and the complete, exhaustive reference database of the **hipaa-stack** project. The AI agent must use this self-contained context to build a high-fidelity, production-grade Next.js and Tailwind CSS landing page for **hipaa-stack** with zero placeholders.

---

## 1. Brand Identity & Principles

Avoid generic templates or AI-generated placeholder styles. The website must feel authoritative, highly technical, and developer-first.

### A. Tone & Copywriting
*   **Engineering-First**: Speak directly to software engineers, cloud architects, and CTOs. Avoid marketing buzzwords ("revolutionary", "disruptive", "seamless"). Use concrete, precise terminology.
*   **Fact-Based Compliance**: Every feature must be tied back to actual HIPAA Technical Safeguards (45 CFR § 164.312) and AWS security practices.
*   **Actionable & Clear**: Focus on code readability, ease of integration, and architecture details.

### B. Brand Styling Tokens (Dark-Theme Primary)
*   **Background (Deep Obsidian)**: `bg-[#030712]`
*   **Card Fill (Glass-Slate)**: `bg-[#111827]/60` with a subtle semi-transparent border (`border-white/5`) and backdrop blur.
*   **Brand Primary (Clinical Blue)**: `#3B82F6` (HSL: `221, 83%, 53%`)
*   **Brand Accent (Compliance Emerald)**: `#10B981` (HSL: `162, 76%, 41%`)
*   **Text colors**: Primary `#F9FAFB` (high contrast), Secondary `#9CA3AF` (muted slate), Accent `#60A5FA` (bright blue).
*   **Typography**: Inter (primary sans-serif) and JetBrains Mono (for code blocks/terminals) via `next/font/google`.

---

## 2. Technology Stack & Production Readiness

The codebase must be built with modern, production-grade tools:
*   **Framework**: Next.js (App Router, React 18/19) with strict TypeScript.
*   **Styling**: Tailwind CSS (v3 or v4) utilizing CSS variables and utility classes.
*   **Icons**: Lucide React for clean, scalable, developer-focused vector icons.
*   **Components**: Custom accessible components built using React hooks and Tailwind, ensuring full keyboard navigability (WAI-ARIA compliance).
*   **Animation**: Smooth CSS transitions or Framer Motion for premium micro-animations (hover transitions, page fades).

---

## 3. SEO & AI Optimization (AIO) Standards

The landing page must rank highly in standard search engines (SEO) and be highly readable, context-rich, and indexable for AI search engines and LLMs (AIO - AI Optimization).

### A. Search Engine Optimization (SEO)
*   **Metadata API**: Implement the Next.js `Metadata` object in `app/layout.tsx` and `app/page.tsx` including:
    *   Optimized `title` (under 60 characters) and `description` (under 160 characters).
    *   OpenGraph and Twitter Card image, title, and description tags.
    *   Verification tags and canonical URLs.
*   **Semantic HTML**: Mandate correct HTML5 semantics: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`. Headings must follow a strict sequential hierarchy (`h1` -> `h2` -> `h3` -> `h4`).
*   **Performance**: Optimize images using `next/image`. Ensure a perfect 100/100 Lighthouse performance score.
*   **Sitemap & Robots**: Automatically generate `sitemap.ts` and `robots.ts` using Next.js routing.

### B. AI Engine Optimization (AIO)
*   **Structured JSON-LD**: Inject a structured JSON-LD script (using `application/ld+json`) representing the landing page as an open-source software application:
    *   `@type`: `"SoftwareApplication"` / `"OpenSourceSourceCode"`
    *   `name`: `"HIPAA Stack"`
    *   `applicationCategory`: `"DeveloperApplication"`
    *   `operatingSystem`: `"AWS Cloud / Terraform"`
    *   `requirements`: `"Terraform >= 1.3.0, AWS Provider ~> 5.0"`
    *   `offers`: Free/Open Source (MIT License).
*   **Direct Answer Architecture**: Structure text so AI crawlers can easily extract answers to questions like "How does HIPAA Stack encrypt S3?" or "Which HIPAA citation maps to the RDS module?".
*   **Self-Documenting Code Snippets**: Accompany all code blocks with concise descriptive text and clear comments indicating the specific CFR regulatory mapping.
*   **LLM-Friendly Resource (`/llms.txt`)**: Include an `app/llms.txt/route.ts` file that returns plain-text documentation of the project structure, CLI usage, and module locations, designed specifically for AI assistants to parse instantly.

---

## 4. Exhaustive Reference Database: HIPAA Stack

The following reference sections contain 100% of the technical details of the `hipaa-stack` library. You must incorporate this exact data into the website content, interactive module grid, and documentation guides.

### A. Modular Service Catalog & Security Specifications

| Modular Service | Path / Directory | Compliance Coverage | Configured Security Features |
| :--- | :--- | :--- | :--- |
| 🛡️ **VPC** | `services/vpc` | Network Isolation (§164.312(a)(1)) | Custom VPC with isolated private subnets (no direct public routes). Enables VPC Flow Logs routed to CloudWatch. Provisions AWS PrivateLink Interface Endpoints for secure, internal network routing of AWS API traffic (S3, KMS, Secrets Manager) without crossing the public internet. |
| 🔑 **KMS** | `services/kms` | Cryptographic Control (§164.312(a)(2)(iv)) | Provisions a Customer Managed Key (CMK) with automatic annual rotation enforced (`enable_key_rotation = true`). Enforces a strict, least-privilege key policy restricting access to designated service roles and VPC origins. |
| 🗄️ **S3** | `services/s3` | Immutable Storage (§164.312(c)(1)) | Enforces Server-Side Encryption backed by KMS (SSE-KMS) utilizing the CMK. Activates `aws_s3_bucket_public_access_block` to block all public access. Enforces S3 Object Versioning. Attaches a bucket policy that explicitly denies non-HTTPS requests (`aws:SecureTransport = "false"`). Exports access logs to an independent audit bucket. |
| 🗃️ **RDS** | `services/rds` | Secure Database (§164.312(a)(2)(iv)) | Deploys a Multi-AZ PostgreSQL database instance in isolated private subnet groups. Enforces full storage encryption and Performance Insights encryption utilizing the KMS key. Mandates SSL/TLS connections via parameter group (`rds.force_ssl = 1`). Enforces IAM Database Authentication. |
| 🩺 **HealthLake** | `services/healthlake` | Standardized Exchange (§164.312(a)(2)(iv)) | Provisions a native Amazon HealthLake FHIR R4 clinical datastore. Enforces database-level encryption utilizing the Customer Managed Key (CMK) for standardized exchange of electronic health records. |
| 🚀 **Fargate** | `services/fargate` | Isolated Compute (§164.312(a)(1)) | Provisions an ECS Fargate Cluster. Enforces container execution inside isolated private subnets. Utilizes Task Execution IAM roles restricting containers to least-privilege AWS API access. Automatically exports application stdout/stderr logs directly to KMS-encrypted CloudWatch log groups. |
| 🛡️ **VPN** | `services/vpn` | Secure Ingress (§164.312(a)(1)) | Provisions an AWS Client VPN Endpoint. Restricts network ingress to authenticated clients utilizing certificate-based VPN tunnels. Enables connection logging to CloudWatch. |
| 🎛️ **WAF** | `services/waf` | Exploit Defense (§164.312(a)(1)) | Provisions an AWS WAFv2 Web ACL. Enforces AWS-managed rule groups including SQL Injection (SQLi) prevention, Common Rule Set (CRS) exploit protection, and Core Rule Set to shield the Application Load Balancer. |
| 📜 **CloudTrail** | `services/cloudtrail` | Complete Auditing (§164.312(b)) | Provisions a multi-region organizational CloudTrail. Enforces Log File Validation to prevent tampering. Captures both management API operations and detailed S3 data-plane read/write events. Streams trails to a KMS-encrypted CloudWatch Log Group. |
| 📈 **CloudWatch** | `services/cloudwatch` | Encryption Logs (§164.312(b)) | Establishes centralized CloudWatch Log Groups. Enforces log group storage encryption utilizing the KMS CMK. Configures log retention periods to at least 365 days to meet clinical auditing compliance guidelines. |
| 🔏 **Secrets Manager** | `services/secretsmanager` | Secret Isolation (§164.312(a)(2)(iv)) | Stores database credentials and API keys. Enforces encryption utilizing the KMS key. Configures automated rotation schedules for active credentials. |
| 🚨 **GuardDuty** | `services/guardduty` | Threat Intelligence (§164.312(b)) | Deploys AWS GuardDuty detector. Enforces continuous intelligent scanning of VPC Flow Logs, DNS logs, and CloudTrail events to identify brute-force access, credential leakage, and anomalous API patterns. |
| 💾 **Backup** | `services/backup` | Disaster Recovery (§164.312(c)(1)) | Provisions an AWS Backup Vault with a custom compliance vault lock. Configures a backup plan executing automated daily snapshots of RDS and S3 resources with defined lifecycle retention policies. |

---

### B. Detailed HIPAA Citation Mapping Matrix

Use this matrix to explain how the infrastructure meets the **HIPAA Security Rule Technical Safeguards (45 CFR § 164.312)**.

#### 1. Access Control (§ 164.312(a)(1))
*   **Requirement**: Grant access to systems containing Electronic Protected Health Information (ePHI) only to authorized users and software processes.
*   **Stack Implementation**:
    *   `services/vpc` isolates compute workloads and database clusters inside private subnets with no route to or from the internet.
    *   `services/vpn` restricts management and developer access to authenticated clients through TLS-encrypted VPN tunnels.
    *   `services/waf` shields public-facing Application Load Balancers from automated scraping, SQL injection, and cross-site scripting.
    *   `services/fargate` enforces IAM task execution roles, granting containerized applications least-privilege access to other AWS services.

#### 2. Encryption and Decryption (§ 164.312(a)(2)(iv))
*   **Requirement**: Implement mechanisms to encrypt and decrypt Electronic Protected Health Information (ePHI).
*   **Stack Implementation**:
    *   `services/kms` establishes a Customer Managed Key (CMK) with automatic annual rotation enabled.
    *   `services/s3` configures default SSE-KMS encryption utilizing the CMK and enables S3 bucket keys to reduce KMS cost.
    *   `services/rds` enforces storage-level and backup-level encryption using the CMK.
    *   `services/healthlake` provisions a FHIR R4 clinical datastore encrypted at rest.

#### 3. Audit Controls (§ 164.312(b))
*   **Requirement**: Implement mechanisms that record and examine activity in systems containing or using ePHI.
*   **Stack Implementation**:
    *   `services/cloudtrail` captures all management actions and S3 data-plane events (object reads, writes, deletes) with log file integrity validation enabled.
    *   `services/cloudwatch` encrypts log streams using the KMS CMK and enforces a 365-day retention policy to preserve the audit trail.
    *   `services/guardduty` continuously monitors VPC flow logs and API activities to detect brute-force and credential leakage.

#### 4. Data Integrity (§ 164.312(c)(1))
*   **Requirement**: Implement policies and procedures to protect ePHI from improper alteration or destruction.
*   **Stack Implementation**:
    *   `services/s3` enforces Object Versioning to retain the history of all document states, protecting against accidental overrides or deletions.
    *   `services/backup` automates daily snapshots of S3 and RDS, storing them in a secure backup vault secured with a custom retention lock.

#### 5. Transmission Security (§ 164.312(e)(1))
*   **Requirement**: Guard against unauthorized access to ePHI while in transit.
*   **Stack Implementation**:
    *   `services/s3` attaches a bucket policy that denies all HTTP requests that lack the `aws:SecureTransport = "true"` condition.
    *   `services/vpc` deploys AWS PrivateLink Interface Endpoints within the private subnets. All system calls to S3, KMS, Secrets Manager, and other APIs route entirely within the private AWS network backbone, never crossing public internet paths.

---

### C. The 18 Protected Health Information (PHI) Identifiers
The website must educate developers on what constitutes PHI under the HIPAA Privacy Rule. Any clinical indicator combined with **any** of the following 18 identifiers is PHI:

1.  **Names**
2.  **Geographic subdivisions smaller than a state** (street addresses, ZIP codes)
3.  **Dates directly related to an individual** (birth, admission, discharge, death dates)
4.  **Telephone numbers**
5.  **Fax numbers**
6.  **Email addresses**
7.  **Social Security Numbers (SSN)**
8.  **Medical Record Numbers (MRN)**
9.  **Health plan beneficiary numbers**
10. **Account numbers**
11. **Certificate/license numbers**
12. **Vehicle identifiers and serial numbers** (including license plates)
13. **Device identifiers and serial numbers**
14. **Web Universal Resource Locators (URLs)**
15. **Internet Protocol (IP) addresses**
16. **Biometric identifiers** (fingerprints, voiceprints)
17. **Full-face photographs** and comparable images
18. **Any other unique identifying number, characteristic, or code**

*Application Rule*: Ensure that application logs, error messages, and telemetry events do not print raw PHI. Use database-generated UUIDs or secure hashes as target identifiers in audit trails. Never pass patient names or MRNs in audit payload fields.

---

### D. Compliant Infrastructure Code Templates (Terraform)

These are the exact, production-ready Terraform patterns implemented in the stack. Include these in the code tabs.

#### 1. S3 Secure Storage Module (`services/s3/main.tf`)
```hcl
# HIPAA-Compliant S3 Storage Service
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
          "${aws_s3_bucket.phi.arn}/*"
        ]
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })
}
```

#### 2. Key Management Service Module (`services/kms/main.tf`)
```hcl
# HIPAA-Compliant KMS Encryption Keys
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
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
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
  name          = "alias/${var.key_alias}"
  target_key_id = aws_kms_key.app_encryption_key.key_id
}
```

---

### E. Compliant Application Integration Templates (Python / Flask)

Provide these code patterns to demonstrate how applications running on the infrastructure securely process data.

#### 1. Structured, PHI-Redacted Audit Logging
```python
import json
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
    clean = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[SSN_REDACTED]', raw_message)
    clean = re.sub(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', '[EMAIL_REDACTED]', clean)
    clean = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '[PHONE_REDACTED]', clean)
    return clean
```

#### 2. Role-Based Access Control (RBAC) and Minimum Necessary Disclosure
```python
from functools import wraps
from flask import g, abort

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
    return decorator
```

---

## 5. Verification Checklist for the AI Agent

- [ ] **Accessibility (a11y)**: Page passes WCAG AA contrast ratios and is fully keyboard-accessible.
- [ ] **Strict TypeScript**: Code builds without a single compiler warning or type bypass (`any`).
- [ ] **SEO Validation**: Run Next.js build to confirm metadata, sitemaps, and robots generate successfully.
- [ ] **AIO Validation**: Verify JSON-LD script is valid and the `/llms.txt` route serves plain text.
- [ ] **Performance**: Image assets utilize `next/image` and have explicit aspect ratios.
- [ ] **Complete Reference Mapping**: Verify that all 13 modules and 5 detailed HIPAA safeguards are fully represented on the website copy.
