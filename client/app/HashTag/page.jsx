const HashTag = () => {
    const tags = [
        "#EncapsulatedActive",
        "#EntericCoated",
        "#SustainedRelease",
        "#DissolvingBeads",
        "#NaturalExfoliators",
    ];
    return (
        <div className="shrink-0">
            <h3 className="t-micro font-bold text-muted-2 uppercase tracking-widest mb-[clamp(0.2rem,0.4vw,0.6rem)] text-center">Hashtags</h3>
            <div className="flex flex-wrap gap-[clamp(0.25rem,0.4vw,0.7rem)]">
                {tags.map((t) => (
                    <span
                        key={t}
                        className="text-[2px] font-semibold gradient-emerald px-[clamp(0.4rem,0.6vw,1rem)] py-[clamp(0.1rem,0.2vw,0.4rem)] rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/25 whitespace-nowrap"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
};
export default HashTag;
