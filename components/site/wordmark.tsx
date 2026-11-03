import { cn } from "@/lib/utils";

/**
 * Marca provisória em SVG. Substitua pelo símbolo oficial em public/brand
 * quando o arquivo estiver disponível (ver README).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span translate="no" className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-6 shrink-0"
        focusable="false"
      >
        <defs>
          <linearGradient id="wm-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F20C49" />
            <stop offset="1" stopColor="#8C2370" />
          </linearGradient>
        </defs>
        <path d="M3 2h18v5H9v4h9v5H9v6H3z" fill="url(#wm-grad)" />
      </svg>
      <span className="font-display text-[1.05rem] leading-none font-bold tracking-[0.02em] [font-stretch:122%]">
        FUTURA <span className="font-semibold text-fg-2">TEC</span>
      </span>
    </span>
  );
}
