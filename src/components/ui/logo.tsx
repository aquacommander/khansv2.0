import { cn } from "@/lib/utils";

/**
 * Khanstruct logo. The source art is light (for dark surfaces); on light
 * surfaces we darken it with a filter so it stays legible.
 */
export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/logo.png"
      alt="Khanstruct"
      className={cn("w-auto select-none", className)}
      style={onDark ? undefined : { filter: "brightness(0)" }}
      draggable={false}
    />
  );
}
