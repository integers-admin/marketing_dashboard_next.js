const PaidAds = ({ umangPaidAdsData }) => {

  return (
    <div className="flex flex-col h-full min-h-0">
      <h1 className="t-h2 font-semibold mb-[clamp(0.3rem,0.5vw,0.8rem)] flex items-center gap-2 text-strong shrink-0">
        <span className="inline-block w-[clamp(0.4rem,0.5vw,0.9rem)] h-[clamp(0.9rem,1.2vw,2rem)] rounded-full bg-gradient-to-b from-violet-400 to-sky-400" />
        Paid Ads
      </h1>
      <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
        <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
          <WinRow
            label="Spend"
            val={
              umangPaidAdsData?.spend != null
                ? `₹ ${umangPaidAdsData.spend.toLocaleString("en-IN", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}`
                : "--"
            }
            accent="#22d3ee"
          />
          <WinRow
            label="Impressions"
            val={
              umangPaidAdsData?.impressions != null
                ? umangPaidAdsData.impressions.toLocaleString("en-IN")
                : "--"
            }
            accent="#22d3ee"
          />
          <WinRow
            label="Engagements"
            val={
              umangPaidAdsData?.engagements != null
                ? umangPaidAdsData.engagements.toLocaleString("en-IN")
                : "--"
            }
            accent="#a78bfa"
          />
          <WinRow
            label="CTR"
            val={
              umangPaidAdsData?.ctr != null
                ? `${umangPaidAdsData.ctr.toFixed(1)}%`
                : "--"
            }
            accent="#fbbf24"
            big
          />
        </div>
      </div>
    </div>
  );
};
export default PaidAds;

const WinRow = ({ label, val, accent = "#34d399", big }) => {
  return (
    <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
      style={{ borderLeftColor: accent }}>
      <div className="flex justify-between items-center">
        <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
        <span className={` font-bold count-pop break-words leading-tight mt-[0.15em]`}>
          {val}
        </span>
      </div>
    </div>
  );
};
