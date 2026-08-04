"use client";
import { useEffect, useState } from "react";
import DataContext from "./DataContext";
//
const DataProvider = ({ children }) => {
    const baseurl1 = "https://marketing-dashboard-node-backend.onrender.com";
    const baseurl2 = "https://admin-panel.integermarket.com";
    const [overviewData, setOverviewData] = useState(null);
    const [quotesData, setQuotesData] = useState(null);
    const [aadarData, setAadarData] = useState(null);
    const [trendData, setTrendData] = useState(null);
    const [umangGA4Data, setUmangGA4Data] = useState(null);
    const [umangAdsData, setUmangAdsData] = useState(null);
    const [umangEmailerData, setUmangEmailerData] = useState(null);
    const [umangInstaPostData, setUmangInstaPostData] = useState(null);
    const [integersGA4Data, setIntegersGA4Data] = useState(null);
    const [integersAdsData, setIntegersAdsData] = useState(null);
    const [integersInstaPostData, setIntegersInstaPostData] = useState(null);
    const [aadarGA4Data, setAadarGA4Data] = useState(null);
    const [aadarAdsData, setAadarAdsData] = useState(null);
    const [aadarInstaPostData, setAadarInstaPostData] = useState(null);
    const [marketingDashboardData, setMarketingDashboardData] = useState(null);

    const getDashboardData = async () => {
        try {
            console.log("api called");
            let [overviewRes,
                quotesRes,
                aadarRes,
                trendRes,
                umangGa4Res,
                umangAdsRes,
                umangEmailerRes,
                umangInstaRes,
                integersGa4Res,
                integersAdsRes,
                integersInstaRes,
                aadarGa4Res,
                aadarAdsRes,
                aadarInstaRes,
                marketingDashboardRes
            ] = await Promise.allSettled([
                fetch(`${baseurl2}/dashboard/overview`),
                fetch(`${baseurl2}/dashboard/quote`),
                fetch(`${baseurl2}/dashboard/aadar`),
                fetch(`${baseurl2}/dashboard/trends`),
                fetch(`${baseurl1}/api/umang/umang-ga4`),
                fetch(`${baseurl1}/api/umang/umang-ads`),
                fetch(`${baseurl1}/api/umang/umang-emailer`),
                fetch(`${baseurl1}/api/umang/umang-insta-post`),
                fetch(`${baseurl1}/api/integers/integers-ga4`),
                fetch(`${baseurl1}/api/integers/integers-ads`),
                fetch(`${baseurl1}/api/integers/integers-insta-post`),
                fetch(`${baseurl1}/api/aadar/aadar-ga4`),
                fetch(`${baseurl1}/api/aadar/aadar-ads`),
                fetch(`${baseurl1}/api/aadar/aadar-insta-post`),
                fetch(`${baseurl1}/api/marketing-dashboard-data`)
            ]);

            if (overviewRes.status === "fulfilled" && overviewRes.value.ok) {
                const overviewResData = await overviewRes.value.json();
                // console.log("overviewResData:", overviewResData);
                setOverviewData(overviewResData ?? null);
            }
            else {
                console.log("overview api failed");
            }
            if (quotesRes.status === "fulfilled" && quotesRes.value.ok) {
                const quotesResData = await quotesRes.value.json();
                // console.log("quotesResData", quotesResData);
                setQuotesData(quotesResData ?? null);
            }
            else {
                console.log("quotes api failed");
            }
            if (aadarRes.status === "fulfilled" && aadarRes.value.ok) {
                const aadarResData = await aadarRes.value.json();
                // console.log("aadarResData", aadarResData);
                setAadarData(aadarResData ?? null);
            }
            else {
                console.log("aadar api failed");
            }
            if (trendRes.status === "fulfilled" && trendRes.value.ok) {
                const trendResData = await trendRes.value.json();
                // console.log("trendResData", trendResData);
                setTrendData(trendResData ?? null);
            }
            else {
                console.log("trend api failed");
            }

            if (umangGa4Res.status === "fulfilled" && umangGa4Res.value.ok) {
                const umangGa4ResData = await umangGa4Res.value.json();
                // console.log("umangGa4ResData:", umangGa4ResData);
                setUmangGA4Data(umangGa4ResData ?? null);
            }
            else {
                console.log("umangGa4 api failed");
            }

            if (umangAdsRes.status === "fulfilled" && umangAdsRes.value.ok) {
                const umangAdsResData = await umangAdsRes.value.json();
                // console.log("umangAdsResData:", umangAdsResData);
                setUmangAdsData(umangAdsResData ?? null);
            }
            else {
                console.log("umangAds api failed");
            }

            if (umangEmailerRes.status === "fulfilled" && umangEmailerRes.value.ok) {
                const umangEmailerResData = await umangEmailerRes.value.json();
                // console.log("umangEmailerResData:", umangEmailerResData);
                setUmangEmailerData(umangEmailerResData ?? null);
            }
            else {
                console.log("umangEmailer api failed");
            }

            if (umangInstaRes.status === "fulfilled" && umangInstaRes.value.ok) {
                const umangInstaResData = await umangInstaRes.value.json();
                // console.log("umangInstaResData:", umangInstaResData);
                setUmangInstaPostData(umangInstaResData ?? null);
            }
            else {
                console.log("umangInsta api failed");
            }

            if (integersGa4Res.status === "fulfilled" && integersGa4Res.value.ok) {
                const integersGa4ResData = await integersGa4Res.value.json();
                // console.log("integersGa4ResData:", integersGa4ResData);
                setIntegersGA4Data(integersGa4ResData ?? null);
            }
            else {
                console.log("integersGa4 api failed");
            }

            if (integersAdsRes.status === "fulfilled" && integersAdsRes.value.ok) {
                const integersAdsResData = await integersAdsRes.value.json();
                // console.log("integersAdsResData:", integersAdsResData);
                setIntegersAdsData(integersAdsResData ?? null);
            }
            else {
                console.log("integersAds api failed");
            }

            if (integersInstaRes.status === "fulfilled" && integersInstaRes.value.ok) {
                const integersInstaResData = await integersInstaRes.value.json();
                // console.log("integersInstaResData:", integersInstaResData);
                setIntegersInstaPostData(integersInstaResData ?? null);
            }
            else {
                console.log("integersInsta api failed");
            }

            if (aadarGa4Res.status === "fulfilled" && aadarGa4Res.value.ok) {
                const aadarGa4ResData = await aadarGa4Res.value.json();
                // console.log("aadarGa4ResData:", aadarGa4ResData);
                setAadarGA4Data(aadarGa4ResData ?? null);
            }
            else {
                console.log("aadarGa4 api failed");
            }

            if (aadarAdsRes.status === "fulfilled" && aadarAdsRes.value.ok) {
                const aadarAdsResData = await aadarAdsRes.value.json();
                // console.log("aadarAdsResData:", aadarAdsResData);
                setAadarAdsData(aadarAdsResData ?? null);
            }
            else {
                console.log("aadarAds api failed");
            }

            if (aadarInstaRes.status === "fulfilled" && aadarInstaRes.value.ok) {
                const aadarInstaResData = await aadarInstaRes.value.json();
                // console.log("aadarInstaResData:", aadarInstaResData);
                setAadarInstaPostData(aadarInstaResData ?? null);
            }
            else {
                console.log("aadarInsta api failed");
            }

            if (marketingDashboardRes.status === "fulfilled" && marketingDashboardRes.value.ok) {
                const marketingDashboardResData = await marketingDashboardRes.value.json();
                // console.log("marketingDashboardResData:", marketingDashboardResData);
                setMarketingDashboardData(marketingDashboardResData ?? null);
            }
            else {
                console.log("marketingDashboard api failed");
            }
        }
        catch (err) {
            console.log("something went wrong", err);
        }
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <DataContext.Provider
            value={{
                overviewData,
                quotesData,
                aadarData,
                trendData,
                umangGA4Data,
                umangAdsData,
                umangEmailerData,
                umangInstaPostData,
                integersGA4Data,
                integersAdsData,
                integersInstaPostData,
                aadarGA4Data,
                aadarAdsData,
                aadarInstaPostData,
                marketingDashboardData
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
