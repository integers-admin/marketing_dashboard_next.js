// "use client";
// import { useApi, fmt } from "../lib/api";
// import { Card, Metric, TrendMetric, I, SectionTitle, IconChip } from "../lib/ui";
// import { CreativesBlock, TrendingBlock, EmailerBlock } from "../lib/blocks";
// import TodaysCreative from "../TodaysCreative/page";
// import CarouselComponent from "../Crousel/page";

// const ACCENT = "#00cec9";
// const VIOLET = "#0984e3";   // Integers blue
// const TITLE = "from-[#00cec9] to-[#0984e3]";
// const B = "/integers";

// const IntegersDashboard = () => {
//   // Overview
//   const sell = useApi(`${B}/analyze/sales/current-month`);
//   const lsell = useApi(`${B}/analyze/sales/previous-month`);
//   const live = useApi(`${B}/analyze/products/live`);
//   const top = useApi(`${B}/analyze/products/top`);
//   const reports = useApi(`${B}/analyze/reports/current-month`);
//   // Website performance (4 properties)
//   const web = useApi(`${B}/analyze/web/properties/current-month`);
//   const lweb = useApi(`${B}/analyze/web/properties/previous-month`);
//   // Social
//   const social = useApi(`${B}/analyze/social/followers`);
//   // Paid ads
//   const ads = useApi(`${B}/analyze/ads/current-month`);
//   const lads = useApi(`${B}/analyze/ads/previous-month`);

//   const wmap = (d) => Object.fromEntries((d?.properties ?? []).map((p) => [p.name, p.visits]));
//   const wc = wmap(web.data);
//   const wp = wmap(lweb.data);
//   const smap = (d) => Object.fromEntries((d?.platforms ?? []).map((p) => [p.name, p.followers]));
//   const sc = smap(social.data);

//   const gap = "gap-[clamp(0.4rem,0.7vw,1.3rem)]";
//   return (
//     <div className={`h-full w-full grid grid-cols-12 grid-rows-[1fr_0.72fr_1.1fr] ${gap}`} style={{ "--accent": ACCENT }}>

//       {/* ===== Overview rail ===== */}
//       <div className="col-span-3 row-start-1 row-span-2 min-h-0 enter d1">
//         <Card title="Overview" accent={TITLE} className="h-full">
//           <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
//             <div className="shrink-0">
//               <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Sell · USD</span>
//               <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
//                 <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{sell.data?.total_sales_usd != null ? `$${fmt(sell.data.total_sales_usd)}` : "00"}</span>
//                 <TrendBadge cur={sell.data?.total_sales_usd} prev={lsell.data?.total_sales_usd} />
//               </div>
//               <span className="t-small text-muted-2">vs last month <span className="font-bold text-strong">{lsell.data?.total_sales_usd != null ? `$${fmt(lsell.data.total_sales_usd)}` : "00"}</span></span>
//             </div>
//             <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
//               <Metric label="Live Products" value={live.data?.live_products != null ? fmt(live.data.live_products) : "00"} accent="#22d3ee" icon={I.box} brandValue />
//               <Metric label="Top Product" value={top.data?.product ?? "00"} accent={VIOLET} icon={I.star} />
//               <Metric label="Reports Generated" value={reports.data?.total_reports != null ? fmt(reports.data.total_reports) : "00"} accent={ACCENT} icon={I.doc} brandValue big />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* ===== Website performance ===== */}
//       <div className="col-start-4 col-span-5 row-start-1 min-h-0 enter d2">
//         <Card title="Website Performance" accent={TITLE} right={<span className="t-small text-muted-2">visits · vs last month</span>}>
//           <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             <TrendMetric label="Integers Insights" value={"00"} accent="#00CEC9" icon={I.globe} />
//             <TrendMetric label="Report InShort" value={"00"} accent="#a78bfa" icon={I.doc} />
//             <TrendMetric label="Integer Market" value={"00"} accent="#38bdf8" icon={I.cart} />
//             <TrendMetric label="Integer Tech" value={"00"} accent="#34d399" icon={I.trendUp} />
//           </div>
//         </Card>
//       </div>

