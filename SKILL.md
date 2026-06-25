---
name: hipaa-stack-website-builder
description: Comprehensive blueprint and interactive guidelines for building a premium, production-ready developer landing page for the hipaa-stack project using Next.js, TypeScript, and Tailwind CSS.
model: gemini-2.5-pro
color: indigo
metadata:
  author: HIPAA Stack Architect
  version: 2.0.0
  category: web-development-landing-page
  tags: [nextjs, tailwind, typescript, seo, aio, compliance]
---

# Next.js Landing Page Blueprint for HIPAA Stack

You are acting as a senior front-end architect specializing in high-performance Next.js architectures, Tailwind CSS design systems, and advanced SEO/AIO optimization. 

Use this document as a complete, production-ready specification to build the **hipaa-stack** landing page.

---

## 1. Project Directory Structure

```text
├── app/
│   ├── layout.tsx         # Main layout with Metadata, Fonts, and JSON-LD
│   ├── page.tsx           # Home page containing all sections
│   ├── sitemap.ts         # Next.js SEO Sitemap generator
│   ├── robots.ts          # Next.js SEO Robots.txt generator
│   └── llms.txt/
│       └── route.ts       # AI-friendly plain text documentation endpoint
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── TerminalMock.tsx   # Hero section terminal simulator
│   ├── Safeguards.tsx     # Compliance grid component
│   ├── ModuleExplorer.tsx # Interactive dashboard of modules
│   ├── CodePlayground.tsx # Tabbed Terraform snippet viewer
│   ├── Architecture.tsx   # Responsive, interactive SVG diagram
│   └── Footer.tsx         # Footer with metadata and license
├── public/
│   └── favicon.ico        # Site icon
├── tailwind.config.js     # Tailwind configurations
├── tsconfig.json          # Strict TypeScript config
└── package.json           # Next.js, React, Tailwind dependencies
```

---

## 2. Component Blueprints & Content

### A. Main Layout (`app/layout.tsx`)
Implement the core HTML shell, Google Font (Inter & JetBrains Mono), Next.js Metadata API, and JSON-LD schema.

```typescript
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "HIPAA Stack | Production-Ready AWS Compliance Infrastructure",
  description: "Deploy secure, modular, and battle-tested AWS infrastructure utilizing Terraform blueprints engineered to satisfy HIPAA / HITECH Technical Safeguards.",
  keywords: ["HIPAA Compliance", "AWS Security", "Terraform", "Infrastructure as Code", "Healthcare IT", "ePHI Encryption", "Clinical Systems"],
  authors: [{ name: "HIPAA Stack Architect" }],
  openGraph: {
    title: "HIPAA Stack | AWS Compliance Infrastructure",
    description: "Modular, security-hardened Infrastructure as Code blueprints satisfying HIPAA / HITECH safeguards on AWS.",
    url: "https://healthstack.tf",
    siteName: "HIPAA Stack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIPAA Stack | AWS Compliance Infrastructure",
    description: "Modular, security-hardened Infrastructure as Code blueprints satisfying HIPAA / HITECH safeguards on AWS.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HIPAA Stack",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "AWS Cloud / Terraform",
    "description": "Production-ready, modular Infrastructure as Code (IaC) blueprints engineered specifically to satisfy HIPAA / HITECH Technical Safeguards on Amazon Web Services (AWS).",
    "license": "https://opensource.org/licenses/MIT",
    "requirements": "Terraform >= 1.3.0, AWS Provider ~> 5.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030712] text-[#F9FAFB] font-sans antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
```

### B. Header Component (`components/Header.tsx`)
A glassy, responsive navigation bar.

```typescript
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030712]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-emerald-400 stroke-[2.5]" />
          <span className="font-mono text-lg font-bold tracking-tight text-[#F9FAFB]">
            hipaa<span className="text-blue-500">-stack</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-[#F9FAFB] transition-colors">Features</Link>
          <Link href="#modules" className="hover:text-[#F9FAFB] transition-colors">Modules</Link>
          <Link href="#architecture" className="hover:text-[#F9FAFB] transition-colors">Architecture</Link>
          <Link href="#integration" className="hover:text-[#F9FAFB] transition-colors">Integration</Link>
        </nav>

        <div>
          <a
            href="https://github.com/drjseifu3003/hipaa-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-[#111827] px-4 py-2 text-xs font-semibold text-[#F9FAFB] hover:bg-[#1f2937] hover:border-white/20 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
```

### C. Terminal Simulator (`components/TerminalMock.tsx`)
Simulates a real Terraform deployment sequence to show instant production-readiness.

```typescript
export default function TerminalMock() {
  return (
    <div className="w-full rounded-xl border border-white/5 bg-[#0b0f19] p-4 shadow-2xl shadow-blue-950/10 font-mono text-xs text-slate-400">
      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
        <div className="flex space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-500">terraform CLI</span>
      </div>
      <div className="space-y-1.5 text-[11px] leading-relaxed">
        <p className="text-[#F9FAFB]"><span className="text-emerald-400">$</span> terraform apply -auto-approve</p>
        <p className="text-slate-500">Initializing provider plugins...</p>
        <p className="text-slate-400">Terraform will perform the following actions:</p>
        <p className="text-blue-400">  + module.compliance_kms.aws_kms_key.app_encryption_key</p>
        <p className="text-blue-400">  + module.compliance_vpc.aws_vpc.main</p>
        <p className="text-blue-400">  + module.compliance_storage.aws_s3_bucket.phi</p>
        <p className="text-blue-400">  + module.compliance_database.aws_db_instance.phi_rds</p>
        <p className="text-slate-400">Plan: 18 to add, 0 to change, 0 to destroy.</p>
        <p className="text-slate-500 mt-2">module.compliance_kms.aws_kms_key.app_encryption_key: Creating...</p>
        <p className="text-emerald-400">module.compliance_kms.aws_kms_key.app_encryption_key: Creation complete [id=arn:aws:kms:us-east-1:123456789012:key/phi-key]</p>
        <p className="text-slate-500">module.compliance_storage.aws_s3_bucket.phi: Creating...</p>
        <p className="text-emerald-400">module.compliance_storage.aws_s3_bucket.phi: Creation complete [id=clinical-patient-records-prod]</p>
        <p className="text-slate-200 font-semibold mt-2">Apply complete! Resources: 18 added, 0 changed, 0 destroyed.</p>
      </div>
    </div>
  );
}
```

