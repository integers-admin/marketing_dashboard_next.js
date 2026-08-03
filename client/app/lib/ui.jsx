"use client";
import { pct } from "./api";

/* ---------------- Card + section title ---------------- */
export const Card = ({ title, accent = "from-[#00CEC9] to-sky-400", right, children, className = "", style }) => (
  <div className={`dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col h-full min-h-0 overflow-hidden ${className}`} style={style}>
    {title && (
      <div className="flex items-center justify-between gap-2 mb-[clamp(0.4rem,0.6vw,1rem)] shrink-0">
        <SectionTitle accent={accent}>{title}</SectionTitle>
        {right}
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col">{children}</div>
  </div>
);

export const SectionTitle = ({ children, accent = "from-[#00CEC9] to-sky-400" }) => (
  <h2 className="t-h2 font-semibold flex items-center gap-2 text-strong">
    <span className={`inline-block w-[clamp(0.4rem,0.5vw,0.9rem)] h-[clamp(1rem,1.4vw,2.2rem)] rounded-full bg-gradient-to-b ${accent}`} />
    {children}
  </h2>
);

/* ---------------- Trend badge (current vs last) ---------------- */
// export const TrendBadge = ({ cur, prev }) => {
//   const d = pct(cur, prev);
//   if (d == null) return null;
//   const up = d >= 0;
//   return (
//     <span className={`t-small font-bold px-[0.55em] py-[0.12em] rounded-full whitespace-nowrap ${up ? "text-emerald-300 bg-emerald-400/15" : "text-rose-300 bg-rose-400/15"}`}>
//       {up ? "▲" : "▼"} {Math.abs(d).toFixed(1)}%
//     </span>
//   );
// };

/* ---------------- Single metric tile ---------------- */
export const Metric = ({ label, value, sub, accent = "#00CEC9", icon, big, brandValue }) => (
  <div className="dark-card rounded-xl flex flex-col justify-center px-[clamp(0.5rem,0.8vw,1.4rem)] py-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0 overflow-hidden" style={{ boxShadow: `inset 3px 0 0 ${accent}` }}>
    <div className="flex items-center gap-[clamp(0.3rem,0.5vw,0.8rem)] mb-[0.15em]">
      {icon && <IconChip d={icon} accent={accent} />}
      <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
    </div>
    <span className={`text-lg font-extrabold leading-none break-words count-pop ml-6`} style={brandValue ? { color: accent } : { color: "var(--text-strong)" }}>
      {/* {value} */}

      {String(value).length > 14
        ? String(value).slice(0, 11) + "..."
        : String(value)}

    </span>
    {sub && <span className="t-small text-muted-2 mt-[0.25em] truncate">{sub}</span>}
  </div>
);

/* metric with month-over-month comparison */
export const TrendMetric = ({ label, value, prev, accent = "#00CEC9", icon, prefix = "", suffix = "" }) => (
  <div className="dark-card rounded-xl flex flex-col justify-center px-[clamp(0.5rem,0.8vw,1.4rem)] py-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0 overflow-hidden" style={{ boxShadow: `inset 3px 0 0 ${accent}` }}>
    <div className="flex items-center gap-[clamp(0.3rem,0.5vw,0.8rem)] mb-[0.15em]">
      {icon && <IconChip d={icon} accent={accent} />}
      <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
    </div>
    <div className="flex items-end gap-[clamp(0.35rem,0.6vw,1rem)] flex-wrap">
      <span className="t-value font-extrabold leading-none text-strong ml-5.5">{value}</span>
      {/* <TrendBadge cur={value} prev={prev} /> */}
    </div>
    {/* <span className="t-small text-muted-2 mt-[0.25em] truncate">
      last month <span className="font-bold text-strong">{prev == null ? "--" : `${prefix}${prev}${suffix}`}</span>
    </span> */}
  </div>
);

/* ---------------- Icon chip (inline svg path) ---------------- */
export const IconChip = ({ d, accent = "#00CEC9", size = "1.6rem" }) => (
  <span className="grid place-items-center rounded-lg shrink-0" style={{ background: `${accent}22`, color: accent, height: `clamp(1.1rem,1.5vw,${size})`, width: `clamp(1.1rem,1.5vw,${size})` }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[58%] w-[58%]">
      <path d={d} />
    </svg>
  </span>
);

/* ---------------- Horizontal comparison bar ---------------- */
export const BarStat = ({ label, cur, prev, max, accent = "#00CEC9", format = (v) => v }) => {
  const c = Number(cur) || 0;
  const p = Number(prev) || 0;
  const m = max || Math.max(c, p, 1);
  return (
    <div className="flex flex-col gap-[0.25em] min-h-0 justify-center">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-2 font-medium truncate">{label}</span>
        <span className="t-small font-bold text-strong tabular-nums">
          {cur == null ? "--" : format(cur)}
        </span>
      </div>
      {/* <div className="relative h-[clamp(0.45rem,0.7vw,1.1rem)] rounded-full bg-white/8 overflow-hidden">
        <div className="absolute inset-y-0 left-0 rounded-full opacity-30" style={{ width: `${(p / m) * 100}%`, background: accent }} />
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(c / m) * 100}%`, background: `linear-gradient(90deg, ${accent}, ${accent}cc)`, boxShadow: `0 0 12px ${accent}66` }} />
      </div> */}
    </div>
  );
};

/* ---------------- Named list (expiry / re-order / fast movers) ---------------- */
export const NamedList = ({ items, accent = "#00CEC9", valueKey = "qty", emptyHint = "--" }) => (
  <div className="flex-1 flex flex-col gap-[clamp(0.2rem,0.4vw,0.6rem)] min-h-0 overflow-hidden">
    {(items && items.length ? items : [null, null, null]).slice(0, 4).map((it, i) => (
      <div key={i} className="dark-card rounded-lg flex items-center justify-between gap-2 px-[clamp(0.45rem,0.7vw,1.2rem)] py-[clamp(0.2rem,0.35vw,0.6rem)] flex-1 min-h-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="rounded-full shrink-0 h-[0.5em] w-[0.5em]" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span className="t-small text-strong font-medium truncate">{it?.name ?? emptyHint}</span>
        </div>
        {it && it[valueKey] != null && (
          <span className="t-small font-bold tabular-nums shrink-0" style={{ color: accent }}>{it[valueKey]}</span>
        )}
      </div>
    ))}
  </div>
);

/* ---------------- Radial gauge ---------------- */
export const Gauge = ({ value, display, from = "#00CEC9", to = "#38bdf8", id = "g" }) => {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0 h-[clamp(3rem,4vw,7rem)] w-[clamp(3rem,4vw,7rem)]">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={`url(#${id})`} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${(v / 100) * c} ${c}`} style={{ transition: "stroke-dasharray 1s cubic-bezier(.22,1,.36,1)" }} />
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="t-body font-extrabold text-strong">{display}</span>
      </div>
    </div>
  );
};

/* ---------------- Shared icon paths ---------------- */
export const I = {
  rupee: "M6 3h12M6 8h12M6 13h6a4 4 0 000-8M6 13l7 8",
  dollar: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  box: "M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8",
  cart: "M3 3h2l2.4 12.4a1 1 0 001 .6h9.7a1 1 0 001-.8L21 7H6M9 21a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z",
  star: "M12 2l2.9 6.3L22 9.3l-5 4.6 1.3 6.8L12 17.5 5.7 20.7 7 13.9 2 9.3l7.1-1z",
  clock: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  alert: "M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z",
  trendUp: "M3 17l6-6 4 4 8-8M21 7v6M21 7h-6",
  flame: "M12 2s5 4 5 9a5 5 0 01-10 0c0-2 1-3 1-3s-1 4 2 4 1-6-0-10z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z",
  doc: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M8 13h8M8 17h8",
  eye: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7zM12 15a3 3 0 100-6 3 3 0 000 6z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  send: "M3 11l18-8-8 18-2.5-7.5L3 11z",
  open: "M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9-5 9 5",
  play: "M5 3l14 9-14 9V3z",
  insta: "M12 8a4 4 0 100 8 4 4 0 000-8zM3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7zm14-1h.01",
  truck: "M1 3h13v10H1zM14 8h4l3 3v2h-7zM5.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm12 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-5a4 4 0 100-8 4 4 0 000 8zm0-3.5a.5.5 0 100-1 .5.5 0 000 1z",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z",
};