//       {/* ===== Social performance ===== */}
//       <div className="col-start-9 col-span-4 row-start-1 min-h-0 enter d3">
//         <Card title="Social Performance" accent={TITLE} right={<span className="t-small text-muted-2">followers</span>}>
//           <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             <Metric label="Instagram" value={sc.Instagram != null ? fmt(sc.Instagram) : "00"} accent="#fb7185" icon={I.insta} brandValue />
//             <Metric label="YouTube" value={sc.YouTube != null ? fmt(sc.YouTube) : "00"} accent="#ff5c5c" icon={I.play} brandValue />
//             <Metric label="Twitter" value={sc.Twitter != null ? fmt(sc.Twitter) : "00"} accent="#38bdf8" icon={I.send} brandValue />
//             <Metric label="LinkedIn" value={sc.LinkedIn != null ? fmt(sc.LinkedIn) : "00"} accent="#4b7bf5" icon={I.users} brandValue />
//           </div>
//         </Card>
//       </div>

//       {/* ===== Paid ads ===== */}
//       <div className="col-start-4 col-span-5 row-start-2 min-h-0 enter d4">
//         <Card title="Paid Ads" accent={TITLE} right={<span className="t-small text-muted-2">vs last month</span>}>
//                   <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//                     <WinRow label="spend" val={ "--"} accent="#22d3ee" />
//                 <WinRow label="impressions" val={ "--"} accent="#22d3ee" />
//                 <WinRow label="engagements" val={ "--"} accent="#a78bfa" />
//                 <WinRow label="ctr" val={ "--"} accent="#fbbf24" big />
//                   </div>
//                 </Card>
//       </div>

//       {/* ===== Highlights (compact metrics — fits the shorter middle band) ===== */}
//       <div className="col-start-9 col-span-4 row-start-2 min-h-0 enter d5">
//         <Card title="Highlights" accent={TITLE}>
//           <div className="flex-1 flex flex-col auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             <HighLightsMetric label="Avg. Report Turnaround" value={reports.data?.avg_turnaround ?? "Lorem ipsum dolor sit amet."} accent="#22d3ee" icon={I.clock} />
//             <HighLightsMetric label="Active Subscriptions" value={reports.data?.active_subscriptions != null ? fmt(reports.data.active_subscriptions) : "--"} accent="#34d399" icon={I.users} brandValue />
//             {/* <Metric label="Conversion Rate" value={ads.data?.conversion_pct != null ? `${ads.data.conversion_pct}%` : "--"} accent={VIOLET} icon={I.target} brandValue /> */}
//           </div>
//         </Card>
//       </div>


//       {/* ===== Bottom row (Emailer gets the tall band so the gauge + stats fit) ===== */}
//       <div className="col-start-1 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d4">
//         <TodaysCreative />
//       </div>
//       <div className="col-start-4 col-span-4 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d5">
//         <SectionTitle accent="from-cyan-400 to-sky-500">Today’s Trending</SectionTitle>
//         <div className="flex-1 flex gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0 mt-[clamp(0.4rem,0.6vw,1rem)]">
//           <div className="flex-1 min-h-0 overflow-hidden border w-[70px]">
//             <CarouselComponent />
//           </div>
//            {/*<HashTag /> */}
//           {/* <div className="border w-[70%]"><CarouselComponent /></div>
//           <div className="border w-[30%]"><HashTag /></div> */}
//         </div>
//       </div>
//       <div className="col-start-8 col-span-5 row-start-3 min-h-0 enter d7">
//         <EmailerBlock apiBase={B} accent="from-[#00cec9] to-[#0984e3]" from="#00cec9" to="#0984e3" />
//       </div>
//     </div>
//   );
// };

// export default IntegersDashboard;

