const TodaysCreative = ({ instaPostData }) => {

  return (
    <div className="h-full flex flex-col overflow-hidden min-h-0">
      <h2 className="t-h2 font-semibold mb-[clamp(0.4rem,0.6vw,1rem)] flex items-center gap-2 text-strong shrink-0">
        <span className="inline-block w-[clamp(0.1rem,0.5vw,0.9rem)] h-[clamp(1rem,1.4vw,2.2rem)] rounded-full bg-gradient-to-b from-[#00CEC9] to-sky-400" />
        Today’s Creative
      </h2>
      <div className="flex-1 flex items-center justify-center gap-[clamp(0.5rem,0.7vw,1.2rem)] min-h-0">
        {instaPostData?.map((item, i) => (
          <div
            key={i}
            className="relative h-full max-h-full aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-white/10 bg-slate-900/40"
          >
            <img src={item?.media_url} alt={`creative ${i + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
      <div className="shrink-0 mt-[clamp(0.4rem,0.6vw,1rem)] flex items-center justify-between t-micro uppercase tracking-widest text-muted-2">
        <span>Daily Creatives</span>
        <span className="text-[#00CEC9]">Social</span>
      </div>
    </div>
  );
};

export default TodaysCreative;

