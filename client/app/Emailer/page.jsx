// "use client"
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const Emailer = () => {

//     const [emailerData, setEmailerData] = useState(null);

//     const getEmailerData = async () => {
//         try {
//             let result = await fetch(`${backend_url}/analyze/emailer/performance/current-month`);
//             let eData = await result.json();
//             // console.log("Emailer data: ",eData);
//             setEmailerData(eData ?? null);
//         }
//         catch (err) {
//             // console.log("something went wrong...");
//             toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//         }
//     }

//     useEffect(() => {
//         getEmailerData();
//     }, []);

//     // console.log("emailerData: ",emailerData);

//     const openRate = Number(emailerData?.avg_open_rate_pct);
//     const hasRate = Number.isFinite(openRate);

//     return (
//         <div className="flex flex-col h-full min-h-0">
//             <h1 className="t-h2 font-semibold mb-[clamp(0.3rem,0.5vw,0.8rem)] flex items-center gap-2 text-strong shrink-0">
//                 <span className="inline-block w-[clamp(0.1rem,0.5vw,0.9rem)] h-[clamp(0.9rem,1.2vw,2rem)] rounded-full bg-gradient-to-b from-amber-400 to-rose-400" />
//                 Emailer
//             </h1>

//             <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
//                 {/* Featured: open-rate gauge */}
//                 <div className="dark-card rounded-xl flex items-center gap-[clamp(0.6rem,1vw,1.6rem)] px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
//                     {/* <Gauge value={hasRate ? openRate : 0} display={hasRate ? `${openRate}%` : "--"} /> */}
//                     <div className="min-w-0">
//                         <p className="t-small text-muted-2 uppercase tracking-wide leading-tight flex gap-3 py-1"><span>Overall OpenRate</span><span className="text-[#38bdf8] font-bold">00</span></p>
//                         {/* <p className="t-small text-muted-2 uppercase tracking-wide leading-tight flex gap-4"><span>OpenRate Rate</span><span className="text-[#38bdf8]">00</span></p> */}
//                     </div>
//                 </div>

//                 {/* Supporting stats */}
//                 <div className="flex-1 grid grid-cols-3 gap-[clamp(0.3rem,0.5vw,0.8rem)] min-h-0">
//                     <StatTile label="Sends" value={emailerData?.total_sends ?? "00"} accent="#38bdf8" icon={ICON.send} />
//                     <StatTile label="Opens" value={emailerData?.total_unique_opens ?? "--"} accent="#fbbf24" icon={ICON.open} />
//                     <StatTile label="Clicks" value={emailerData?.total_unique_clicks ?? "--"} accent="#34d399" icon={ICON.click} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ICON = {
//     send: "M3 11l18-8-8 18-2.5-7.5L3 11z",
//     open: "M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9-5 9 5",
//     click: "M9 3v9l2.5-2 1.8 4 2-1-1.8-4H17L9 3z",
// };

// const StatTile = ({ label, value, accent = "#34d399", icon }) => (
//     <div className="flex flex-col justify-center items-center text-center gap-1.5 px-[clamp(0.2rem,0.4vw,0.7rem)] py-[clamp(0.3rem,0.5vw,0.9rem)] dark-card rounded-xl min-h-0 overflow-hidden"
//         style={{ boxShadow: `inset 0 -2px 0 ${accent}` }}>
//         <span
//             className="grid place-items-center rounded-lg h-[clamp(1.3rem,1.8vw,3.2rem)] w-[clamp(1.3rem,1.8vw,3.2rem)] shrink-0"
//             style={{ background: `${accent}22`, color: accent }}
//         >
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[58%] w-[58%]">
//                 <path d={icon} />
//             </svg>
//         </span>
//         <p className="text-xs font-extrabold leading-none text-strong">{value}</p>
//         <p className="text-muted-2 t-micro uppercase leading-tight truncate">{label}</p>
//     </div>
// );

// /* Radial open-rate gauge */
// const Gauge = ({ value, display }) => {
//     const pct = Math.max(0, Math.min(100, value));
//     const r = 42;
//     const c = 2 * Math.PI * r;
//     const dash = (pct / 100) * c;
//     return (
//         <div className="relative shrink-0 h-[clamp(3rem,4.2vw,7.5rem)] w-[clamp(3rem,4.2vw,7.5rem)]">
//             <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
//                 <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
//                 <circle
//                     cx="50" cy="50" r={r} fill="none"
//                     stroke="url(#emailerGauge)" strokeWidth="9" strokeLinecap="round"
//                     strokeDasharray={`${dash} ${c}`}
//                     style={{ transition: "stroke-dasharray 1s cubic-bezier(.22,1,.36,1)" }}
//                 />
//                 <defs>
//                     <linearGradient id="emailerGauge" x1="0" y1="0" x2="1" y2="1">
//                         <stop offset="0%" stopColor="#fbbf24" />
//                         <stop offset="100%" stopColor="#fb7185" />
//                     </linearGradient>
//                 </defs>
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="t-body font-extrabold text-strong">{display}</span>
//             </div>
//         </div>
//     );
// };

// export default Emailer;






const Emailer = ({ umang_emailerData }) => {

    return (
        <div className="flex flex-col h-full min-h-0">
            <h1 className="t-h2 font-semibold mb-[clamp(0.3rem,0.5vw,0.8rem)] flex items-center gap-2 text-strong shrink-0">
                <span className="inline-block w-[clamp(0.1rem,0.5vw,0.9rem)] h-[clamp(0.9rem,1.2vw,2rem)] rounded-full bg-gradient-to-b from-amber-400 to-rose-400" />
                Emailer
            </h1>
            <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
                {/* Featured: open-rate gauge */}
                <div className="dark-card rounded-xl flex items-center gap-[clamp(0.6rem,1vw,1.6rem)] px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.4rem,0.6vw,1rem)] min-h-0 border" style={{ borderLeftColor: "#38bdf8" }}>
                    {/* <Gauge value={hasRate ? openRate : 0} display={hasRate ? `${openRate}%` : "--"} /> */}
                    <div className="min-w-0 w-full rounded-lg">
                        <p className="t-small text-muted-2 uppercase tracking-wide leading-tight flex justify-between py-1 w-full">
                            <span>Overall OpenRate</span><span className="text-[#38bdf8] font-bold">{umang_emailerData?.overallOpenRate ?? "--"}</span></p>
                        {/* <p className="t-small text-muted-2 uppercase tracking-wide leading-tight flex gap-4"><span>OpenRate Rate</span><span className="text-[#38bdf8]">00</span></p> */}
                    </div>
                </div>

                {/* Supporting stats */}
                <div className="flex-1 grid grid-cols-3 gap-[clamp(0.3rem,0.5vw,0.8rem)] min-h-0">
                    {/* <StatTile label="Sends" value={umang_emailerData?.totalSends ?? "--"} accent="#38bdf8" icon={ICON.send} />
                    <StatTile label="Opens" value={umang_emailerData?.totalOpens ?? "--"} accent="#fbbf24" icon={ICON.open} />
                    <StatTile label="Clicks" value={umang_emailerData?.totalClicks ?? "--"} accent="#34d399" icon={ICON.click} /> */}

                    <StatTile
                        label="Sends"
                        value={
                            umang_emailerData?.totalSends != null
                                ? umang_emailerData.totalSends.toLocaleString("en-IN")
                                : "--"
                        }
                        accent="#38bdf8"
                        icon={ICON.send}
                    />

                    <StatTile
                        label="Opens"
                        value={
                            umang_emailerData?.totalOpens != null
                                ? umang_emailerData.totalOpens.toLocaleString("en-IN")
                                : "--"
                        }
                        accent="#fbbf24"
                        icon={ICON.open}
                    />

                    <StatTile
                        label="Clicks"
                        value={
                            umang_emailerData?.totalClicks != null
                                ? umang_emailerData.totalClicks.toLocaleString("en-IN")
                                : "--"
                        }
                        accent="#34d399"
                        icon={ICON.click}
                    />

                </div>
            </div>
        </div>
    );
};

const ICON = {
    send: "M3 11l18-8-8 18-2.5-7.5L3 11z",
    open: "M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9-5 9 5",
    click: "M9 3v9l2.5-2 1.8 4 2-1-1.8-4H17L9 3z",
};

const StatTile = ({ label, value, accent = "#34d399", icon }) => (
    <div className="flex flex-col justify-center items-center text-center gap-1.5 px-[clamp(0.2rem,0.4vw,0.7rem)] py-[clamp(0.3rem,0.5vw,0.9rem)] dark-card rounded-xl min-h-0 overflow-hidden"
        style={{ boxShadow: `inset 0 -2px 0 ${accent}` }}>
        <span
            className="grid place-items-center rounded-lg h-[clamp(1.3rem,1.8vw,3.2rem)] w-[clamp(1.3rem,1.8vw,3.2rem)] shrink-0"
            style={{ background: `${accent}22`, color: accent }}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[58%] w-[58%]">
                <path d={icon} />
            </svg>
        </span>
        <p className="text-xs font-extrabold leading-none text-strong">{value}</p>
        <p className="text-muted-2 t-micro uppercase leading-tight truncate">{label}</p>
    </div>
);

/* Radial open-rate gauge */
const Gauge = ({ value, display }) => {
    const pct = Math.max(0, Math.min(100, value));
    const r = 42;
    const c = 2 * Math.PI * r;
    const dash = (pct / 100) * c;
    return (
        <div className="relative shrink-0 h-[clamp(3rem,4.2vw,7.5rem)] w-[clamp(3rem,4.2vw,7.5rem)]">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                <circle
                    cx="50" cy="50" r={r} fill="none"
                    stroke="url(#emailerGauge)" strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={`${dash} ${c}`}
                    style={{ transition: "stroke-dasharray 1s cubic-bezier(.22,1,.36,1)" }}
                />
                <defs>
                    <linearGradient id="emailerGauge" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#fb7185" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="t-body font-extrabold text-strong">{display}</span>
            </div>
        </div>
    );
};

export default Emailer;

