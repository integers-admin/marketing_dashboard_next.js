"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useApi } from "./api";
import { Card, SectionTitle, Gauge, IconChip, I } from "./ui";

/* ---------------- Today's Creative (4:5) ---------------- */
export const CreativesBlock = ({ apiBase = "", accent = "from-[#00CEC9] to-sky-400", footer = "4:5 · Social" }) => {
  const { data } = useApi(`${apiBase}/analyze/daily-creatives`);
  const images = data?.images ?? [];
  return (
    <Card title="Today’s Creative" accent={accent}>
      <div className="flex-1 flex items-center justify-center gap-[clamp(0.5rem,0.7vw,1.2rem)] min-h-0">
        {[0, 1].map((i) => (
          <div key={i} className="relative h-full max-h-full aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-white/10 bg-slate-900/40">
            {images[i]?.url ? (
              <img src={images[i].url} alt={`creative ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-center px-2">
                <div>
                  <div className="t-h2 font-bold text-slate-500 leading-none">4:5</div>
                  <div className="t-small text-muted-2 mt-1">Creative {i + 1}</div>
                </div>
              </div>
            )}
            <span className="absolute top-2 left-2 t-micro font-bold text-strong bg-black/50 backdrop-blur-sm rounded-md px-[0.5em] py-[0.15em] leading-none">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
      <div className="shrink-0 mt-[clamp(0.4rem,0.6vw,1rem)] flex items-center justify-between t-micro uppercase tracking-widest text-muted-2">
        <span>Daily Creatives</span>
        <span style={{ color: "var(--accent, #00CEC9)" }}>{footer}</span>
      </div>
    </Card>
  );
};

/* ---------------- Today's Trending (news + hashtags) ---------------- */
export const TrendingBlock = ({ apiBase = "", accent = "from-cyan-400 to-sky-500", hashtags = [] }) => {
  const { data } = useApi(`${apiBase}/analyze/trends/global-news/latest`, {
    transform: (d) => (typeof d === "string" ? d.split("\n").map((s) => s.trim()).filter(Boolean) : Array.isArray(d) ? d : []),
  });
  const news = data ?? [];
  const settings = { arrows: false, infinite: true, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 5000, pauseOnHover: false };
  return (
    <Card title="Today’s Trending" accent={accent}>
      <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
        <div className="flex-1 min-h-0 overflow-hidden rounded-xl dark-card">
          {news.length > 0 ? (
            <Slider {...settings} className="h-full">
              {news.map((txt, i) => (
                <div className="h-full" key={i}>
                  <div className="h-full flex flex-col p-[clamp(0.5rem,0.8vw,1.4rem)]">
                    <h3 className="t-small font-bold text-cyan-300 uppercase tracking-wide mb-1 shrink-0">News {i + 1}</h3>
                    <div className="flex-1 overflow-hidden t-body text-strong leading-snug">{txt}</div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="h-full grid place-items-center t-small text-muted-2">Awaiting trends…</div>
          )}
        </div>
        {hashtags.length > 0 && (
          <div className="shrink-0">
            <h3 className="t-micro font-bold text-muted-2 uppercase tracking-widest mb-[clamp(0.2rem,0.4vw,0.6rem)]">Trending Hashtags</h3>
            <div className="flex flex-wrap gap-[clamp(0.25rem,0.4vw,0.7rem)]">
              {hashtags.map((t) => (
                <span key={t} className="t-small font-semibold gradient-emerald px-[clamp(0.4rem,0.6vw,1rem)] py-[clamp(0.1rem,0.2vw,0.4rem)] rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/25 whitespace-nowrap">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

/* ---------------- Emailer (open-rate gauge + 3 stats) ---------------- */
export const EmailerBlock = ({ apiBase = "", accent = "from-amber-400 to-rose-400", from = "#fbbf24", to = "#fb7185" }) => {
  const { data } = useApi(`${apiBase}/analyze/emailer/performance/current-month`);
  const rate = Number(data?.avg_open_rate_pct);
  const hasRate = Number.isFinite(rate);
  return (
    <Card title="Emailer" accent={accent}>
      <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
        <div className="dark-card rounded-xl flex items-center gap-[clamp(0.6rem,1vw,1.6rem)] px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
          <Gauge value={hasRate ? rate : 0} display={hasRate ? `${rate}%` : "--"} from={from} to={to} id="emailerGauge" />
          <div className="min-w-0">
            <p className="t-small text-muted-2 uppercase tracking-wide leading-tight">Open Rate</p>
            <p className="t-small text-muted-2 mt-[0.3em] leading-snug">of <span className="font-bold text-strong">{data?.total_sends ?? "--"}</span> emails sent</p>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-[clamp(0.3rem,0.5vw,0.8rem)] min-h-0">
          <EStat label="Sends" value={data?.total_sends ?? "--"} accent="#38bdf8" icon={I.send} />
          <EStat label="Opens" value={data?.total_unique_opens ?? "--"} accent="#fbbf24" icon={I.open} />
          <EStat label="Clicks" value={data?.total_unique_clicks ?? "--"} accent="#34d399" icon={I.target} />
        </div>
      </div>
    </Card>
  );
};

const EStat = ({ label, value, accent, icon }) => (
  <div className="flex flex-col justify-center items-center text-center gap-[clamp(0.15rem,0.3vw,0.5rem)] px-[clamp(0.2rem,0.4vw,0.7rem)] py-[clamp(0.3rem,0.5vw,0.9rem)] dark-card rounded-xl min-h-0 overflow-hidden" style={{ boxShadow: `inset 0 -2px 0 ${accent}` }}>
    <IconChip d={icon} accent={accent} />
    <p className="t-value font-extrabold leading-none text-strong">{value}</p>
    <p className="text-muted-2 t-micro uppercase leading-tight truncate">{label}</p>
  </div>
);
