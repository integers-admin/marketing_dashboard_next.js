// "use client";
// import { useApi, fmt } from "../lib/api";
// import { Card, Metric, TrendMetric, TrendBadge, BarStat, I, SectionTitle } from "../lib/ui";
// import { CreativesBlock, TrendingBlock, EmailerBlock } from "../lib/blocks";
// import TodaysCreative from "../TodaysCreative/page";
// import CarouselComponent from "../Crousel/page";

// const ACCENT = "#CFC5A0";   // Aadar beige
// const GOLD = "#5e8fb5";     // Aadar blue (lightened from #2B5775 for contrast)
// const TITLE = "from-[#CFC5A0] to-[#5e8fb5]";
// const B = "/aadar";

// const AadarDashboard = () => {
//   // Overview
//   const sales = useApi(`${B}/analyze/sales/current-month`);
//   const lsales = useApi(`${B}/analyze/sales/previous-month`);
//   const best = useApi(`${B}/analyze/sales/best-product`);
//   const recent = useApi(`${B}/analyze/sales/recent-sold`);
//   const units = useApi(`${B}/analyze/units/current-month`);
//   // Stock
//   const stock = useApi(`${B}/analyze/stock/summary`);
//   // Platforms
//   const plat = useApi(`${B}/analyze/platforms/current-month`);
//   const lplat = useApi(`${B}/analyze/platforms/previous-month`);
//   // Digital
//   const digi = useApi(`${B}/analyze/social/followers`);
//   // Paid ads
//   const ads = useApi(`${B}/analyze/ads/current-month`);
//   const lads = useApi(`${B}/analyze/ads/previous-month`);

//   const pmap = (d) => Object.fromEntries((d?.platforms ?? []).map((p) => [p.name, p.units]));
//   const cur = pmap(plat.data);
//   const prev = pmap(lplat.data);
//   const maxUnits = Math.max(...Object.values(cur), ...Object.values(prev), 1);

//   const gap = "gap-[clamp(0.4rem,0.7vw,1.3rem)]";
//   return (
//     <div className={`h-full w-full grid grid-cols-12 grid-rows-[1fr_0.72fr_1.1fr] ${gap}`} style={{ "--accent": ACCENT }}>

//       {/* ===== Overview rail ===== */}
//       <div className="col-span-3 row-start-1 row-span-2 min-h-0 enter d1">
//         <Card title="Overview" accent={TITLE} className="h-full">
//           <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
//             <div className="shrink-0">
//               <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Sale</span>
//               <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
//                 <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{sales.data?.total_sales != null ? `₹${fmt(sales.data.total_sales)}` : "00"}</span>
//                 {/* <TrendBadge cur={sales.data?.total_sales} prev={lsales.data?.total_sales} /> */}
//               </div>
//               <span className="t-small text-muted-2">vs last month <span className="font-bold text-strong">{lsales.data?.total_sales != null ? `₹${fmt(lsales.data.total_sales)}` : "00"}</span></span>
//             </div>
//             <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
//               <Metric label="Best Product" value={best.data?.product ?? "00"} accent={GOLD} icon={I.star} />
//               <Metric label="Recent Sold" value={recent.data?.item ?? "00"} accent="#22d3ee" icon={I.cart} />
//               <Metric label="Total Units Sold" value={units.data?.total_units != null ? fmt(units.data.total_units) : "00"} accent={ACCENT} icon={I.box} brandValue big />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* ===== Sales by platform ===== */}
//       <div className="col-start-4 col-span-5 row-start-1 min-h-0 enter d2">
//         <Card title="Units by Platform" accent={TITLE} right={<span className="t-small text-muted-2">vs last month</span>}>
//           <div className="flex-1 flex flex-col gap-3 min-h-0 justify-center">
//             <BarStat label="Amazon" cur={'--'}  accent="#e3a93a" format={fmt} />
//             <BarStat label="Flipkart" cur={'--'} accent="#3fbf5f" format={fmt} />
//             <BarStat label="Website" cur={'--'} accent="#22d3ee" format={fmt} />
//           </div>
//           <div className="shrink-0 mt-[clamp(0.4rem,0.6vw,1rem)]">
//             <Metric label="Bulk Shipments · Kuwa" value={plat.data?.bulk_kuwa != null ? fmt(plat.data.bulk_kuwa) : "--"} accent={GOLD} icon={I.truck} />
//           </div>
//         </Card>
//       </div>

