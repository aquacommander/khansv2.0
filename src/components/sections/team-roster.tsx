import type { Member } from "@/content/team";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const VARIANTS = ["scale", "up", "blur"] as const;

export function TeamRoster({
  members,
  columns = 4,
}: {
  members: Member[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
        ? "grid-cols-2 lg:grid-cols-3"
        : "grid-cols-2 lg:grid-cols-4";
  return (
    <RevealGroup className={cn("grid gap-3 md:gap-4", cols)}>
      {members.map((m, i) => (
        <RevealItem key={m.name} variant={VARIANTS[i % VARIANTS.length]}>
          <div
            className="accent-bar card-lift group h-full bg-canvas border border-line rounded-xl overflow-hidden flex flex-col"
            style={{ ["--bar" as string]: m.tone }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.name}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-105"
                loading="lazy"
              />
              {m.founder && (
                <span
                  className="absolute top-3 left-3 label-system font-semibold rounded-full px-2.5 py-1 text-[0.6rem]"
                  style={{ color: "#fff", background: m.tone }}
                >
                  Founder
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[0.98rem] font-semibold tracking-[-0.02em] leading-tight">{m.name}</h3>
              <div className="label-system text-[0.6rem] mt-1 mb-2.5 leading-tight" style={{ color: m.tone }}>
                {m.role}
              </div>
              <p className="body-large text-[0.8rem] leading-snug">{m.bio}</p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
