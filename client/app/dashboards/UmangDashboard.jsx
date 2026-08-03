"use client";
import BarChartDouble from "../BarchartDouble/page";
import BarChartSingle from "../BarchartSingle/page";
import CarouselComponent from "../Crousel/page";
import Emailer from "../Emailer/page";
import KPI from "../KPI/page";
import TodaysCreative from "../TodaysCreative/page";
import Quotes from "../Quotes/page";
import BounceRate from "../BounceRate/page";
import HashTag from "../HashTag/page";
import PaidAds from "../PaidAds/page";
import { SectionTitle } from "../lib/ui";
import { useContext } from "react";
import DataContext from "@/context/DataContext";

/* Umang Global — body only (top bar is provided by the wall shell). */
const UmangDashboard = () => {

  const contextData = useContext(DataContext);

  let umangLeadsData = contextData?.overviewData?.umang_leads;
  let umangQuotesData = contextData?.quotesData;
  let umangNewsData = contextData?.trendData?.umang?.news;

  let umangPaidAdsData = contextData?.umangAdsData?.data;
  let umang_GA4Data = contextData?.umangGA4Data?.data;

  // console.log("contextData??: ",contextData);

  let umang_market_data = contextData?.marketingDashboardData?.data;

  // console.log("umang_market_data: ",umang_market_data);

  let umangEngineeringData = umang_GA4Data?.find((itm)=>{
    return itm.name==="Umang Engineering"
  });

  let umangEngineeringEngagementData = umangEngineeringData?.currentMonth;

  let umang_emailerData = contextData?.umangEmailerData?.data;
  let umang_instaData = contextData?.umangInstaPostData?.data;

  let revenueGenerated = contextData?.marketingDashboardData?.data?.revenue_generated;

  const gap = "gap-[clamp(0.4rem,0.7vw,1.3rem)]";
  return (
    <div className={`h-full w-full grid grid-cols-12 grid-rows-[1fr_0.72fr_1.1fr] ${gap}`}>

      {/* Leads rail */}
      <div className="col-span-3 row-start-1 row-span-2 min-h-0 enter d1">
        <KPI umangLeadsData={umangLeadsData} revenueGenerated={revenueGenerated} />
      </div>

      {/* Charts */}
      <div className="col-start-4 col-span-5 row-start-1 min-h-0 enter d2">
        <BarChartDouble umang_GA4Data={umang_GA4Data} />
      </div>
      <div className="col-start-9 col-span-4 row-start-1 min-h-0 enter d3">
        <BarChartSingle umang_market_data={umang_market_data} />
      </div>

      {/* Engagement + Quote */}
      <div className="col-start-4 col-span-4 row-start-2 min-h-0 enter d4">
        <BounceRate umangEngineeringEngagementData={umangEngineeringEngagementData} />
      </div>
      <div className="col-start-8 col-span-5 row-start-2 min-h-0 enter d5">
        <Quotes umangQuotesData={umangQuotesData} />
      </div>

      {/* Bottom row */}
      <div className="col-start-1 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d4">
        <TodaysCreative instaPostData={umang_instaData} />
      </div>
      <div className="col-start-4 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d5">
        <SectionTitle accent="from-cyan-400 to-sky-500">Today’s Trending</SectionTitle>
        <div className="flex-1 flex gap-[clamp(0.4rem,0.6vw,1rem)] min-h-0 mt-[clamp(0.4rem,0.6vw,1rem)]">
          <div className="flex-1 min-h-0 overflow-hidden w-[70px]">
            <CarouselComponent newsData={umangNewsData} />
          </div>
           {/*<HashTag /> */}
          {/* <div className="border w-[70%]"><CarouselComponent /></div>
          <div className="border w-[30%]"><HashTag /></div> */}
        </div>
      </div>
      <div className="col-start-7 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d6">
        <Emailer umang_emailerData={umang_emailerData} />
      </div>
      <div className="col-start-10 col-span-3 row-start-3 dark rounded-2xl p-[clamp(0.6rem,0.9vw,1.6rem)] flex flex-col min-h-0 overflow-hidden enter d7">
        <PaidAds umangPaidAdsData={umangPaidAdsData} />
      </div>
    </div>
  );
};

export default UmangDashboard;
