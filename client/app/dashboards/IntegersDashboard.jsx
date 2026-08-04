"use client";
import { Card, Metric, TrendMetric, I, SectionTitle, IconChip } from "../lib/ui";
import TodaysCreative from "../TodaysCreative/page";
import CarouselComponent from "../Crousel/page";
import { useContext } from "react";
import DataContext from "@/context/DataContext";
const ACCENT = "#00cec9";
const VIOLET = "#0984e3";
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
  const gap = "gap-[clamp(0.4rem,0.7vw,1.3rem)]";

  return (
    <div className={`h-full w-full grid grid-cols-12 grid-rows-[1fr_0.72fr_1.1fr] ${gap}`} style={{ "--accent": ACCENT }}>
      <div className="col-span-3 row-start-1 row-span-2 min-h-0 enter d1">
        <Card title="Overview" accent={TITLE} className="h-full">
          <div className="flex-1 flex flex-col gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0">
            <div className="shrink-0">
              <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Sell · USD</span>
              <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
                <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{integersOverviewData?.total_sell_usd ?? "--"}</span>
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
      <div className="col-start-4 col-span-5 row-start-2 min-h-0 enter d4">
        <Card title="Paid Ads" accent={TITLE} right={""}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
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
            <WinRow
              label="Impressions"
              val={
                integersPaidAds?.impressions != null
                  ? integersPaidAds.impressions.toLocaleString("en-IN")
                  : "--"
              }
              accent="#22d3ee"
            />
            <WinRow
              label="Engagements"
              val={
                integersPaidAds?.engagements != null
                  ? integersPaidAds.engagements.toLocaleString("en-IN")
                  : "--"
              }
              accent="#a78bfa"
            />
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
      <div className="col-start-9 col-span-5 row-start-2 min-h-0 enter d5">
        <Card title="Engagement" accent={TITLE} right={"Integer Market"}>
          <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-[clamp(0.35rem,0.55vw,0.9rem)] min-h-0">
            <WinRow label="Bounce Rate" val={`${integersIntegrsMarketGa4Data?.currentMonth?.bounceRate ?? "--"} %`} accent="#22d3ee" />
            <WinRow label="Avg. Eng. Time" val={integersIntegrsMarketGa4Data?.currentMonth?.averageEngagementTime ?? "--"} accent="#22d3ee" />
            <WinRow label="Clicks" val={integersIntegrsMarketGa4Data?.currentMonth?.clicks ?? "--"} accent="#a78bfa" />
            <WinRow label="New User" val={integersIntegrsMarketGa4Data?.currentMonth?.newUsers ?? "--"} accent="#fbbf24" big />
          </div>
        </Card>
      </div>
      <div className="col-start-1 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d4">
        <TodaysCreative instaPostData={integers_instaData} />
      </div>
      <div className="col-start-4 col-span-4 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d5">
        <SectionTitle accent="from-cyan-400 to-sky-500">Today’s Trending</SectionTitle>
        <div className="flex-1 flex gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0 mt-[clamp(0.4rem,0.6vw,1rem)]">
          <div className="flex-1 min-h-0 overflow-hidden w-[70px]">
            <CarouselComponent newsData={integersNewsData} />
          </div>
        </div>
      </div>
      <div className="col-start-8 col-span-6 row-start-3 min-h-0 enter d7">
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
        <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
        <span className={` font-bold count-pop break-words leading-tight mt-[0.15em]`}>
          {val}
        </span>
      </div>
    </div>
  );
};
