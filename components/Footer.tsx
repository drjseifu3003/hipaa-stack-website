import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#F7F9F6] py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <Logo className="h-6 w-6" />
          <span className="font-mono text-sm font-bold tracking-tight text-[#0F1D15]">
            hipaa<span className="text-[#0A472E]">-stack</span>
          </span>
        </div>

        {/* License & Copy */}
        <div className="text-center md:text-right space-y-2">
          <p className="text-xs text-slate-600 leading-normal">
            Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-[#0F1D15] font-semibold underline transition-colors">MIT License</a>. Engineered for compliance teams and cloud developers.
          </p>
          <p className="text-[10px] font-mono text-slate-500">
            © {new Date().getFullYear()} hipaa-stack. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