// const WinRow = ({ label, val, accent = "#34d399", big }) => {
//   return (
//     <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
//       style={{ borderLeftColor: accent }}>
//       <div className="flex items-center justify-between">
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



// export const HighLightsMetric = ({ label, value, sub, accent = "#00CEC9", icon, big, brandValue }) => (
//   <div className="dark-card rounded-xl h-7 flex flex-col justify-center px-[clamp(0.5rem,0.8vw,1.4rem)] py-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0 overflow-hidden" style={{ boxShadow: `inset 3px 0 0 ${accent}` }}>
//     <div className="flex items-center gap-[clamp(0.3rem,0.5vw,0.8rem)]">
//       {icon && <IconChip d={icon} accent={accent} />}
//       <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}hrtyrwedrftgyhtgyjgyu</span>
//     </div>

//   </div>
// );






"use client";
import { fmt } from "../lib/api";
import { Card, Metric, TrendMetric, I, SectionTitle, IconChip } from "../lib/ui";
import { EmailerBlock } from "../lib/blocks";
import TodaysCreative from "../TodaysCreative/page";
import CarouselComponent from "../Crousel/page";
import { useContext } from "react";
import DataContext from "@/context/DataContext";

const ACCENT = "#00cec9";
const VIOLET = "#0984e3";   // Integers blue
const TITLE = "from-[#00cec9] to-[#0984e3]";
const B = "/integers";

