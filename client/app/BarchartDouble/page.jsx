// "use client"
// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend, Label } from "recharts";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const formatNumber = (value) => {
//   const num = Number(value);
//   if (!num) return "0";
//   if (num >= 1000) return `${Math.floor(num / 1000)}k`;
//   return num.toString();
// };

// const BarChartDouble = () => {

//   const nameShortMap = {
//     "Umang Encapsulation": "Encap",
//     "Umang Engineering": "Engg.",
//     "Umang Global": "UG",
//     "Umang Nutraceuticals": "Nutra",
//     "Umang Particle Science": "PC",
//     "Umang Pharmaceuticals": "Pharma"
//   };

//   const [webData, setWebData] = useState([]);
//   const [activeUser, setActiveUser] = useState(null);

//   const getWebData = async () => {
//     try {
//       const result = await fetch(
//         `${backend_url}/analyze/active-users/umang-websites/monthly-comparison`
//       );
//       const data = await result.json();

//       if (Array.isArray(data?.websites)) {
//         const chartData = data.websites
//           .filter(item => item.id !== "08458e02-892f-40e9-897b-21e750a5d499")
//           .map(itm => ({
//             title: nameShortMap[itm.name] || itm.name,
//             lastMonth: itm.active_users_previous_month,
//             currentMonth: itm.active_users_current_month
//           }));

//         setWebData(chartData);
//       }

//       setActiveUser(data?.total_active_users_current_month ?? null);
//     } catch (err) {
//       // console.log("something went wrong...");
//       toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//     }
//   };

//   useEffect(() => {
//     getWebData();
//   }, []);

//   // console.log("web data ---", webData);

//   return (
//     <div className="dark p-[clamp(0.6rem,0.9vw,1.6rem)] rounded-2xl w-full h-full min-w-0 flex flex-col overflow-hidden">
//       <h2 className="font-semibold mb-2 flex items-center justify-between gap-2">
//         <span className="t-label text-muted-2 uppercase tracking-wide">Active Users</span>
//         <span className="t-value gradient-emerald font-extrabold leading-none">
//           {activeUser != null ? formatNumber(activeUser) : "--"}
//         </span>
//       </h2>

//       <div className="flex-1 min-h-0">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={webData} barCategoryGap="20%">
//           {/* X Axis */}
//           <XAxis
//             dataKey="title"
//             interval={0}
//             tickLine={false}
//             axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
//             tick={{ fontSize: 12, fill: "#9fb1c7" }}
//           />
//           {/* Y Axis */}
//           <YAxis
//             tickLine={false}
//             axisLine={false}
//             tick={{ fontSize: 11, fill: "#9fb1c7" }}
//             tickFormatter={formatNumber}
//           />
//           {/* Tooltip */}
//           <Tooltip
//             cursor={{ fill: "rgba(255,255,255,0.04)" }}
//             contentStyle={{ background: "#0f172a", border: "1px solid rgba(0,206,201,0.3)", borderRadius: 12, color: "#ffffff" }}
//             formatter={(value) => formatNumber(value)}
//           />
//           <Legend content={<CustomLegend />} />
//           {/* Last Month */}
//           <Bar dataKey="lastMonth" fill="#64748b" radius={[6, 6, 0, 0]} name="Last month">
//             <LabelList
//               dataKey="lastMonth"
//               dy={-8}
//               position="top"
//               angle={-90}
//               fontSize={10}
//               fill="white"
//               formatter={formatNumber}
//             />
//           </Bar>
//           {/* Current Month */}
//           <Bar dataKey="currentMonth" fill="#58c09f" radius={[6, 6, 0, 0]} name="Current month">
//             <LabelList
//               dataKey="currentMonth"
//               dy={-8}
//               angle={-90}
//               position="top"
//               fontSize={10}
//               fill="white"
//               formatter={formatNumber}
//             />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default BarChartDouble;

// /* Custom Legend */
// const CustomLegend = () => (
//   <div className="flex gap-[clamp(0.8rem,1.4vw,2.4rem)] t-small justify-center pt-1">
//     <div className="flex items-center gap-2">
//       <span className="w-[0.9em] h-[0.9em] rounded-sm inline-block" style={{ background: "#64748b" }} />
//       <span className="text-muted-2">Last month</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <span className="w-[0.9em] h-[0.9em] rounded-sm inline-block" style={{ background: "#58c09f" }} />
//       <span className="text-muted-2">Current month</span>
//     </div>
//   </div>
// );








"use client"
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend } from "recharts";

// const formatNumber = (value) => {
//   const num = Number(value);
//   if (!num) return "0";
//   if (num >= 1000) return `${Math.floor(num / 1000)}k`;
//   return num.toString();
// };

const formatNumber = (value) => {
  const num = Number(value);

  if (Number.isNaN(num) || num === 0) return "0";

  if (num >= 1000) {
    return `${Math.floor(num / 100) / 10}k`;
  }

  return num.toString();
};

const BarChartDouble = ({umang_GA4Data}) => {

  const nameShortMap = {
    "Encapsulation": "Encap",
    "Umang Engineering": "Engg.",
    "Nutraceuticals": "Nutra",
    "Personal Care": "PC",
    "Pharmaceuticals": "Pharma"
  };

  const [webData, setWebData] = useState([]);

  useEffect(() => {
  if (!Array.isArray(umang_GA4Data) || umang_GA4Data.length === 0) {
    setWebData([]);
    return;
  }

  const chartData = umang_GA4Data.map((item) => ({
    title: nameShortMap[item?.name] || item?.name || "Unknown",
    lastMonth: item?.lastMonth?.activeUsers ?? 0,
    currentMonth: item?.currentMonth?.activeUsers ?? 0
  })); 

  setWebData(chartData);

}, [umang_GA4Data]);

  
  // console.log("web data ---", webData);

  return (
    <div className="dark p-[clamp(0.6rem,0.9vw,1.6rem)] rounded-2xl w-full h-full min-w-0 flex flex-col overflow-hidden">
      <h2 className="font-semibold mb-2">
        <span className="t-label text-muted-2 uppercase tracking-wide">Active Users</span>
        {/* <span className="t-value gradient-emerald font-extrabold leading-none">
          {activeUser != null ? formatNumber(activeUser) : "--"}
        </span> */}
      </h2>

      <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={webData} barCategoryGap="20%">
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
          {/* Last Month */}
          <Bar dataKey="lastMonth" fill="#64748b" radius={[6, 6, 0, 0]} name="Last month">
            <LabelList
              dataKey="lastMonth"
              dy={-8}
              position="top"
              angle={-90}
              fontSize={10}
              fill="white"
              formatter={formatNumber}
            />
          </Bar>
          {/* Current Month */}
          <Bar dataKey="currentMonth" fill="#58c09f" radius={[6, 6, 0, 0]} name="Current month">
            <LabelList
              dataKey="currentMonth"
              dy={-8}
              angle={-90}
              position="top"
              fontSize={10}
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

export default BarChartDouble;

/* Custom Legend */
const CustomLegend = () => (
  <div className="flex gap-[clamp(0.8rem,1.4vw,2.4rem)] t-small justify-center pt-1">
    <div className="flex items-center gap-2">
      <span className="w-[0.9em] h-[0.9em] rounded-sm inline-block" style={{ background: "#64748b" }} />
      <span className="text-muted-2">Last month</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="w-[0.9em] h-[0.9em] rounded-sm inline-block" style={{ background: "#58c09f" }} />
      <span className="text-muted-2">Current month</span>
    </div>
  </div>
);
