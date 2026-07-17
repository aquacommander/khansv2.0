// Deterministic, seedable pseudo-randomness so generated art is stable
// between server and client renders (no hydration mismatch).

export function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^= h >>> 16) >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function rngFrom(seed: string) {
  const rand = mulberry32(hashSeed(seed));
  return {
    next: rand,
    range: (min: number, max: number) => min + rand() * (max - min),
    int: (min: number, max: number) => Math.floor(min + rand() * (max - min + 1)),
    pick: <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)],
  };
}
