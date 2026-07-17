/* Consistent line-style illustrations for the BuildLoop process steps. */

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StepIcon({ step, className }: { step: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true">
      {step === 0 && (
        <g {...common}>
          <circle cx="10" cy="10" r="6" />
          <line x1="14.5" y1="14.5" x2="20" y2="20" />
        </g>
      )}
      {step === 1 && (
        <g {...common}>
          <circle cx="5.5" cy="6.5" r="2" />
          <circle cx="18.5" cy="9" r="2" />
          <circle cx="11" cy="18" r="2" />
          <path d="M7.4 7.1 L16.6 8.4 M17.4 10.8 L12.4 16.2" />
        </g>
      )}
      {step === 2 && (
        <g {...common}>
          <path d="M4 20 L14.5 5.8 L18.2 9.5 L8 20 Z" />
          <path d="M14.5 5.8 L16.4 3.9 A1.6 1.6 0 0 1 20.1 7.6 L18.2 9.5" />
          <line x1="4" y1="20" x2="7" y2="19.2" />
        </g>
      )}
      {step === 3 && (
        <g {...common}>
          <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.2" />
          <rect x="13" y="13" width="7.5" height="7.5" rx="1.2" />
          <path d="M11 7.2 H14.5 A1.5 1.5 0 0 1 16 8.7 V13" />
        </g>
      )}
      {step === 4 && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 12.4 L10.6 15 L16 9.4" />
        </g>
      )}
      {step === 5 && (
        <g {...common}>
          <path d="M12 20.5 V5" />
          <path d="M6.5 10.5 L12 5 L17.5 10.5" />
          <path d="M9 17.5 L12 20.5 L15 17.5" />
        </g>
      )}
      {step === 6 && (
        <g {...common}>
          <path d="M19.5 9 A8 8 0 1 0 20.4 14.2" />
          <path d="M20 4.5 V9 H15.5" />
        </g>
      )}
    </svg>
  );
}
