"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend } from "recharts";

const formatNumber = (value) => {
  const num = Number(value);
  if (!num) return "0";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "k";
  return num.toString();
};

const BarChartSingle = ({ umang_market_data }) => {

  const nameShortMap = {
    instagram_umang: "IG",
    linkedin_umang: "LI",
    facebook_umang: "FB",
    youtube_umang: "YT",
    pinterest_umang: "PT",
    twitter_umang: "TW",
  };

  const [socialData, setSocialData] = useState([]);

  useEffect(() => {
    if (!umang_market_data || typeof umang_market_data !== "object") {
      setSocialData([]);
      return;
    }

    const fields = [
      "instagram_umang",
      "linkedin_umang",
      "facebook_umang",
      "youtube_umang",
      "pinterest_umang",
      "twitter_umang",
    ];

    const chartData = fields.map((key) => ({
      title: nameShortMap[key],
      total_impressions: Number(umang_market_data?.[key] ?? 0),
    }));

    setSocialData(chartData);
  }, [umang_market_data]);

  return (
    <div className="dark p-[clamp(0.6rem,0.9vw,1.6rem)] rounded-2xl w-full h-full min-w-0 flex flex-col overflow-hidden">
      <h2 className="font-semibold mb-2">
        <span className="t-label text-muted-2 uppercase tracking-wide">Social Impressions</span>
        {/* <span className="t-value gradient-emerald font-extrabold leading-none">
          {impression != null ? formatNumber(impression) : "--"}
        </span> */}
      </h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={socialData}>
            <defs>
              <linearGradient id="socialBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5bc7d3" />
                <stop offset="100%" stopColor="#2f8a93" />
              </linearGradient>
            </defs>
            {/* X Axis */}
            <XAxis
              dataKey="title"
              interval={0}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              tick={{ fontSize: 12, fill: "#9fb1c7" }}
            />
            {/* Y Axis */}
            <YAxis
              interval={0}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              tick={{ fontSize: 11, fill: "#9fb1c7" }}
              tickFormatter={formatNumber}
            />
            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{ background: "#0f172a", border: "1px solid rgba(0,206,201,0.3)", borderRadius: 12, color: "#ffffff" }}
              formatter={(value) => formatNumber(value)}
            />
            <Legend content={<CustomLegend />} />
            {/* Bar */}
            <Bar dataKey="total_impressions" fill="url(#socialBar)" radius={[6, 6, 0, 0]} name="Count">
              <LabelList
                dataKey="total_impressions"
                position="top"
                fontSize={12}
                fill="white"
                formatter={formatNumber}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartSingle;

/* Custom Legend */
const CustomLegend = () => (
  <div className="flex items-center t-small justify-center gap-2 pt-1">
    <span className="w-[0.9em] h-[0.9em] rounded-sm inline-block" style={{ background: "#5bc7d3" }} />
    <span className="text-muted-2">Impressions</span>
  </div>
);