//       {/* ===== Stock ===== */}
//       <div className="col-start-9 col-span-4 row-start-1 min-h-0 enter d3">
//         <Card title="Stock" accent={TITLE}
//           right={<span className="t-small text-muted-2">Products <span className="font-bold text-strong t-body">{stock.data?.total_products ?? "--"}</span></span>}>
//           <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             {/* <StockSection label="Near Expiry" accent="#fb7185" items={stock.data?.near_expiry} valueKey="qty" />
//             <StockSection label="Need to Order" accent="#e3a93a" items={stock.data?.need_to_order} />
//             <StockSection label="Selling Rapidly" accent="#3fbf5f" items={stock.data?.selling_rapidly} icon={I.flame} /> */}

//             <WinRow label="Near Expiry" val={"--"} accent="#fb7185" />
//             <WinRow label="Near Expiry" val={"--"} accent="#e3a93a" />
//             <WinRow label="Near Expiry" val={"--"} accent="#3fbf5f" />
//           </div>
//         </Card>
//       </div>
//       {/* <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
//         <WinRow label="Best Company" val={"--"} accent="#22d3ee" />
//         <WinRow label="Best Product" val={"--"} accent="#a78bfa" />
//         <WinRow label="Revenue Generated" val={"--"} accent="#fbbf24" big />
//       </div> */}

//       {/* ===== Digital performance ===== */}
//       <div className="col-start-4 col-span-4 row-start-2 min-h-0 enter d4">
//         <Card title="Digital Performance" accent={TITLE}>
//           <div className="flex-1 grid grid-cols-3 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             <Metric label="Instagram" value={digi.data?.instagram != null ? fmt(digi.data.instagram) : "00"} sub="" accent="#fb7185" icon={I.insta} brandValue />
//             <Metric label="YouTube" value={digi.data?.youtube != null ? fmt(digi.data.youtube) : "00"} sub="" accent="#ff5c5c" icon={I.play} brandValue />
//             <Metric label="Website" value={digi.data?.website_visits != null ? fmt(digi.data.website_visits) : "00"} sub="" accent="#22d3ee" icon={I.globe} brandValue />
//           </div>
//         </Card>
//       </div>

//       {/* ===== Paid ads ===== */}
//       <div className="col-start-8 col-span-5 row-start-2 min-h-0 enter d5">
//         <Card title="Paid Ads" accent={TITLE} right={<span className="t-small text-muted-2">vs last month</span>}>
//           <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             <WinRow label="spend" val={ "--"} accent="#22d3ee" />
//         <WinRow label="impressions" val={ "--"} accent="#22d3ee" />
//         <WinRow label="engagements" val={ "--"} accent="#a78bfa" />
//         <WinRow label="ctr" val={ "--"} accent="#fbbf24" big />
//           </div>
//         </Card>
//       </div>

