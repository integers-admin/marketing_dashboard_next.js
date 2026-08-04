// "use client"
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const BounceRate = () => {

//   const [bounceRate, setBounceRate] = useState(null);
//   const [lbounceRate, setLbounceRate] = useState(null);
//   const [engTime, setEngTime] = useState(null);
//   const [lengTime, setLengTime] = useState(null);
//   const [clicks, setClicks] = useState(null);
//   const [lclicks, setLclicks] = useState(null);

//   const getBECData = async () => {
//     try {
//       let [bounceRateRes, lbounceRateRes, engTimeRes, lengTimeRes, clicksRes, lclicksRes] = await Promise.allSettled([
//         fetch(`${backend_url}/analyze/bounce-rate/current-month`),
//         fetch(`${backend_url}/analyze/bounce-rate/previous-month`),
//         fetch(`${backend_url}/analyze/engagement-time/current-month`),
//         fetch(`${backend_url}/analyze/engagement-time/previous-month`),
//         fetch(`${backend_url}/analyze/clicks/current-month`),
//         fetch(`${backend_url}/analyze/clicks/previous-month`),
//       ]);

//       // 1
//       if (bounceRateRes.status === "fulfilled") {
//         const bounceRateData = await bounceRateRes.value.json();
//         // console.log("bounceRateData", bounceRateData);
//         setBounceRate(bounceRateData?.avg_bounce_rate_pct ?? null);
//       }
//       else {
//        // console.log("bounceRate api failed...");
//         toast.error('bounceRate api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 2
//       if (lbounceRateRes.status === "fulfilled") {
//         const lbounceRateData = await lbounceRateRes.value.json();
//         // console.log("lbounceRateData", lbounceRateData);
//         setLbounceRate(lbounceRateData?.avg_bounce_rate_pct ?? null);
//       }
//       else {
//         // console.log("lbounceRate api failed...");
//         toast.error('last bounceRate api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 3
//       if (engTimeRes.status === "fulfilled") {
//         const engTimeData = await engTimeRes.value.json();
//         // console.log("engTimeData", engTimeData);
//         setEngTime(engTimeData?.avg_engagement_time_formatted ?? null);
//       }
//       else {
//        // console.log("engTime api failed...");
//         toast.error('engTime api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 4
//       if (lengTimeRes.status === "fulfilled") {
//         const lengTimeData = await lengTimeRes.value.json();
//         // console.log("lengTimeData", lengTimeData);
//         setLengTime(lengTimeData?.avg_engagement_time_formatted ?? null);
//       }
//       else {
//        // console.log("lengTime api failed...");
//         toast.error('last engTime api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 5
//       if (clicksRes.status === "fulfilled") {
//         const clicksData = await clicksRes.value.json();
//         // console.log("clicksData", clicksData);
//         setClicks(clicksData?.total_clicks ?? null);
//       }
//       else {
//        // console.log("clicks api failed...");
//         toast.error('clicks api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 6
//       if (lclicksRes.status === "fulfilled") {
//         const lclicksData = await lclicksRes.value.json();
//         // console.log("lclicksData", lclicksData);
//         setLclicks(lclicksData?.total_clicks ?? null);
//       }
//       else {
//        // console.log("lclicks api failed...");
//         toast.error('last clicks api failed...',{duration:3000,position:"bottom-right"});
//       }
//     }
//     catch (err) {
//      // console.log("something went wrong...");
//       toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//     }
//   }

//   useEffect(() => {
//     getBECData();
//   }, []);

//   return (
//     <div className="dark rounded-2xl h-full min-h-0 flex flex-col p-[clamp(0.6rem,0.9vw,1.6rem)] overflow-hidden">
//       <h2 className="text-xs font-bold mb-[clamp(0.4rem,0.6vw,1rem)] flex items-center gap-2 text-strong shrink-0">
//         <span className="inline-block w-[clamp(0.1rem,0.5vw,0.9rem)] h-[clamp(1rem,1.4vw,2.2rem)] rounded-full bg-gradient-to-b from-rose-400 to-amber-400" />
//         Engagement
//       </h2>
//       <div className="grid grid-cols-3 gap-[clamp(0.4rem,0.6vw,1rem)] flex-1 min-h-0">
//         <CardData title1="Bounce Rate" title2="Last month" value1={bounceRate !== null ? `${bounceRate}%` : "--"} value2={lbounceRate !== null ? `${lbounceRate}%` : "--"} icon="/frame-1.svg" accent="#fb7185" />
//         <CardData title1="Avg. Eng. Time" title2="Last month" value1={engTime ?? "--"} value2={lengTime ?? "--"} icon="/frame-2.svg" accent="#38bdf8" />
//         <CardData title1="Clicks" title2="Last month" value1={clicks ?? "--"} value2={lclicks ?? "--"} icon="/frame-3.svg" accent="#34d399" />
//       </div>
//     </div>
//   );
// };

// export default BounceRate;


// const CardData = ({ title1, title2, value1, value2, icon, accent = "#34d399" }) => {

//   return (
//     <div className="dark-card rounded-xl p-[clamp(0.3rem,0.5vw,0.9rem)] flex flex-col justify-center items-center gap-[clamp(0.2rem,0.4vw,0.7rem)] min-h-0 overflow-hidden ">
//       {/* Icon */}
//       {/* <div
//         className="h-[clamp(1.6rem,2.1vw,3.8rem)] w-[clamp(1.6rem,2.1vw,3.8rem)] rounded-full flex items-center justify-center relative shrink-0 ring-1"
//         style={{ background: `${accent}22`, boxShadow: `0 0 18px ${accent}33`, borderColor: `${accent}55` }}
//       >
//         <Image
//           src={icon}
//           alt="icon"
//           fill
//           className="object-contain p-[18%] rounded-full"
//           sizes="80px"
//           priority
//         />
//       </div> */}

//       {/* First metric (current) */}
//       <div className="flex flex-col gap-2">
//         <p className="text-muted-2 font-medium t-micro uppercase tracking-wide">{title1}</p>
//         <p className="text-lg font-bold leading-none mt-[0.1em]" style={{ color: accent }}>{value1}</p>
//       </div>

//       {/* Second metric (last month) */}
//       {/* <p className="text-[8px] text-muted-2">
//         {title2} <span className="font-bold text-strong">{value2}</span>
//       </p> */}
//     </div>
//   );
// };







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
        {/* <CardData title1="Avg. Eng. Time" value1={umangEngineeringEngagementData?.averageEngagementTime ?? "--"} accent="#38bdf8" /> */}
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


const CardData = ({ title1, title2, value1, value2, icon, accent = "#34d399" }) => {

  return (
    <div className="dark-card rounded-xl p-[clamp(0.3rem,0.5vw,0.9rem)] flex flex-col justify-center items-center gap-[clamp(0.2rem,0.4vw,0.7rem)] min-h-0 overflow-hidden" style={{ borderLeftColor: accent }}>
      {/* Icon */}
      {/* <div
        className="h-[clamp(1.6rem,2.1vw,3.8rem)] w-[clamp(1.6rem,2.1vw,3.8rem)] rounded-full flex items-center justify-center relative shrink-0 ring-1"
        style={{ background: `${accent}22`, boxShadow: `0 0 18px ${accent}33`, borderColor: `${accent}55` }}
      >
        <Image
          src={icon}
          alt="icon"
          fill
          className="object-contain p-[18%] rounded-full"
          sizes="80px"
          priority
        />
      </div> */}

      {/* First metric (current) */}
      <div className="flex flex-col gap-2">
        <p className="text-muted-2 font-medium t-micro uppercase tracking-wide">{title1}</p>
        <p className="text-lg font-bold leading-none mt-[0.1em]" style={{ color: accent }}>{value1}</p>
      </div>

      {/* Second metric (last month) */}
      {/* <p className="text-[8px] text-muted-2">
        {title2} <span className="font-bold text-strong">{value2}</span>
      </p> */}
    </div>
  );
};
