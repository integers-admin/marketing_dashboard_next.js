// "use client"
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";
// const PaidAds = () => {

//     const [keyword, setKeyword] = useState(null);
//     const [campaign, setCampaign] = useState(null);
//     const [adSpent, setAdSpent] = useState(null);
//     const [competitor, setCompetitor] = useState(null);

//     const getKPIData = async () => {
//         try {
//             let [keywordRes, campaignRes, adSpentRes, competitorRes] = await Promise.allSettled([
//                 fetch(`${backend_url}/analyze/keyword/today`),
//                 fetch(`${backend_url}/analyze/campaign/today`),
//                 fetch(`${backend_url}/analyze/ad-spend/current-month`),
//                 fetch(`${backend_url}/analyze/competitor/today`)
//             ]);

//             // 1
//             if (keywordRes.status === "fulfilled") {
//                 const keywordData = await keywordRes.value.json();
//                // console.log("keywordData", keywordData);
//                 setKeyword(keywordData ?? null);
//             }
//             else {
//                 // console.log("keyword api failed...");
//                 toast.error('keyword api failed...',{duration:3000,position:"bottom-right"});
//             }

//             // 2
//             if (campaignRes.status === "fulfilled") {
//                 const campaignData = await campaignRes.value.json();
//                // console.log("campaignData", campaignData);
//                 setCampaign(campaignData ?? null);
//             }
//             else {
//                 // console.log("campaign api failed...");
//                 toast.error('campaign api failed...',{duration:3000,position:"bottom-right"});
//             }

//             // 3
//             if (adSpentRes.status === "fulfilled") {
//                 const adSpentData = await adSpentRes.value.json();
//                // console.log("adSpentData", adSpentData);
//                 setAdSpent(adSpentData?.total_ad_spend_rupees ?? null);
//             }
//             else {
//                 // console.log("adSpent api failed...");
//                 toast.error('adSpent api failed...',{duration:3000,position:"bottom-right"});
//             }

//             // 4
//             if (competitorRes.status === "fulfilled") {
//                 const competitorData = await competitorRes.value.json();
//                // console.log("competitorData", competitorData);
//                 setCompetitor(competitorData ?? null);
//             }
//             else {
//                 // console.log("competitor api failed...");
//                 toast.error('competitor api failed...',{duration:3000,position:"bottom-right"});
//             }
//         }
//         catch (err) {
//             // console.log("something went wrong...");
//             toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//         }
//     }

//     useEffect(() => {
//         getKPIData();
//     }, []);


//     return (
//         <div className="flex flex-col h-full min-h-0">
//             <h1 className="t-h2 font-semibold mb-[clamp(0.3rem,0.5vw,0.8rem)] flex items-center gap-2 text-strong shrink-0">
//                 <span className="inline-block w-[clamp(0.4rem,0.5vw,0.9rem)] h-[clamp(0.9rem,1.2vw,2rem)] rounded-full bg-gradient-to-b from-violet-400 to-sky-400" />
//                 Paid Ads
//             </h1>

//             <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
//                 {/* Featured: ad spend */}
//                 {/* <div className="dark-card rounded-xl px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.4rem,0.6vw,1rem)] flex items-center justify-between gap-2 overflow-hidden bg-gradient-to-r from-violet-500/10 to-transparent border-l-[3px] border-violet-400 min-h-0">
//                     <div className="min-w-0">
//                         <p className="t-small text-muted-2 uppercase tracking-wide leading-tight">Ad Spend · This Month</p>
//                         <p className="t-value-xl font-black leading-none mt-[0.1em] bg-gradient-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent">
//                             {adSpent != null ? `₹${adSpent}` : "--"}
//                         </p>
//                     </div>
//                     <span className="t-display text-violet-300/40 shrink-0">₹</span>
//                 </div> */}

//                 {/* Supporting rows */}
//                 <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
//                     <WinRow label="spend" val={ "--"} accent="#22d3ee" />
//         <WinRow label="impressions" val={ "--"} accent="#22d3ee" />
//         <WinRow label="engagements" val={ "--"} accent="#a78bfa" />
//         <WinRow label="ctr" val={ "--"} accent="#fbbf24" big />
//       </div>
//             </div>
//         </div>
//     );
// };
// export default PaidAds;


// const WinRow = ({ label, val, accent = "#34d399", big }) => {
//   return (
//     <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
//       style={{ borderLeftColor: accent }}>
//       <div className="flex items-center gap-4">
//         {/* <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
//           style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} /> */}
//         <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>

//         <span className={` font-bold count-pop break-words leading-tight mt-[0.15em]`}>
//         {/* {val} */}
//         00
//       </span>
//       </div>

//     </div>
//   );
// };





const PaidAds = ({ umangPaidAdsData }) => {

  return (
    <div className="flex flex-col h-full min-h-0">
      <h1 className="t-h2 font-semibold mb-[clamp(0.3rem,0.5vw,0.8rem)] flex items-center gap-2 text-strong shrink-0">
        <span className="inline-block w-[clamp(0.4rem,0.5vw,0.9rem)] h-[clamp(0.9rem,1.2vw,2rem)] rounded-full bg-gradient-to-b from-violet-400 to-sky-400" />
        Paid Ads
      </h1>

      <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
        {/* Featured: ad spend */}
        {/* <div className="dark-card rounded-xl px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.4rem,0.6vw,1rem)] flex items-center justify-between gap-2 overflow-hidden bg-gradient-to-r from-violet-500/10 to-transparent border-l-[3px] border-violet-400 min-h-0">
                    <div className="min-w-0">
                        <p className="t-small text-muted-2 uppercase tracking-wide leading-tight">Ad Spend · This Month</p>
                        <p className="t-value-xl font-black leading-none mt-[0.1em] bg-gradient-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent">
                            {adSpent != null ? `₹${adSpent}` : "--"}
                        </p>
                    </div>
                    <span className="t-display text-violet-300/40 shrink-0">₹</span>
                </div> */}

        {/* Supporting rows */}
        <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
          {/* <WinRow label="spend" val={umangPaidAdsData?.spend ?? "--"} accent="#22d3ee" />
        <WinRow label="impressions" val={umangPaidAdsData?.impressions ?? "--"} accent="#22d3ee" />
        <WinRow label="engagements" val={umangPaidAdsData?.engagements ?? "--"} accent="#a78bfa" />
        <WinRow label="ctr" val={umangPaidAdsData?.ctr ?? "--"} accent="#fbbf24" big /> */}

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
        {/* <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} /> */}
        <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>

        <span className={` font-bold count-pop break-words leading-tight mt-[0.15em]`}>
          {val}
        </span>
      </div>

    </div>
  );
};
