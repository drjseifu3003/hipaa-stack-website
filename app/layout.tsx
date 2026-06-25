import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://healthstack.tf"),
  title: "HIPAA Stack | Production-Ready AWS Compliance Infrastructure",
  description: "Deploy secure, modular, and battle-tested AWS infrastructure utilizing Terraform blueprints engineered to satisfy HIPAA / HITECH Technical Safeguards.",
  keywords: ["HIPAA Compliance", "AWS Security", "Terraform", "Infrastructure as Code", "Healthcare IT", "ePHI Encryption", "Clinical Systems"],
  authors: [{ name: "HIPAA Stack Architect" }],
  openGraph: {
    title: "HIPAA Stack | AWS Compliance Infrastructure",
    description: "Modular, security-hardened Infrastructure as Code blueprints satisfying HIPAA / HITECH safeguards on AWS.",
    url: "https://healthstack.tf",
    siteName: "HIPAA Stack",
    images: [
      {
        url: "/twitter-card.png",
        width: 1200,
        height: 630,
        alt: "HIPAA Stack Social Preview Card",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIPAA Stack | AWS Compliance Infrastructure",
    description: "Modular, security-hardened Infrastructure as Code blueprints satisfying HIPAA / HITECH safeguards on AWS.",
    images: ["/twitter-card.png"],
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
      <body className="bg-[#F7F9F6] text-[#0F1D15] font-sans antialiased selection:bg-emerald-500/10">
        {children}
      </body>
    </html>
  );
}
