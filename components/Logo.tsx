interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      {/* Isometric Stacked Shield Branded Logo */}
      {/* Top Layer (Forest Green) */}
      <path
        d="M 16 3 L 26 7 L 26 10.5 L 16 6.5 L 6 10.5 L 6 7 Z"
        fill="#0A472E"
      />
      {/* Middle Layer (Clinical Slate) */}
      <path
        d="M 16 9.5 L 26 13.5 L 26 17 L 16 13 L 6 17 L 6 13.5 Z"
        fill="#1D3E4C"
      />
      {/* Bottom Layer (Deep Forest) */}
      <path
        d="M 16 16 L 26 20 L 26 22.5 C 26 26.5 21 28.5 16 30 C 11 28.5 6 26.5 6 22.5 L 6 20 Z"
        fill="#0F1D15"
      />
    </svg>
  );
}
