// // "use client"
// // import { useEffect, useState } from "react";
// // import toast from 'react-hot-toast';
// // import { backend_url } from "../URL";

// // const KPI = () => {

// //   const [totalLeads, setTotalLeads] = useState(null);
// //   const [ltotalLeads, setLTotalLeads] = useState(null);
// //   const [bestCompany, setBestCompany] = useState(null);
// //   const [bestProduct, setBestProduct] = useState(null);
// //   const [revenue, setRevenue] = useState(null);
// //   const [company, setCompany] = useState([]);

// //   const getKPIData = async () => {
// //     try {
// //       let [totalLeadsRes, ltotalLeadsRes, bestCompanyRes, bestProductRes, revenueRes, companyRes] = await Promise.allSettled([
// //         fetch(`${backend_url}/analyze/leads/current-month`),
// //         fetch(`${backend_url}/analyze/leads/previous-month`),
// //         fetch(`${backend_url}/analyze/leads/top-company/current-month`),
// //         fetch(`${backend_url}/analyze/leads/top-product/current-month`),
// //         fetch(`${backend_url}/analyze/leads/top-product/current-month`),  // revenue
// //         fetch(`${backend_url}/analyze/leads/industries/current-month`),
// //       ]);

// //       // 1
// //       if (totalLeadsRes.status === "fulfilled") {
// //         const totalLeadsData = await totalLeadsRes.value.json();
// //         // console.log("totalLeadsData", totalLeadsData);
// //         setTotalLeads(totalLeadsData?.total_leads ?? null);
// //       }
// //       else {
// //         // console.log("totalLeads api failed...");
// //         toast.error('totalLeads api failed...',{duration:3000,position:"bottom-right"});
// //       }

// //       // 2
// //       if (ltotalLeadsRes.status === "fulfilled") {
// //         const ltotalLeadsData = await ltotalLeadsRes.value.json();
// //         // console.log("ltotalLeadsData", ltotalLeadsData);
// //         setLTotalLeads(ltotalLeadsData?.total_leads ?? null);
// //       }
// //       else {
// //        // console.log("ltotalLeads api failed...");
// //         toast.error('last totalLeads api failed...',{duration:3000,position:"bottom-right"});
// //       }

// //       // 3
// //       if (bestCompanyRes.status === "fulfilled") {
// //         const bestCompanyData = await bestCompanyRes.value.json();
// //         // console.log("bestCompanyData", bestCompanyData);
// //         setBestCompany(bestCompanyData?.company_account ?? null);
// //       }
// //       else {
// //         // console.log("bestCompany api failed...");
// //         toast.error('bestCompany api failed...',{duration:3000,position:"bottom-right"});
// //       }

// //       // 4
// //       if (bestProductRes.status === "fulfilled") {
// //         const bestProductData = await bestProductRes.value.json();
// //         // console.log("bestProductData", bestProductData);
// //         setBestProduct(bestProductData?.product_of_interest ?? null);
// //       }
// //       else {
// //         // console.log("bestProduct api failed...");
// //         toast.error('bestProduct api failed...',{duration:3000,position:"bottom-right"});
// //       }

// //       // 5
// //       if (revenueRes.status === "fulfilled") {
// //         const revenueData = await revenueRes.value.json();
// //         // console.log("revenueData", revenueData);
// //         // setRevenue(revenueData?.product_of_interest ?? null);
// //         setRevenue(null ?? null);  // update revenue API
// //       }
// //       else {
// //         // console.log("revenue api failed...");
// //         toast.error('revenue api failed...',{duration:3000,position:"bottom-right"});
// //       }

// //       // 6
// //       if (companyRes.status === "fulfilled") {
// //         const companyData = await companyRes.value.json();
// //         // console.log("companyData", companyData);
// //         setCompany(companyData?.industries);
// //       }
// //       else {
// //         // console.log("company api failed...");
// //         toast.error('company api failed...',{duration:3000,position:"bottom-right"});
// //       }