//       {/* ===== Bottom row ===== */}
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
//         <Card title="Paid Ads" accent={TITLE} right={<span className="t-small text-muted-2">vs last month</span>}>
//           <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
//             <WinRow label="spend" val={ "--"} accent="#22d3ee" />
//         <WinRow label="impressions" val={ "--"} accent="#22d3ee" />
//         <WinRow label="engagements" val={ "--"} accent="#a78bfa" />
//         <WinRow label="ctr" val={ "--"} accent="#fbbf24" big />
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// const StockSection = ({ label, items, accent, valueKey, icon }) => (
//   <div className="dark-card rounded-xl flex-1 min-h-0 flex flex-col px-[clamp(0.45rem,0.7vw,1.2rem)] py-[clamp(0.3rem,0.45vw,0.7rem)] overflow-hidden" style={{ boxShadow: `inset 3px 0 0 ${accent}` }}>
//     <span className="t-micro uppercase tracking-widest font-semibold mb-[0.25em]" style={{ color: accent }}>{label}</span>
//     <div className="flex-1 min-h-0 flex flex-col justify-center gap-[0.15em]">
//       {(items && items.length ? items : [null, null]).slice(0, 2).map((it, i) => (
//         <div key={i} className="flex items-center justify-between gap-2">
//           <span className="t-small text-strong font-medium truncate">{it?.name ?? "--"}</span>
//           {it && it[valueKey] != null && <span className="t-small font-bold tabular-nums shrink-0" style={{ color: accent }}>{it[valueKey]}</span>}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default AadarDashboard;




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





"use client";
import { useApi, fmt } from "../lib/api";
import { Card, Metric, TrendMetric, TrendBadge, BarStat, I, SectionTitle } from "../lib/ui";
import { CreativesBlock, TrendingBlock, EmailerBlock } from "../lib/blocks";
import TodaysCreative from "../TodaysCreative/page";
import CarouselComponent from "../Crousel/page";
import { useContext } from "react";
import DataContext from "@/context/DataContext";

const ACCENT = "#CFC5A0";   // Aadar beige
const GOLD = "#5e8fb5";     // Aadar blue (lightened from #2B5775 for contrast)
const TITLE = "from-[#CFC5A0] to-[#5e8fb5]";
const B = "/aadar";

