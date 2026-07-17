import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("btn-arrow", className)}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 11L11 3M11 3H4M11 3V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Eyebrow({
  label,
  index,
  tone = "var(--accent)",
  dark = false,
  className,
}: {
  label: string;
  index?: string;
  tone?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 flex-wrap", className)}>
      {index && (
        <span
          className="font-mono text-[0.72rem] uppercase tracking-[0.1em] font-semibold rounded-full px-3 py-1.5 leading-none"
          style={{
            color: tone,
            background: `color-mix(in srgb, ${tone} 15%, transparent)`,
            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${tone} 30%, transparent)`,
          }}
        >
          {index}
        </span>
      )}
      <span className="h-[2px] w-7 rounded-full" style={{ background: tone }} aria-hidden />
      <span
        className="font-mono text-[0.8rem] md:text-[0.88rem] uppercase tracking-[0.1em] font-semibold"
        style={{ color: dark ? "var(--inverse-text)" : "var(--ink)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "outline",
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?:
    | "outline"
    | "solid"
    | "accent"
    | "accent-2"
    | "inverse"
    | "accent-inverse";
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "btn",
    variant === "solid" && "btn--solid",
    variant === "accent" && "btn--accent",
    variant === "accent-2" && "btn--accent-2",
    variant === "inverse" && "btn--inverse",
    variant === "accent-inverse" && "btn--accent-inverse",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
