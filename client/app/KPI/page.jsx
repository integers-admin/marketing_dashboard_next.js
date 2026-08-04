const KPI = ({ umangLeadsData, revenueGenerated }) => {

  const industries = [
    { color: "#4b7bf5", label: "P. Care", val: umangLeadsData?.leads_by_industry[1]?.count },
    { color: "#ff6caf", label: "Nutra", val: umangLeadsData?.leads_by_industry[2]?.count },
    { color: "#04c56b", label: "Pharma", val: umangLeadsData?.leads_by_industry[0]?.count },
    { color: "#ffcc00", label: "Engineering", val: umangLeadsData?.leads_by_industry[3]?.count },
    { color: "#00b6cc", label: "Other", val: umangLeadsData?.leads_by_industry[4]?.count }
  ];

  return (
    <div className="dark h-full rounded-2xl flex flex-col min-h-0 overflow-hidden p-[clamp(0.6rem,0.9vw,1.6rem)] gap-[clamp(0.5rem,0.8vw,1.4rem)]">
      <div className="shrink-0">
        <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Leads</span>
        <p className="t-value-xl font-black gradient-emerald count-pop leading-none">{umangLeadsData?.total_leads ?? "--"}</p>
        <span className="t-small text-muted-2">
          vs last month <span className="font-bold text-strong">&nbsp;&nbsp;{umangLeadsData?.vs_last_month ?? "--"}</span>
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
        <WinRow label="Best Product" val={umangLeadsData?.best_product ?? "--"} accent="#a78bfa" />
        <WinRow label="Revenue Generated" val={`₹ ${revenueGenerated ?? "--"}`} accent="#fbbf24" big />
      </div>
      <div className="shrink-0">
        <span className="t-small text-muted-2 font-semibold uppercase tracking-widest">Leads by Industry</span>
        <div className="grid grid-cols-5 gap-[clamp(0.2rem,0.4vw,0.6rem)] mt-[clamp(0.3rem,0.5vw,0.8rem)]">
          {industries.map((it, i) => (
            <div
              key={i}
              className="stat-chip dark-card rounded-xl flex flex-col items-center justify-center gap-3 py-[clamp(0.3rem,0.5vw,0.9rem)] px-0.5"
              style={{ color: it.color }}
            >
              <span
                className="rounded-full h-[clamp(0.7rem,0.9vw,1.5rem)] w-[clamp(0.7rem,0.9vw,1.5rem)]"
                style={{ background: it.color, boxShadow: `0 0 8px ${it.color}cc` }}
              />
              <span className="t-body font-extrabold text-strong text-center leading-none">{it?.val ?? "--"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPI;

const WinRow = ({ label, val, accent = "#34d399", big }) => {
  return (
    <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
      style={{ borderLeftColor: accent }}>
      <div className="flex flex-col items-center gap-1">
        <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate mt-2">{label}</span>

        <span className={` font-bold count-pop break-words leading-tight mt-[0.15em] mb-2`}>
          {String(val).length > 15
            ? String(val).slice(0, 15) + "..."
            : String(val)}
        </span>
      </div>

    </div>
  );
};
