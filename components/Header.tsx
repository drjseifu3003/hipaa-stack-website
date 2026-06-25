import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#F7F9F6]/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2.5 shrink-0">
          <Logo className="h-7 w-7" />
          <span className="font-mono text-lg font-bold tracking-tight text-[#0F1D15] whitespace-nowrap">
            hipaa<span className="text-[#0A472E]">-stack</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider text-slate-700">
          <Link href="#features" className="hover:text-[#0F1D15] transition-colors">Features</Link>
          <Link href="#architecture" className="hover:text-[#0F1D15] transition-colors">Architecture</Link>
          <Link href="#modules" className="hover:text-[#0F1D15] transition-colors">Modules</Link>
          <Link href="#playground" className="hover:text-[#0F1D15] transition-colors">Code Snippets</Link>
          <Link href="#phi" className="hover:text-[#0F1D15] transition-colors">PHI Guidelines</Link>
        </nav>

        <div>
          <a
            href="https://github.com/drjseifu3003/hipaa-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-[#FFFFFF] px-4 py-2 text-xs font-mono font-bold text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:text-black transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