// //     }
// //     catch (err) {
// //       // console.log("something went wrong...");
// //       toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
// //     }
// //   }

// //   useEffect(() => {
// //     getKPIData();
// //   }, []);

// //   // trend of current vs last month leads
// //   const delta =
// //     totalLeads != null && ltotalLeads != null && Number(ltotalLeads) > 0
// //       ? ((Number(totalLeads) - Number(ltotalLeads)) / Number(ltotalLeads)) * 100
// //       : null;
// //   const up = delta != null && delta >= 0;

// //   const industries = [
// //     { color: "#4b7bf5", label: "P. Care", val: company[3]?.lead_count },
// //     { color: "#ff6caf", label: "Nutra", val: company[0]?.lead_count },
// //     { color: "#04c56b", label: "Pharma", val: company[1]?.lead_count },
// //     { color: "#00b6cc", label: "Other", val: company[2]?.lead_count },
// //     { color: "#ffcc00", label: "F & B", val: company[4]?.lead_count },
// //   ];

// //   return (
// //     <div className="dark h-full rounded-2xl flex flex-col min-h-0 overflow-hidden p-[clamp(0.6rem,0.9vw,1.6rem)] gap-[clamp(0.5rem,0.8vw,1.4rem)]">

// //       {/* ===== Hero: Total Leads ===== */}
// //       <div className="shrink-0">
// //         <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Leads</span>
// //         <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
// //           <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{totalLeads ?? "--"}</span>
// //           {delta != null && (
// //             <span
// //               className={`t-small font-bold px-[0.6em] py-[0.15em] rounded-full mb-[0.2em] ${
// //                 up ? "text-emerald-300 bg-emerald-400/15" : "text-rose-300 bg-rose-400/15"
// //               }`}
// //             >
// //               {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
// //             </span>
// //           )}
// //         </div>
// //         <span className="t-small text-muted-2">
// //           vs last month <span className="font-bold text-strong">{ltotalLeads ?? "--"}</span>
// //         </span>
// //       </div>

// //       {/* ===== This month's wins ===== */}
// //       <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
// //         <WinRow label="Best Company" val={bestCompany ?? "--"} accent="#22d3ee" />
// //         <WinRow label="Best Product" val={bestProduct ?? "--"} accent="#a78bfa" />
// //         <WinRow label="Revenue Generated" val={revenue != null ? `₹${revenue}` : "--"} accent="#fbbf24" big />
// //       </div>

// //       {/* ===== Leads by industry ===== */}
// //       <div className="shrink-0">
// //         <span className="t-small text-muted-2 font-semibold uppercase tracking-widest">Leads by Industry</span>
// //         <div className="grid grid-cols-5 gap-[clamp(0.2rem,0.4vw,0.6rem)] mt-[clamp(0.3rem,0.5vw,0.8rem)]">
// //           {industries.map((it, i) => (
// //             <div
// //               key={i}
// //               className="stat-chip dark-card rounded-xl flex flex-col items-center justify-center gap-3 py-[clamp(0.3rem,0.5vw,0.9rem)] px-0.5"
// //               style={{ color: it.color }}
// //             >
// //               <span
// //                 className="rounded-full h-[clamp(0.7rem,0.9vw,1.5rem)] w-[clamp(0.7rem,0.9vw,1.5rem)]"
// //                 style={{ background: it.color, boxShadow: `0 0 8px ${it.color}cc` }}
// //               />
// //               <span className="t-body font-extrabold text-strong text-center leading-none">{it.val ?? "--"}</span>
// //               {/* <span className="t-micro text-muted-2 text-center leading-none truncate max-w-full">{it.label}</span> */}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default KPI;


// // // const WinRow = ({ label, val, accent = "#34d399", big }) => {
// // //   return (
// // //     <div className="dark-card rounded-xl flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
// // //       style={{ borderLeftColor: accent }}>
// // //       <div className="flex items-center gap-2">
// // //         <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
// // //           style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} />
// // //         <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
// // //       </div>
// // //       <span className={`${big ? "t-value gradient-emerald" : "t-body text-strong"} font-extrabold count-pop break-words leading-tight mt-[0.15em]`}>
// // //         {val}
// // //       </span>
// // //     </div>
// // //   );
// // // };



