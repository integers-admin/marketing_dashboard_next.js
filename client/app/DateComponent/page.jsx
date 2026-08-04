"use client";
import { useEffect, useState, useRef } from "react";
import { IntegersMark } from "../Logo";

const DateTime = () => {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const serverTimeRef = useRef(0);
  const clientStartRef = useRef(0);

  const formatDateIST = (timestamp) =>
    new Date(timestamp).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTimeIST = (timestamp) =>
    new Date(timestamp)
      .toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .toUpperCase();

  useEffect(() => {
    let tickInterval;
    let syncInterval;

    const fetchServerTime = async () => {
      try {
        const res = await fetch("/api/currentDate", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch server time");
        const data = await res.json();
        serverTimeRef.current = data.timestamp;
        clientStartRef.current = Date.now();
        setDate(formatDateIST(data.timestamp));
        setTime(formatTimeIST(data.timestamp));
        setLoading(false);
        setError("");
      } catch (err) {
        setError("Could not fetch server time");
        setLoading(false);
      }
    };

    fetchServerTime();

    tickInterval = setInterval(() => {
      if (!serverTimeRef.current) return;

      const now = Date.now();
      const elapsed = now - clientStartRef.current;
      const currentTime = serverTimeRef.current + elapsed;

      setDate(formatDateIST(currentTime));
      setTime(formatTimeIST(currentTime));
    }, 1000);
    syncInterval = setInterval(fetchServerTime, 300000);

    return () => {
      clearInterval(tickInterval);
      clearInterval(syncInterval);
    };
  }, []);

  return (
    <div className="dark rounded-2xl w-full h-full flex items-center justify-between px-[clamp(0.8rem,1.4vw,2.4rem)] py-[clamp(0.45rem,0.7vw,1.2rem)] gap-4 overflow-hidden relative">
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#00CEC9]/70 to-transparent" />
      <div className="flex items-center gap-[clamp(0.6rem,1vw,1.6rem)] min-w-0">
        <IntegersMark className="h-[clamp(2.2rem,3.4vw,6rem)] w-auto shrink-0 drop-shadow-[0_0_14px_rgba(0,206,201,0.35)]" />
        <div className="h-[clamp(1.6rem,2.4vw,4rem)] w-px bg-white/15 shrink-0" />
        <div className="leading-tight min-w-0">
          <div className="t-display font-black tracking-[0.18em] text-strong truncate">
            INTEGERS
          </div>
          <div className="t-small text-muted-2 truncate tracking-wide">Marketing Performance Dashboard</div>
        </div>
      </div>
      <div className="flex items-center gap-[clamp(0.8rem,1.6vw,3rem)] shrink-0">
        <div className="flex items-center gap-2 px-[clamp(0.5rem,0.7vw,1.1rem)] py-[clamp(0.2rem,0.3vw,0.5rem)] rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/25">
          <span className="live-dot" />
          <span className="t-small font-bold text-emerald-300 tracking-widest uppercase">
            {error ? "Offline" : "Live"}
          </span>
        </div>

        {loading ? (
          <span className="t-body text-muted-2">Syncing…</span>
        ) : (
          <div className="flex items-stretch gap-[clamp(0.5rem,0.9vw,1.4rem)]">
            <TimeBlock label="Date" value={date} />
            <div className="w-px bg-white/12" />
            <TimeBlock label="Time IST" value={time} mono />
          </div>
        )}
      </div>
    </div>
  );
};

const TimeBlock = ({ label, value, mono }) => (
  <div className="flex flex-col items-end justify-center leading-none">
    <span className="t-micro uppercase tracking-widest text-muted-2 mb-[0.35em]">{label}</span>
    <span className={`t-h2 font-bold text-strong tabular-nums ${mono ? "font-mono text-[#7fe7e4]" : ""}`}>
      {value}
    </span>
  </div>
);

export default DateTime;