const AadarDashboard = () => {

  const formatEngagementTime = (seconds) => {
    if (!seconds) return "--";

    const sec = Math.floor(Number(seconds));

    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;

    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (value) => {
    if (value == null || value === "") return "--";

    const num = Number(value);

    if (Number.isNaN(num)) return "--";

    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(".0", "")}k`;
    }

    return num.toString();
  };

  const contextData = useContext(DataContext);

  let aadarNewsData = contextData?.trendData?.aadar?.news;
  let overviewData = contextData?.aadarData?.overview;
  let shopifyData = contextData?.aadarData?.shopify?.top_products?.[0];
  let aadarPaidAds = contextData?.aadarAdsData?.data;

  let aadar_instaData = contextData?.aadarInstaPostData?.data;

  let platformData = contextData?.aadarData?.units_by_platform ?? [];

  let digitalPerformance = contextData?.marketingDashboardData;

  let aadar_Ga4Data = contextData?.aadarGA4Data?.data;

  const gap = "gap-[clamp(0.4rem,0.7vw,1.3rem)]";
  return (
    <div className={`h-full w-full grid grid-cols-12 grid-rows-[1fr_0.72fr_1.1fr] ${gap}`} style={{ "--accent": ACCENT }}>

      {/* ===== Overview rail ===== */}
      <div className="col-span-3 row-start-1 row-span-2 min-h-0 enter d1">
        <Card title="Overview" accent={TITLE} className="h-full">
          <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
            <div className="shrink-0">
              <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Sale</span>
              <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
                <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{overviewData?.total_sale ?? "--"}</span>
                {/* <TrendBadge cur={sales.data?.total_sales} prev={lsales.data?.total_sales} /> */}
              </div>
              <span className="t-small text-muted-2">vs last month <span className="font-bold text-strong">&nbsp;&nbsp;{overviewData?.vs_last_month ?? "--"}</span></span>
            </div>
            <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
              <Metric label="Best Product" value={overviewData?.best_product ?? "--"} accent={GOLD} icon={I.star} />
              <Metric label="Recent Sold" value={overviewData?.recent_sold ?? "--"} accent="#22d3ee" icon={I.cart} />
              <Metric label="Total Units Sold" value={overviewData?.total_units ?? "--"} accent={ACCENT} icon={I.box} brandValue big />
            </div>
          </div>
        </Card>
      </div>

      {/* ===== Sales by platform ===== */}
      <div className="col-start-4 col-span-5 row-start-1 min-h-0 enter d2">
        <Card title="Units by Platform" accent={TITLE} right={<span className="t-small text-muted-2">vs last month</span>}>
          <div className="flex-1 flex flex-col gap-5 min-h-0 justify-center mt-2">
            <BarStat label="Amazon" cur={platformData.find(i => i.platform === "Amazon FBM")?.units ?? "--"} accent="#e3a93a" format={fmt} />
            <BarStat label="Flipkart" cur={platformData.find(i => i.platform === "Flipkart")?.units ?? "--"} accent="#3fbf5f" format={fmt} />
            <BarStat label="Website" cur={platformData.find(i => i.platform === "Website")?.units ?? "--"} accent="#22d3ee" format={fmt} />
          </div>
          <div className="shrink-0 mt-5">
            <Metric label="Bulk Shipments · Kuwa" value={platformData.find(i => i.platform === "Kuwa")?.units ?? "--"} accent={GOLD} icon={I.truck} />
          </div>
        </Card>
      </div>

      {/* ===== Stock ===== */}
      <div className="col-start-9 col-span-4 row-start-1 min-h-0 enter d3">
        <Card title="Shopify" accent={TITLE}
          right={<span className="t-small text-muted-2">Top Products</span>}>
          <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            {/* <StockSection label="Near Expiry" accent="#fb7185" items={stock.data?.near_expiry} valueKey="qty" />
            <StockSection label="Need to Order" accent="#e3a93a" items={stock.data?.need_to_order} />
            <StockSection label="Selling Rapidly" accent="#3fbf5f" items={stock.data?.selling_rapidly} icon={I.flame} /> */}

            <WinRow label="Product Name" val={shopifyData?.product ?? "--"} accent="#fb7185" />
            <WinRow label="Revenue" val={shopifyData?.revenue ?? "--"} accent="#e3a93a" />
            <WinRow label="Units Sold" val={shopifyData?.units_sold ?? "--"} accent="#3fbf5f" />
          </div>
        </Card>
      </div>
      {/* <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
        <WinRow label="Best Company" val={"--"} accent="#22d3ee" />
        <WinRow label="Best Product" val={"--"} accent="#a78bfa" />
        <WinRow label="Revenue Generated" val={"--"} accent="#fbbf24" big />
      </div> */}

      {/* ===== Digital performance ===== */}
      <div className="col-start-4 col-span-4 row-start-2 min-h-0 enter d4">
        <Card title="Digital Performance" accent={TITLE}>
          <div className="flex-1 grid grid-cols-3 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <Metric
              label="Instagram"
              value={formatNumber(digitalPerformance?.data?.instagram_aadar)}
              sub=""
              accent="#fb7185"
              icon={I.insta}
              brandValue
            />

            <Metric
              label="YouTube"
              value={formatNumber(digitalPerformance?.data?.youtube_aadar)}
              sub=""
              accent="#ff5c5c"
              icon={I.play}
              brandValue
            />

            <Metric
              label="Website"
              value={formatNumber(aadar_Ga4Data?.activeUsers)}
              sub=""
              accent="#22d3ee"
              icon={I.globe}
              brandValue
            />
          </div>
        </Card>
      </div>

      {/* ===== Engagement ===== */}
      <div className="col-start-8 col-span-5 row-start-2 min-h-0 enter d5">
        <Card title="Engagement" accent={TITLE} right={""}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">

            <WinRow label="Bounce Rate" val={`${aadar_Ga4Data?.bounceRate ?? "--"} %`} accent="#22d3ee" />



            <WinRow label="Avg. Eng. Time" val={formatEngagementTime(
              aadar_Ga4Data?.averageEngagementTime
            )} accent="#22d3ee" />
            <WinRow label="Clicks" val={aadar_Ga4Data?.clicks ?? "--"} accent="#a78bfa" />
            <WinRow label="New User" val={aadar_Ga4Data?.newUsers ?? "--"} accent="#fbbf24" big />
          </div>
        </Card>
      </div>

      {/* ===== Bottom row ===== */}
      <div className="col-start-1 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d4">
        <TodaysCreative instaPostData={aadar_instaData} />
      </div>

      <div className="col-start-4 col-span-4 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d5">
        <SectionTitle accent="from-cyan-400 to-sky-500">Today’s Trending</SectionTitle>
        <div className="flex-1 flex gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0 mt-[clamp(0.4rem,0.6vw,1rem)]">
          <div className="flex-1 min-h-0 overflow-hidden w-[70px]">
            <CarouselComponent newsData={aadarNewsData} />
          </div>
          {/*<HashTag /> */}
          {/* <div className="border w-[70%]"><CarouselComponent /></div>
          <div className="border w-[30%]"><HashTag /></div> */}
        </div>
      </div>

      <div className="col-start-8 col-span-5 row-start-3 min-h-0 enter d7">
        <Card title="Paid Ads" accent={TITLE} right={""}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            {/* <WinRow label="spend" val={aadarPaidAds?.spend ?? "--"} accent="#22d3ee" />
            <WinRow label="impressions" val={aadarPaidAds?.impressions ?? "--"} accent="#22d3ee" />
            <WinRow label="engagements" val={aadarPaidAds?.engagements ?? "--"} accent="#a78bfa" />
            <WinRow label="ctr" val={aadarPaidAds?.ctr ?? "--"} accent="#fbbf24" big /> */}

            <WinRow
              label="Spend"
              val={
                aadarPaidAds?.spend != null
                  ? `₹ ${aadarPaidAds.spend.toLocaleString("en-IN", {
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
                aadarPaidAds?.impressions != null
                  ? aadarPaidAds.impressions.toLocaleString("en-IN")
                  : "--"
              }
              accent="#22d3ee"
            />

            <WinRow
              label="Engagements"
              val={
                aadarPaidAds?.engagements != null
                  ? aadarPaidAds.engagements.toLocaleString("en-IN")
                  : "--"
              }
              accent="#a78bfa"
            />

            <WinRow
              label="CTR"
              val={
                aadarPaidAds?.ctr != null
                  ? `${aadarPaidAds.ctr.toFixed(1)}%`
                  : "--"
              }
              accent="#fbbf24"
              big
            />

          </div>
        </Card>
      </div>
    </div>
  );
};

// const StockSection = ({ label, items, accent, valueKey, icon }) => (
//   <div className="dark-card rounded-xl flex-1 min-h-0 flex flex-col px-[clamp(0.45rem,0.7vw,1.2rem)] py-[clamp(0.3rem,0.45vw,0.7rem)] overflow-hidden" style={{ boxShadow: `inset 3px 0 0 ${accent}` }}>
//     <span className="t-micro uppercase tracking-widest font-semibold mb-[0.25em]" style={{ color: accent }}>{label}</span>
//     <div className="flex-1 min-h-0 flex flex-col justify-center gap-[0.15em]">
//       {(items && items.length ? items : [null, null]).slice(0, 2).map((it, i) => (
//         <div key={i} className="flex items-center justify-between gap-2">
//           <span className="t-small text-strong font-medium truncate">{it?.name ?? "--"}</span>
//           {it && it[valueKey] != null && <span className="t-small font-bold tabular-nums shrink-0" style={{ color: accent }}>{it[valueKey]}</span>}
//         </div>
//       ))}
//     </div>
//   </div>
// );

export default AadarDashboard;




const WinRow = ({ label, val, accent = "#34d399", big }) => {
  return (
    <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
      style={{ borderLeftColor: accent }}>
      <div className="flex items-center justify-between">
        {/* <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} /> */}
        <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>

        <span className={` font-bold count-pop break-words leading-tight mt-[0.15em]`}>
          {/* {val} */}
          {String(val).length > 16
            ? String(val).slice(0, 13) + "..."
            : String(val)}
        </span>
      </div>

    </div>
  );
};
