import { rngFrom } from "@/lib/rng";
import { cn } from "@/lib/utils";

export type ArtVariant =
  | "circuit"
  | "grid"
  | "bars"
  | "mesh"
  | "matrix"
  | "lens"
  | "strata"
  | "topo"
  | "device"
  | "orbit";

const W = 1200;
const H = 800;
const r = (n: number) => Math.round(n * 100) / 100;

function Base({ id, tone }: { id: string; tone: string }) {
  return (
    <defs>
      <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#14150f" />
        <stop offset="1" stopColor="#0c0d09" />
      </linearGradient>
      <radialGradient id={`glow-${id}`} cx="0.72" cy="0.28" r="0.9">
        <stop offset="0" stopColor={tone} stopOpacity="0.32" />
        <stop offset="0.5" stopColor={tone} stopOpacity="0.06" />
        <stop offset="1" stopColor={tone} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function paint(variant: ArtVariant, seed: string, tone: string) {
  const rng = rngFrom(seed + variant);
  const line = "rgba(243,242,238,0.5)";
  const faint = "rgba(243,242,238,0.14)";
  const nodes: React.ReactNode[] = [];

  switch (variant) {
    case "circuit": {
      const pts = Array.from({ length: 14 }, () => ({
        x: r(rng.range(80, W - 80)),
        y: r(rng.range(80, H - 80)),
      }));
      pts.forEach((p, i) => {
        const q = pts[(i + rng.int(1, 4)) % pts.length];
        nodes.push(
          <path
            key={`e${i}`}
            d={`M${p.x} ${p.y} L${p.x} ${q.y} L${q.x} ${q.y}`}
            stroke={faint}
            fill="none"
            strokeWidth="1"
          />,
        );
      });
      pts.forEach((p, i) =>
        nodes.push(
          <circle key={`n${i}`} cx={p.x} cy={p.y} r={i % 3 === 0 ? 5 : 2.5} fill={i % 3 === 0 ? tone : line} />,
        ),
      );
      break;
    }
    case "grid": {
      const cols = 16;
      const rows = 11;
      for (let i = 0; i <= cols; i++) {
        const x = r((i / cols) * W);
        const off = r(Math.sin(i * 0.6) * 30);
        nodes.push(<line key={`v${i}`} x1={x} y1={off} x2={x} y2={H} stroke={faint} strokeWidth="1" />);
      }
      for (let j = 0; j <= rows; j++) {
        const y = r((j / rows) * H);
        nodes.push(<line key={`h${j}`} x1={0} y1={y} x2={W} y2={r(y - 20)} stroke={faint} strokeWidth="1" />);
      }
      nodes.push(<circle key="acc" cx={r(W * 0.7)} cy={r(H * 0.32)} r="6" fill={tone} />);
      break;
    }
    case "bars": {
      const n = 26;
      for (let i = 0; i < n; i++) {
        const bw = W / n;
        const h = r(rng.range(40, H * 0.8));
        nodes.push(
          <rect
            key={i}
            x={r(i * bw + bw * 0.2)}
            y={r(H - h)}
            width={r(bw * 0.6)}
            height={h}
            fill={i % 5 === 0 ? tone : faint}
            opacity={i % 5 === 0 ? 0.7 : 1}
          />,
        );
      }
      break;
    }
    case "mesh": {
      for (let i = 0; i < 5; i++) {
        nodes.push(
          <circle
            key={i}
            cx={r(rng.range(0, W))}
            cy={r(rng.range(0, H))}
            r={r(rng.range(120, 340))}
            fill={tone}
            opacity={r(rng.range(0.05, 0.16))}
          />,
        );
      }
      for (let i = 0; i < 40; i++) {
        nodes.push(
          <circle key={`d${i}`} cx={r(rng.range(0, W))} cy={r(rng.range(0, H))} r={r(rng.range(0.6, 2))} fill={line} />,
        );
      }
      break;
    }
    case "matrix": {
      const cols = 22;
      for (let c = 0; c < cols; c++) {
        const x = r((c / cols) * W + 12);
        const count = rng.int(6, 16);
        const start = rng.int(0, 8);
        for (let k = 0; k < count; k++) {
          const y = r((start + k) * 34);
          if (y > H) break;
          nodes.push(
            <rect key={`${c}-${k}`} x={x} y={y} width="8" height="18" fill={k === count - 1 ? tone : faint} opacity={r(0.25 + (k / count) * 0.6)} />,
          );
        }
      }
      break;
    }
    case "lens": {
      const cx = r(W * 0.66);
      const cy = r(H * 0.42);
      for (let i = 6; i > 0; i--) {
        nodes.push(<circle key={i} cx={cx} cy={cy} r={i * 46} fill="none" stroke={faint} strokeWidth="1" />);
      }
      for (let a = 0; a < 8; a++) {
        const ang = (a / 8) * Math.PI * 2;
        nodes.push(
          <line key={`b${a}`} x1={cx} y1={cy} x2={r(cx + Math.cos(ang) * 300)} y2={r(cy + Math.sin(ang) * 300)} stroke={faint} strokeWidth="1" />,
        );
      }
      nodes.push(<circle key="c" cx={cx} cy={cy} r="10" fill={tone} />);
      break;
    }
    case "strata": {
      let y = 40;
      let i = 0;
      while (y < H) {
        const band = r(rng.range(24, 90));
        nodes.push(<rect key={i} x="0" y={r(y)} width={W} height={r(band * 0.5)} fill={i % 4 === 0 ? tone : faint} opacity={i % 4 === 0 ? 0.5 : 1} />);
        y += band;
        i++;
      }
      break;
    }
    case "topo": {
      for (let i = 0; i < 9; i++) {
        const base = r(80 + i * 78);
        let d = `M0 ${base}`;
        for (let x = 0; x <= W; x += 60) {
          d += ` L${x} ${r(base + Math.sin((x + i * 90) * 0.008) * 34)}`;
        }
        nodes.push(<path key={i} d={d} fill="none" stroke={i === 4 ? tone : faint} strokeWidth="1" />);
      }
      break;
    }
    case "device": {
      const x = r(W * 0.5 - 150);
      nodes.push(<rect key="frame" x={x} y={r(H * 0.16)} width="300" height="520" rx="34" fill="none" stroke={line} strokeWidth="1.5" opacity="0.5" />);
      for (let i = 0; i < 6; i++) {
        nodes.push(<rect key={`r${i}`} x={r(x + 30)} y={r(H * 0.16 + 70 + i * 62)} width={r(rng.range(80, 240))} height="18" rx="9" fill={i === 1 ? tone : faint} />);
      }
      break;
    }
    case "orbit": {
      const cx = W / 2;
      const cy = H / 2;
      for (let i = 1; i <= 4; i++) {
        const rx = 120 * i;
        const ry = 60 * i;
        nodes.push(<ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={faint} strokeWidth="1" transform={`rotate(${r(i * 24)} ${cx} ${cy})`} />);
        const ang = rng.range(0, Math.PI * 2);
        nodes.push(<circle key={`p${i}`} cx={r(cx + Math.cos(ang) * rx)} cy={r(cy + Math.sin(ang) * ry)} r="6" fill={tone} />);
      }
      nodes.push(<circle key="core" cx={cx} cy={cy} r="14" fill={line} />);
      break;
    }
  }
  return nodes;
}

export function AbstractMedia({
  variant = "grid",
  seed = "khanstruct",
  tone = "#4f7d59",
  src,
  alt,
  className,
  rounded = false,
}: {
  variant?: ArtVariant;
  seed?: string;
  tone?: string;
  src?: string;
  alt?: string;
  className?: string;
  rounded?: boolean;
}) {
  // Real image path takes over when provided (drop in licensed photos later).
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className={cn("h-full w-full object-cover", rounded && "rounded-[inherit]", className)}
        loading="lazy"
      />
    );
  }

  const id = `${variant}-${Math.abs(
    seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0),
  )}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={alt ?? "Abstract system illustration"}
    >
      <Base id={id} tone={tone} />
      <rect width={W} height={H} fill={`url(#bg-${id})`} />
      <rect width={W} height={H} fill={`url(#glow-${id})`} />
      {paint(variant, seed, tone)}
    </svg>
  );
}
