"use client";
import { useEffect, useRef, useState } from "react";

/* Server-synced IST clock (drift-corrected, re-syncs every 5 min). */
const Clock = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const serverTimeRef = useRef(0);
  const clientStartRef = useRef(0);

  const fmtDate = (t) =>
    new Date(t).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "2-digit", year: "numeric" });
  const fmtTime = (t) =>
    new Date(t).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).toUpperCase();

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch("/api/currentDate", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        serverTimeRef.current = data.timestamp;
        clientStartRef.current = Date.now();
        setDate(fmtDate(data.timestamp));
        setTime(fmtTime(data.timestamp));
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    sync();
    const tick = setInterval(() => {
      if (!serverTimeRef.current) return;
      const t = serverTimeRef.current + (Date.now() - clientStartRef.current);
      setDate(fmtDate(t));
      setTime(fmtTime(t));
    }, 1000);
    const resync = setInterval(sync, 300000);
    return () => {
      clearInterval(tick);
      clearInterval(resync);
    };
  }, []);

  if (loading) return <span className="t-body text-muted-2">Syncing…</span>;

  return (
    <div className="flex items-stretch gap-[clamp(0.5rem,0.9vw,1.4rem)]">
      <Block label="Date" value={date} />
      <div className="w-px bg-white/12" />
      <Block label="Time IST" value={time} mono />
    </div>
  );
};

const Block = ({ label, value, mono }) => (
  <div className="flex flex-col items-end justify-center leading-none">
    <span className="t-micro uppercase tracking-widest text-muted-2 mb-[0.35em]">{label}</span>
    <span className={`t-h2 font-bold text-strong tabular-nums ${mono ? "font-mono text-[#7fe7e4]" : ""}`}>{value}</span>
  </div>
);

export default Clock;
