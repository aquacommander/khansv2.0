"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function LocationClock() {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: site.location.timezone,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular">
      {site.location.city} · {time}
    </span>
  );
}