### D. Compliance Grid (`components/Safeguards.tsx`)
Highly technical breakdowns of the 4 HIPAA pillars.

```typescript
import { Shield, Key, Eye, RefreshCw } from "lucide-react";

const safeguards = [
  {
    title: "Data Isolation & Network Security",
    citation: "§ 164.312(a)(1)",
    icon: Shield,
    color: "text-blue-400",
    shadow: "shadow-blue-500/5",
    desc: "Deploy databases (RDS PostgreSQL) and compute workloads (ECS Fargate) solely in isolated private subnets. Enforce zero public routing. Secure external ingress through AWS WAFv2 and AWS Client VPN tunnel interfaces."
  },
  {
    title: "Encryption Everywhere",
    citation: "§ 164.312(a)(2)(iv)",
    icon: Key,
    color: "text-emerald-400",
    shadow: "shadow-emerald-500/5",
    desc: "Enforce AES-256 Server-Side Encryption (SSE-KMS) backed by a Customer Managed Key (CMK) with automated annual rotation. Reject non-HTTPS traffic on S3 and mandate SSL/TLS on database channels."
  },
  {
    title: "Immutable Auditing & Monitoring",
    citation: "§ 164.312(b)",
    icon: Eye,
    color: "text-amber-400",
    shadow: "shadow-amber-500/5",
    desc: "Capture management and S3 data-plane events using AWS CloudTrail. Centralize system activity in KMS-encrypted CloudWatch Log Groups, retaining records for a clinical-audit compliant 365 days."
  },
  {
    title: "Integrity & Disaster Recovery",
    citation: "§ 164.312(c)(1)",
    icon: RefreshCw,
    color: "text-purple-400",
    shadow: "shadow-purple-500/5",
    desc: "Protect ePHI from accidental deletion or malicious modification. Enforce S3 Object Versioning alongside automated daily snapshot backups utilizing AWS Backup vaults with custom retention locks."
  }
];

export default function Safeguards() {
  return (
    <section id="features" className="py-24 border-t border-white/5 bg-[#030712]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#F9FAFB] sm:text-4xl">
            Hardened to Meet CFR § 164.312 Safeguards
          </h2>
          <p className="mt-4 text-slate-400">
            Every module in the stack corresponds directly to a technical safeguard mandated by the HIPAA Security Rule.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {safeguards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={`rounded-xl border border-white/5 bg-[#111827]/30 p-6 shadow-xl ${item.shadow} hover:border-white/10 transition-all`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-6 w-6 ${item.color}`} />
                  <span className="font-mono text-xs font-bold text-slate-500 uppercase">{item.citation}</span>
                </div>
                <h3 className="text-base font-semibold text-[#F9FAFB] mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### E. LLM-Friendly Metadata Route (`app/llms.txt/route.ts`)
Returns plain-text context optimized for AI Search Engines and LLMs.

```typescript
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

## Key Compliance Mapping
- Network Isolation: 45 CFR § 164.312(a)(1) -> VPC, VPN, WAF, Fargate.
- Encryption at Rest & Transit: 45 CFR § 164.312(a)(2)(iv) -> KMS, S3, RDS, HealthLake.
- Auditing & Monitoring: 45 CFR § 164.312(b) -> CloudTrail, CloudWatch Log Groups.
- Disaster Recovery: 45 CFR § 164.312(c)(1) -> S3 Versioning, AWS Backup.

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
```

---

## 3. SEO Sitemap (`app/sitemap.ts`)
Automatically generates a crawlable sitemap.

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://healthstack.tf",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

---

## 4. Robots Config (`app/robots.ts`)
Controls search engine indexing.

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://healthstack.tf/sitemap.xml",
  };
}
```

---

## 5. Tailwind Configuration (`tailwind.config.js`)
Configures the dark-theme brand presets.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          background: "#030712",
          card: "#111827",
          blue: "#3B82F6",
          emerald: "#10B981",
        }
      }
    },
  },
  plugins: [],
}
```

---

## 6. Verification Steps for the AI Agent

Ensure the landing page satisfies:
1.  **Lighthouse Audit**: Run Next.js compilation (`npm run build`). Verify that all pages pre-render statically for maximum performance and SEO.
2.  **Metadata Check**: Inspect generated HTML headers to verify that `title`, `description`, `og:image`, `twitter:card`, and the JSON-LD script are injected correctly.
3.  **AIO Verification**: Access the `/llms.txt` path locally to ensure it delivers structured plain-text documentation.
4.  **Accessibility**: Confirm contrast ratios and verify that keyboard focus moves logically through the navigation, code tabs, and module grid.
