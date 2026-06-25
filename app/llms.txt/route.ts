import { NextResponse } from "next/server";

export async function GET() {
  const content = `# HIPAA Stack - AWS Compliance Infrastructure

## Overview
HIPAA Stack is a production-ready, security-hardened library of Terraform modules designed specifically to deploy HIPAA-compliant environments on AWS.

## Core Services
1. VPC: Private subnets, flow logging, and AWS PrivateLink interface endpoints.
2. KMS: Customer Managed Keys (CMK) with automated annual rotation.
3. S3: Encrypted object storage (SSE-KMS) with HTTPS enforced and object versioning.
4. RDS: Encrypted Multi-AZ PostgreSQL with SSL enforced.
5. HealthLake: Native FHIR R4 clinical datastore with encryption.
6. Fargate: Isolated container compute running within private boundaries.
7. VPN: Authenticated, encrypted client connections.
8. WAF: Application shielding against web exploits and DDoS.
9. CloudTrail: Multi-region administrative auditing.
10. CloudWatch: Encrypted log stores with 365-day retention policies.
11. Secrets Manager: Automated rotation and key separation.
12. GuardDuty: Continuous threat monitoring.
13. Backup: Automated snapshots with custom vault retention locks.

## Key Compliance Mapping (45 CFR § 164.312)
- Network Isolation (§164.312(a)(1)) -> VPC, VPN, WAF, Fargate.
- Encryption at Rest & Transit (§164.312(a)(2)(iv)) -> KMS, S3, RDS, HealthLake, Secrets Manager.
- Auditing & Monitoring (§164.312(b)) -> CloudTrail, CloudWatch, GuardDuty.
- Data Integrity (§164.312(c)(1)) -> S3 Versioning, AWS Backup.
- Transmission Security (§164.312(e)(1)) -> S3 Secure Transport, VPC PrivateLink Endpoints.

## Integration
Deploy modules directly using Terraform:
\`\`\`hcl
module "compliance_kms" {
  source    = "github.com/drjseifu3003/hipaa-stack//services/kms"
  key_alias = "phi-encryption-key"
}
\`\`\`
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
