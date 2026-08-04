const BounceRate = ({ umangEngineeringEngagementData }) => {

  const formatEngagementTime = (seconds) => {
    if (!seconds) return "--";
    const sec = Math.floor(Number(seconds));
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="dark rounded-2xl h-full min-h-0 flex flex-col p-[clamp(0.6rem,0.9vw,1.6rem)] overflow-hidden">
      <h2 className="text-xs font-bold mb-[clamp(0.4rem,0.6vw,1rem)] flex items-center gap-2 text-strong shrink-0">
        <span className="inline-block w-[clamp(0.1rem,0.5vw,0.9rem)] h-[clamp(1rem,1.4vw,2.2rem)] rounded-full bg-gradient-to-b from-rose-400 to-amber-400" />
        <p className="flex justify-between w-full"><span>Engagement</span><span>Umang Engineering</span></p>
      </h2>
      <div className="grid grid-cols-3 gap-[clamp(0.4rem,0.6vw,1rem)] flex-1 min-h-0">

        <CardData
          title1="Bounce Rate"
          value1={`${umangEngineeringEngagementData?.bounceRate ?? "--"} %`}
          accent="#fb7185"
        />
        <CardData
          title1="Avg. Eng. Time"
          value1={formatEngagementTime(
            umangEngineeringEngagementData?.averageEngagementTime
          )}
          accent="#38bdf8"
        />
        <CardData title1="Clicks" value1={umangEngineeringEngagementData?.clicks ?? "--"} accent="#34d399" />
      </div>
    </div>
  );
};

export default BounceRate;

const CardData = ({ title1, value1, accent = "#34d399" }) => {
  return (
    <div className="dark-card rounded-xl p-[clamp(0.3rem,0.5vw,0.9rem)] flex flex-col justify-center items-center gap-[clamp(0.2rem,0.4vw,0.7rem)] min-h-0 overflow-hidden" style={{ borderLeftColor: accent }}>
      <div className="flex flex-col gap-2">
        <p className="text-muted-2 font-medium t-micro uppercase tracking-wide">{title1}</p>
        <p className="text-lg font-bold leading-none mt-[0.1em]" style={{ color: accent }}>{value1}</p>
      </div>
    </div>
  );
};