// // const WinRow = ({ label, val, accent = "#34d399", big }) => {
// //   return (
// //     <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
// //       style={{ borderLeftColor: accent }}>
// //       <div className="flex items-center gap-4">
// //         {/* <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
// //           style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} /> */}
// //         <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>

// //         <span className={` font-bold count-pop break-words leading-tight mt-[0.15em]`}>
// //         {/* {val} */}
// //         00
// //       </span>
// //       </div>

// //     </div>
// //   );
// // };






// "use client"
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const KPI = () => {

//   const [totalLeads, setTotalLeads] = useState(null);
//   const [ltotalLeads, setLTotalLeads] = useState(null);
//   const [bestCompany, setBestCompany] = useState(null);
//   const [bestProduct, setBestProduct] = useState(null);
//   const [revenue, setRevenue] = useState(null);
//   const [company, setCompany] = useState([]);

//   const getKPIData = async () => {
//     try {
//       let [totalLeadsRes, ltotalLeadsRes, bestCompanyRes, bestProductRes, revenueRes, companyRes] = await Promise.allSettled([
//         fetch(`${backend_url}/analyze/leads/current-month`),
//         fetch(`${backend_url}/analyze/leads/previous-month`),
//         fetch(`${backend_url}/analyze/leads/top-company/current-month`),
//         fetch(`${backend_url}/analyze/leads/top-product/current-month`),
//         fetch(`${backend_url}/analyze/leads/top-product/current-month`),  // revenue
//         fetch(`${backend_url}/analyze/leads/industries/current-month`),
//       ]);

//       // 1
//       if (totalLeadsRes.status === "fulfilled") {
//         const totalLeadsData = await totalLeadsRes.value.json();
//         // console.log("totalLeadsData", totalLeadsData);
//         setTotalLeads(totalLeadsData?.total_leads ?? null);
//       }
//       else {
//         // console.log("totalLeads api failed...");
//         toast.error('totalLeads api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 2
//       if (ltotalLeadsRes.status === "fulfilled") {
//         const ltotalLeadsData = await ltotalLeadsRes.value.json();
//         // console.log("ltotalLeadsData", ltotalLeadsData);
//         setLTotalLeads(ltotalLeadsData?.total_leads ?? null);
//       }
//       else {
//        // console.log("ltotalLeads api failed...");
//         toast.error('last totalLeads api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 3
//       if (bestCompanyRes.status === "fulfilled") {
//         const bestCompanyData = await bestCompanyRes.value.json();
//         // console.log("bestCompanyData", bestCompanyData);
//         setBestCompany(bestCompanyData?.company_account ?? null);
//       }
//       else {
//         // console.log("bestCompany api failed...");
//         toast.error('bestCompany api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 4
//       if (bestProductRes.status === "fulfilled") {
//         const bestProductData = await bestProductRes.value.json();
//         // console.log("bestProductData", bestProductData);
//         setBestProduct(bestProductData?.product_of_interest ?? null);
//       }
//       else {
//         // console.log("bestProduct api failed...");
//         toast.error('bestProduct api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 5
//       if (revenueRes.status === "fulfilled") {
//         const revenueData = await revenueRes.value.json();
//         // console.log("revenueData", revenueData);
//         // setRevenue(revenueData?.product_of_interest ?? null);
//         setRevenue(null ?? null);  // update revenue API
//       }
//       else {
//         // console.log("revenue api failed...");
//         toast.error('revenue api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 6
//       if (companyRes.status === "fulfilled") {
//         const companyData = await companyRes.value.json();
//         // console.log("companyData", companyData);
//         setCompany(companyData?.industries);
//       }
//       else {
//         // console.log("company api failed...");
//         toast.error('company api failed...',{duration:3000,position:"bottom-right"});
//       }

//     }
//     catch (err) {
//       // console.log("something went wrong...");
//       toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//     }
//   }

//   useEffect(() => {
//     getKPIData();
//   }, []);

//   // trend of current vs last month leads
//   const delta =
//     totalLeads != null && ltotalLeads != null && Number(ltotalLeads) > 0
//       ? ((Number(totalLeads) - Number(ltotalLeads)) / Number(ltotalLeads)) * 100
//       : null;
//   const up = delta != null && delta >= 0;

//   const industries = [
//     { color: "#4b7bf5", label: "P. Care", val: company[3]?.lead_count },
//     { color: "#ff6caf", label: "Nutra", val: company[0]?.lead_count },
//     { color: "#04c56b", label: "Pharma", val: company[1]?.lead_count },
//     { color: "#00b6cc", label: "Other", val: company[2]?.lead_count },
//     { color: "#ffcc00", label: "F & B", val: company[4]?.lead_count },
//   ];

//   return (
//     <div className="dark h-full rounded-2xl flex flex-col min-h-0 overflow-hidden p-[clamp(0.6rem,0.9vw,1.6rem)] gap-[clamp(0.5rem,0.8vw,1.4rem)]">

//       {/* ===== Hero: Total Leads ===== */}
//       <div className="shrink-0">
//         <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Leads</span>
//         {/* <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap"> */}
//           <p className="t-value-xl font-black gradient-emerald count-pop leading-none">{totalLeads ?? "00"}</p>
//         {/* </div> */}
//         <span className="t-small text-muted-2">
//           vs last month <span className="font-bold text-strong">{ltotalLeads ?? "00"}</span>
//         </span>
//       </div>

//       {/* ===== This month's wins ===== */}
//       <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
//         <WinRow label="Best Company" val={bestCompany ?? "--"} accent="#22d3ee" />
//         <WinRow label="Best Product" val={bestProduct ?? "--"} accent="#a78bfa" />
//         <WinRow label="Revenue Generated" val={revenue != null ? `₹${revenue}` : "--"} accent="#fbbf24" big />
//       </div>

//       {/* ===== Leads by industry ===== */}
//       <div className="shrink-0">
//         <span className="t-small text-muted-2 font-semibold uppercase tracking-widest">Leads by Industry</span>
//         <div className="grid grid-cols-5 gap-[clamp(0.2rem,0.4vw,0.6rem)] mt-[clamp(0.3rem,0.5vw,0.8rem)]">
//           {industries.map((it, i) => (
//             <div
//               key={i}
//               className="stat-chip dark-card rounded-xl flex flex-col items-center justify-center gap-3 py-[clamp(0.3rem,0.5vw,0.9rem)] px-0.5"
//               style={{ color: it.color }}
//             >
//               <span
//                 className="rounded-full h-[clamp(0.7rem,0.9vw,1.5rem)] w-[clamp(0.7rem,0.9vw,1.5rem)]"
//                 style={{ background: it.color, boxShadow: `0 0 8px ${it.color}cc` }}
//               />
//               <span className="t-body font-extrabold text-strong text-center leading-none">{it.val ?? "--"}</span>
//               {/* <span className="t-micro text-muted-2 text-center leading-none truncate max-w-full">{it.label}</span> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KPI;


// // const WinRow = ({ label, val, accent = "#34d399", big }) => {
// //   return (
// //     <div className="dark-card rounded-xl flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
// //       style={{ borderLeftColor: accent }}>
// //       <div className="flex items-center gap-2">
// //         <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
// //           style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} />
// //         <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
// //       </div>
// //       <span className={`${big ? "t-value gradient-emerald" : "t-body text-strong"} font-extrabold count-pop break-words leading-tight mt-[0.15em]`}>
// //         {val}
// //       </span>
// //     </div>
// //   );
// // };



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





// "use client"
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const KPI = () => {

//   const [totalLeads, setTotalLeads] = useState(null);
//   const [ltotalLeads, setLTotalLeads] = useState(null);
//   const [bestCompany, setBestCompany] = useState(null);
//   const [bestProduct, setBestProduct] = useState(null);
//   const [revenue, setRevenue] = useState(null);
//   const [company, setCompany] = useState([]);

//   const getKPIData = async () => {
//     try {
//       let [totalLeadsRes, ltotalLeadsRes, bestCompanyRes, bestProductRes, revenueRes, companyRes] = await Promise.allSettled([
//         fetch(`${backend_url}/analyze/leads/current-month`),
//         fetch(`${backend_url}/analyze/leads/previous-month`),
//         fetch(`${backend_url}/analyze/leads/top-company/current-month`),
//         fetch(`${backend_url}/analyze/leads/top-product/current-month`),
//         fetch(`${backend_url}/analyze/leads/top-product/current-month`),  // revenue
//         fetch(`${backend_url}/analyze/leads/industries/current-month`),
//       ]);

//       // 1
//       if (totalLeadsRes.status === "fulfilled") {
//         const totalLeadsData = await totalLeadsRes.value.json();
//         // console.log("totalLeadsData", totalLeadsData);
//         setTotalLeads(totalLeadsData?.total_leads ?? null);
//       }
//       else {
//         // console.log("totalLeads api failed...");
//         toast.error('totalLeads api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 2
//       if (ltotalLeadsRes.status === "fulfilled") {
//         const ltotalLeadsData = await ltotalLeadsRes.value.json();
//         // console.log("ltotalLeadsData", ltotalLeadsData);
//         setLTotalLeads(ltotalLeadsData?.total_leads ?? null);
//       }
//       else {
//        // console.log("ltotalLeads api failed...");
//         toast.error('last totalLeads api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 3
//       if (bestCompanyRes.status === "fulfilled") {
//         const bestCompanyData = await bestCompanyRes.value.json();
//         // console.log("bestCompanyData", bestCompanyData);
//         setBestCompany(bestCompanyData?.company_account ?? null);
//       }
//       else {
//         // console.log("bestCompany api failed...");
//         toast.error('bestCompany api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 4
//       if (bestProductRes.status === "fulfilled") {
//         const bestProductData = await bestProductRes.value.json();
//         // console.log("bestProductData", bestProductData);
//         setBestProduct(bestProductData?.product_of_interest ?? null);
//       }
//       else {
//         // console.log("bestProduct api failed...");
//         toast.error('bestProduct api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 5
//       if (revenueRes.status === "fulfilled") {
//         const revenueData = await revenueRes.value.json();
//         // console.log("revenueData", revenueData);
//         // setRevenue(revenueData?.product_of_interest ?? null);
//         setRevenue(null ?? null);  // update revenue API
//       }
//       else {
//         // console.log("revenue api failed...");
//         toast.error('revenue api failed...',{duration:3000,position:"bottom-right"});
//       }

//       // 6
//       if (companyRes.status === "fulfilled") {
//         const companyData = await companyRes.value.json();
//         // console.log("companyData", companyData);
//         setCompany(companyData?.industries);
//       }
//       else {
//         // console.log("company api failed...");
//         toast.error('company api failed...',{duration:3000,position:"bottom-right"});
//       }

//     }
//     catch (err) {
//       // console.log("something went wrong...");
//       toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//     }
//   }

//   useEffect(() => {
//     getKPIData();
//   }, []);

//   // trend of current vs last month leads
//   const delta =
//     totalLeads != null && ltotalLeads != null && Number(ltotalLeads) > 0
//       ? ((Number(totalLeads) - Number(ltotalLeads)) / Number(ltotalLeads)) * 100
//       : null;
//   const up = delta != null && delta >= 0;

//   const industries = [
//     { color: "#4b7bf5", label: "P. Care", val: company[3]?.lead_count },
//     { color: "#ff6caf", label: "Nutra", val: company[0]?.lead_count },
//     { color: "#04c56b", label: "Pharma", val: company[1]?.lead_count },
//     { color: "#00b6cc", label: "Other", val: company[2]?.lead_count },
//     { color: "#ffcc00", label: "F & B", val: company[4]?.lead_count },
//   ];

//   return (
//     <div className="dark h-full rounded-2xl flex flex-col min-h-0 overflow-hidden p-[clamp(0.6rem,0.9vw,1.6rem)] gap-[clamp(0.5rem,0.8vw,1.4rem)]">

//       {/* ===== Hero: Total Leads ===== */}
//       <div className="shrink-0">
//         <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Leads</span>
//         <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap">
//           <span className="t-value-xl font-black gradient-emerald count-pop leading-none">{totalLeads ?? "--"}</span>
//           {delta != null && (
//             <span
//               className={`t-small font-bold px-[0.6em] py-[0.15em] rounded-full mb-[0.2em] ${
//                 up ? "text-emerald-300 bg-emerald-400/15" : "text-rose-300 bg-rose-400/15"
//               }`}
//             >
//               {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
//             </span>
//           )}
//         </div>
//         <span className="t-small text-muted-2">
//           vs last month <span className="font-bold text-strong">{ltotalLeads ?? "--"}</span>
//         </span>
//       </div>

//       {/* ===== This month's wins ===== */}
//       <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
//         <WinRow label="Best Company" val={bestCompany ?? "--"} accent="#22d3ee" />
//         <WinRow label="Best Product" val={bestProduct ?? "--"} accent="#a78bfa" />
//         <WinRow label="Revenue Generated" val={revenue != null ? `₹${revenue}` : "--"} accent="#fbbf24" big />
//       </div>

//       {/* ===== Leads by industry ===== */}
//       <div className="shrink-0">
//         <span className="t-small text-muted-2 font-semibold uppercase tracking-widest">Leads by Industry</span>
//         <div className="grid grid-cols-5 gap-[clamp(0.2rem,0.4vw,0.6rem)] mt-[clamp(0.3rem,0.5vw,0.8rem)]">
//           {industries.map((it, i) => (
//             <div
//               key={i}
//               className="stat-chip dark-card rounded-xl flex flex-col items-center justify-center gap-3 py-[clamp(0.3rem,0.5vw,0.9rem)] px-0.5"
//               style={{ color: it.color }}
//             >
//               <span
//                 className="rounded-full h-[clamp(0.7rem,0.9vw,1.5rem)] w-[clamp(0.7rem,0.9vw,1.5rem)]"
//                 style={{ background: it.color, boxShadow: `0 0 8px ${it.color}cc` }}
//               />
//               <span className="t-body font-extrabold text-strong text-center leading-none">{it.val ?? "--"}</span>
//               {/* <span className="t-micro text-muted-2 text-center leading-none truncate max-w-full">{it.label}</span> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KPI;


// // const WinRow = ({ label, val, accent = "#34d399", big }) => {
// //   return (
// //     <div className="dark-card rounded-xl flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
// //       style={{ borderLeftColor: accent }}>
// //       <div className="flex items-center gap-2">
// //         <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
// //           style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} />
// //         <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
// //       </div>
// //       <span className={`${big ? "t-value gradient-emerald" : "t-body text-strong"} font-extrabold count-pop break-words leading-tight mt-[0.15em]`}>
// //         {val}
// //       </span>
// //     </div>
// //   );
// // };



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








const KPI = ({ umangLeadsData,revenueGenerated }) => {

  const industries = [
    { color: "#4b7bf5", label: "P. Care", val: umangLeadsData?.leads_by_industry[1]?.count },
    { color: "#ff6caf", label: "Nutra", val: umangLeadsData?.leads_by_industry[2]?.count },
    { color: "#04c56b", label: "Pharma", val: umangLeadsData?.leads_by_industry[0]?.count },
    { color: "#ffcc00", label: "Engineering", val: umangLeadsData?.leads_by_industry[3]?.count },
    { color: "#00b6cc", label: "Other", val: umangLeadsData?.leads_by_industry[4]?.count }
  ];

  return (
    <div className="dark h-full rounded-2xl flex flex-col min-h-0 overflow-hidden p-[clamp(0.6rem,0.9vw,1.6rem)] gap-[clamp(0.5rem,0.8vw,1.4rem)]">

      {/* ===== Hero: Total Leads ===== */}
      <div className="shrink-0">
        <span className="t-label text-muted-2 font-semibold uppercase tracking-widest">Total Leads</span>
        {/* <div className="flex items-end gap-[clamp(0.4rem,0.7vw,1.2rem)] mt-1 flex-wrap"> */}
        <p className="t-value-xl font-black gradient-emerald count-pop leading-none">{umangLeadsData?.total_leads ?? "--"}</p>
        {/* </div> */}
        <span className="t-small text-muted-2">
          vs last month <span className="font-bold text-strong">&nbsp;&nbsp;{umangLeadsData?.vs_last_month ?? "--"}</span>
        </span>
      </div>

      {/* ===== This month's wins ===== */}
      <div className="flex-1 flex flex-col gap-[clamp(0.35rem,0.6vw,1rem)] min-h-0">
        {/* <WinRow label="Best Company" val={umangLeadsData?.best_company ?? "--"} accent="#22d3ee" /> */}
        <WinRow label="Best Product" val={umangLeadsData?.best_product ?? "--"} accent="#a78bfa" />
        <WinRow label="Revenue Generated" val={revenueGenerated ?? "--"} accent="#fbbf24" big />
      </div>

      {/* ===== Leads by industry ===== */}
      <div className="shrink-0">
        <span className="t-small text-muted-2 font-semibold uppercase tracking-widest">Leads by Industry</span>
        <div className="grid grid-cols-5 gap-[clamp(0.2rem,0.4vw,0.6rem)] mt-[clamp(0.3rem,0.5vw,0.8rem)]">
          {industries.map((it, i) => (
            <div
              key={i}
              className="stat-chip dark-card rounded-xl flex flex-col items-center justify-center gap-3 py-[clamp(0.3rem,0.5vw,0.9rem)] px-0.5"
              style={{ color: it.color }}
            >
              <span
                className="rounded-full h-[clamp(0.7rem,0.9vw,1.5rem)] w-[clamp(0.7rem,0.9vw,1.5rem)]"
                style={{ background: it.color, boxShadow: `0 0 8px ${it.color}cc` }}
              />
              <span className="t-body font-extrabold text-strong text-center leading-none">{it?.val ?? "--"}</span>
              {/* <span className="t-micro text-muted-2 text-center leading-none truncate max-w-full">{it.label}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPI;


// const WinRow = ({ label, val, accent = "#34d399", big }) => {
//   return (
//     <div className="dark-card rounded-xl flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
//       style={{ borderLeftColor: accent }}>
//       <div className="flex items-center gap-2">
//         <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
//           style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} />
//         <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate">{label}</span>
//       </div>
//       <span className={`${big ? "t-value gradient-emerald" : "t-body text-strong"} font-extrabold count-pop break-words leading-tight mt-[0.15em]`}>
//         {val}
//       </span>
//     </div>
//   );
// };



const WinRow = ({ label, val, accent = "#34d399", big }) => {
  return (
    <div className="dark-card rounded-lg flex-1 min-h-0 flex flex-col justify-center px-[clamp(0.6rem,0.9vw,1.5rem)] py-[clamp(0.3rem,0.5vw,0.8rem)] overflow-hidden border-l-[3px]"
      style={{ borderLeftColor: accent }}>
      <div className="flex flex-col items-center gap-1">
        {/* <span className="rounded-full h-[clamp(0.45rem,0.55vw,0.9rem)] w-[clamp(0.45rem,0.55vw,0.9rem)] shrink-0"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}cc` }} /> */}
        <span className="t-small text-muted-2 font-medium uppercase tracking-wide truncate mt-2">{label}</span>

        <span className={` font-bold count-pop break-words leading-tight mt-[0.15em] mb-2`}>
          {String(val).length > 15
            ? String(val).slice(0, 15) + "..."
            : String(val)}
        </span>
      </div>

    </div>
  );
};

