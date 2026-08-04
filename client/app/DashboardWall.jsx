"use client";
import { useEffect, useState } from "react";
import UmangDashboard from "./dashboards/UmangDashboard";
import AadarDashboard from "./dashboards/AadarDashboard";
import IntegersDashboard from "./dashboards/IntegersDashboard";
import { BRANDS, ROTATE_MS, TRANSITION_MS } from "./lib/theme";
import { IntegersMark } from "./Logo";
import Clock from "./Clock";

const DASHBOARDS = [UmangDashboard, AadarDashboard, IntegersDashboard];

const DashboardWall = () => {
  const [active, setActive] = useState(0);
  // const [active, setActive] = useState(2);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % DASHBOARDS.length;
      });
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);


  // test
//   useEffect(() => {
//   const id = setInterval(() => {
//     setActive((cur) => {
//       if (cur === 2) {
//         return 2;
//       }

//       setPrev(cur);
//       return (cur + 1) % DASHBOARDS.length;
//     });
//   }, ROTATE_MS);

//   return () => clearInterval(id);
// }, []);

  useEffect(() => {
    if (prev == null) return;
    const t = setTimeout(() => setPrev(null), TRANSITION_MS);
    return () => clearTimeout(t);
  }, [prev, active]);

  const brand = BRANDS[active];

  return (
    <div
      className="app-bg h-screen w-screen p-[clamp(0.5rem,0.9vw,1.8rem)] flex flex-col gap-[clamp(0.4rem,0.7vw,1.3rem)] overflow-hidden"
      style={{ "--accent": brand.accent, "--accent2": brand.accent2 }}
    >
      <header className="dark rounded-2xl shrink-0 flex items-center justify-between gap-4 px-[clamp(0.8rem,1.4vw,2.4rem)] py-[clamp(0.45rem,0.7vw,1.2rem)] relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${brand.accent}b0, transparent)` }} />
        <div className="flex-1 min-w-0">
          <div key={brand.id} className="brand-swap flex items-center gap-[clamp(0.55rem,1vw,1.6rem)] min-w-0">
            <BrandLogo brand={brand} />
            <div className="h-[clamp(1.6rem,2.4vw,4rem)] w-px bg-white/15 shrink-0" />
            <div className="leading-tight min-w-0">
              <div className="t-display font-black tracking-[0.03em] text-strong truncate">{brand.name}</div>
              <div className="t-small text-muted-2 truncate tracking-wide">{brand.tagline}</div>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-center gap-[clamp(0.25rem,0.4vw,0.6rem)]">
          <div className="flex items-center gap-[clamp(0.3rem,0.5vw,0.8rem)]">
            {BRANDS.map((b, i) => (
              <span key={b.id} className="relative h-[clamp(0.35rem,0.45vw,0.7rem)] rounded-full overflow-hidden transition-all duration-500"
                style={{ width: i === active ? "clamp(2.2rem,3vw,5rem)" : "clamp(0.35rem,0.45vw,0.7rem)", background: i === active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.25)" }}>
                {i === active && (
                  <span key={active} className="absolute inset-y-0 left-0 rounded-full" style={{ background: brand.accent, animation: `progressFill ${ROTATE_MS}ms linear forwards` }} />
                )}
              </span>
            ))}
          </div>
          <span className="t-micro text-muted-2/80 tracking-widest uppercase whitespace-nowrap">
            Developed by <span className="font-semibold text-slate-300">Integers Insights Pvt Ltd</span>
          </span>
        </div>
        <div className="flex-1 flex items-center justify-end gap-[clamp(0.8rem,1.4vw,2.6rem)]">
          <div className="flex items-center gap-2 px-[clamp(0.5rem,0.7vw,1.1rem)] py-[clamp(0.2rem,0.3vw,0.5rem)] rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/25">
            <span className="live-dot" />
            <span className="t-small font-bold text-emerald-300 tracking-widest uppercase">Live</span>
          </div>
          <Clock />
        </div>
      </header>
      <div className="relative flex-1 min-h-0">
        {(prev != null ? [{ i: prev, cls: "wall-out" }, { i: active, cls: "wall-in" }] : [{ i: active, cls: "wall-in" }]).map(({ i, cls }) => {
          const Dash = DASHBOARDS[i];
          return (
            <div key={i} className={`wall-layer ${cls}`} aria-hidden={cls === "wall-out"}>
              <Dash />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BrandLogo = ({ brand }) => {
  if (brand.isIntegers)
    return <IntegersMark className="h-[clamp(2.2rem,3.4vw,6rem)] w-auto shrink-0 drop-shadow-[0_0_14px_rgba(0,206,201,0.35)]" />;
  return (
    <div className="bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/30 ring-1 ring-white/40 px-[clamp(0.45rem,0.7vw,1.2rem)] py-[clamp(0.3rem,0.5vw,0.85rem)]">
      <img src={`/logos/${brand.id}.svg`} alt={brand.name} className="h-[clamp(1.7rem,2.7vw,4.8rem)] w-auto block" />
    </div>
  );
};

export default DashboardWall;