const IntegersDashboard = () => {

  const formatEngagementTime = (seconds) => {
    if (seconds == null) return "--";

    const sec = Math.floor(Number(seconds));

    if (Number.isNaN(sec)) return "--";

    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;

    return `${minutes}m ${remainingSeconds}s`;
  };

  const contextData = useContext(DataContext);

  console.log("context????: ", contextData);

  let integersOverviewData = contextData?.overviewData?.integers_overview;
  let integersNewsData = contextData?.trendData?.integers?.news;
  let integersPaidAds = contextData?.integersAdsData?.data;

  let integers_instaData = contextData?.integersInstaPostData?.data;

  let integersMainWebGa4Data = contextData?.integersGA4Data?.data?.find(
    (item) => item.name === "Int - Main_Marketing"
  );

  let integersReportInShortGa4Data = contextData?.integersGA4Data?.data?.find(
    (item) => item.name === "reportinshort"
  );

  let integersIntegrsMarketGa4Data = contextData?.integersGA4Data?.data?.find(
    (item) => item.name === "integersmarket"
  );

  let integers_social_performance = contextData?.marketingDashboardData?.data;

  console.log("integersReportInShortGa4Data: ", integersReportInShortGa4Data);

  const gap = "gap-[clamp(0.4rem,0.7vw,1.3rem)]";
  return (
    <div className={`h-full w-full grid grid-cols-12 grid-rows-[1fr_0.72fr_1.1fr] ${gap}`} style={{ "--accent": ACCENT }}>

      {/* ===== Overview rail ===== */}
      <div className="col-span-3 row-start-1 row-span-2 min-h-0 enter d1">
        <Card title="Overview" accent={TITLE} className="h-full">
          <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
            <div className="shrink-0">
              <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Sell · USD</span>
              <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
                <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{integersOverviewData?.total_sell_usd ?? "--"}</span>
                {/* <TrendBadge cur={sell.data?.total_sales_usd} prev={lsell.data?.total_sales_usd} /> */}
              </div>
              <span className="t-small text-muted-2">vs last month <span className="font-bold text-strong">&nbsp;&nbsp;{integersOverviewData?.vs_last_month_usd ?? "--"}</span></span>
            </div>
            <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
              <Metric label="Live Products" value={integersOverviewData?.live_products ?? "--"} accent="#22d3ee" icon={I.box} brandValue />
              <Metric label="Top Product" value={integersOverviewData?.top_product?.split(":")[0] || ""} accent={VIOLET} icon={I.star} />
              <Metric label="Reports Generated" value={integersOverviewData?.reports_generated ?? "--"} accent={ACCENT} icon={I.doc} brandValue big />
            </div>
          </div>
        </Card>
      </div>

      {/* ===== Website performance ===== */}
      <div className="col-start-4 col-span-5 row-start-1 min-h-0 enter d2">
        <Card title="Website Performance" accent={TITLE} right={<span className="t-small text-muted-2">visits</span>}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <TrendMetric label="Integers Insights" value={integersMainWebGa4Data?.currentMonth?.activeUsers ?? "--"} accent="#00CEC9" icon={I.globe} />
            <TrendMetric label="Report InShort" value={integersReportInShortGa4Data?.currentMonth?.activeUsers ?? "--"} accent="#a78bfa" icon={I.doc} />
            <TrendMetric label="Integer Market" value={integersIntegrsMarketGa4Data?.currentMonth?.activeUsers ?? "--"} accent="#38bdf8" icon={I.cart} />
            <TrendMetric label="Integer Tech" value={"00"} accent="#34d399" icon={I.trendUp} />
          </div>
        </Card>
      </div>

      {/* ===== Social performance ===== */}

      <div className="col-start-9 col-span-5 row-start-1 min-h-0 enter d3">
        <Card title="Social Performance" accent={TITLE} right={<span className="t-small text-muted-2">followers</span>}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <Metric label="Instagram" value={integers_social_performance?.instagram_integers ?? "--"} accent="#fb7185" icon={I.insta} brandValue />
            <Metric label="YouTube" value={integers_social_performance?.youtube_integers ?? "--"} accent="#ff5c5c" icon={I.play} brandValue />
            <Metric label="Twitter" value={integers_social_performance?.twitter_integers ?? "--"} accent="#38bdf8" icon={I.send} brandValue />
            <Metric label="LinkedIn" value={integers_social_performance?.linkedin_integers ?? "--"} accent="#4b7bf5" icon={I.users} brandValue />
          </div>
        </Card>
      </div>

      {/* ===== Paid ads ===== */}
      <div className="col-start-4 col-span-5 row-start-2 min-h-0 enter d4">
        <Card title="Paid Ads" accent={TITLE} right={""}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            {/* <WinRow label="spend" val={integersPaidAds?.spend ?? "--"} accent="#22d3ee" /> */}
            <WinRow
              label="Spend"
              val={
                integersPaidAds?.spend != null
                  ? `₹ ${integersPaidAds.spend.toLocaleString("en-IN", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}`
                  : "--"
              }
              accent="#22d3ee"
            />

            {/* <WinRow label="impressions" val={integersPaidAds?.impressions ?? "--"} accent="#22d3ee" /> */}
            <WinRow
              label="Impressions"
              val={
                integersPaidAds?.impressions != null
                  ? integersPaidAds.impressions.toLocaleString("en-IN")
                  : "--"
              }
              accent="#22d3ee"
            />

            {/* <WinRow label="engagements" val={integersPaidAds?.engagements ?? "--"} accent="#a78bfa" /> */}
            <WinRow
              label="Engagements"
              val={
                integersPaidAds?.engagements != null
                  ? integersPaidAds.engagements.toLocaleString("en-IN")
                  : "--"
              }
              accent="#a78bfa"
            />

            {/* <WinRow label="ctr" val={integersPaidAds?.ctr ?? "--"} accent="#fbbf24" big /> */}
            <WinRow
              label="CTR"
              val={
                integersPaidAds?.ctr != null
                  ? `${integersPaidAds.ctr.toFixed(1)}%`
                  : "--"
              }
              accent="#fbbf24"
              big
            />

          </div>
        </Card>
      </div>

      {/* Highlights */}
      {/* <div className="col-start-9 col-span-4 row-start-2 min-h-0 enter d5">
        <Card title="Highlights" accent={TITLE}>
          <div className="flex-1 flex flex-col auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <HighLightsMetric label="Avg. Report Turnaround" value={"Lorem ipsum dolor sit amet."} accent="#22d3ee" icon={I.clock} />
            <HighLightsMetric label="Active Subscriptions" value={"--"} accent="#34d399" icon={I.users} brandValue />
          </div>
        </Card>
      </div> */}

      {/* ===== Engagement ===== */}
      <div className="col-start-9 col-span-5 row-start-2 min-h-0 enter d5">
        <Card title="Engagement" accent={TITLE} right={"Integer Market"}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <WinRow label="Bounce Rate" val={`${integersIntegrsMarketGa4Data?.currentMonth?.bounceRate ?? "--"} %`} accent="#22d3ee" />
            <WinRow label="Avg. Eng. Time" val={formatEngagementTime(
              integersIntegrsMarketGa4Data?.currentMonth?.averageEngagementTime
            )} accent="#22d3ee" />
            <WinRow label="Clicks" val={integersIntegrsMarketGa4Data?.currentMonth?.clicks ?? "--"} accent="#a78bfa" />
            <WinRow label="New User" val={integersIntegrsMarketGa4Data?.currentMonth?.newUsers ?? "--"} accent="#fbbf24" big />
          </div>
        </Card>
      </div>


      {/* ===== Bottom row (Emailer gets the tall band so the gauge + stats fit) ===== */}
      <div className="col-start-1 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d4">
        <TodaysCreative instaPostData={integers_instaData} />
      </div>
      <div className="col-start-4 col-span-4 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d5">
        <SectionTitle accent="from-cyan-400 to-sky-500">Today’s Trending</SectionTitle>
        <div className="flex-1 flex gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0 mt-[clamp(0.4rem,0.6vw,1rem)]">
          <div className="flex-1 min-h-0 overflow-hidden w-[70px]">
            <CarouselComponent newsData={integersNewsData} />
          </div>
          {/*<HashTag /> */}
          {/* <div className="border w-[70%]"><CarouselComponent /></div>
          <div className="border w-[30%]"><HashTag /></div> */}
        </div>
      </div>
      <div className="col-start-8 col-span-6 row-start-3 min-h-0 enter d7">
        {/* ===== Engagement ===== */}
        {/* <div className="col-start-9 col-span-5 row-start-2 min-h-0 enter d5"> */}
        <Card title="Engagement" accent={TITLE} right={"Report Inshort"}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <WinRow label="Bounce Rate" val={`${integersReportInShortGa4Data?.currentMonth?.bounceRate ?? "--"} %`} accent="#22d3ee" />
            <WinRow label="Avg. Eng. Time" val={formatEngagementTime(
              integersReportInShortGa4Data?.currentMonth?.averageEngagementTime
            )} accent="#22d3ee" />
            <WinRow label="Clicks" val={integersReportInShortGa4Data?.currentMonth?.clicks ?? "--"} accent="#a78bfa" />
            <WinRow label="New User" val={integersReportInShortGa4Data?.currentMonth?.newUsers ?? "--"} accent="#fbbf24" big />
          </div>
        </Card>
        {/* </div> */}
      </div>
    </div>
  );
};

export default IntegersDashboard;

const WinRow = ({ label, val, accent = "#34d399", big }) => {
  return (
    <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
      style={{ borderLeftColor: accent }}>
      <div className="flex items-center justify-between">
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



export const HighLightsMetric = ({ label, value, sub, accent = "#00CEC9", icon, big, brandValue }) => (
  <div className="dark-card rounded-xl h-7 flex flex-col justify-center px-[clamp(0.5rem,0.8vw,1.4rem)] py-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0 overflow-hidden" style={{ boxShadow: `inset 3px 0 0 ${accent}` }}>
    <div className="flex items-center gap-[clamp(0.3rem,0.5vw,0.8rem)]">
      {icon && <IconChip d={icon} accent={accent} />}
      <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}hrtyrwedrftgyhtgyjgyu</span>
    </div>

  </div>
);
