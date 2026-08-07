//
import cron from "node-cron";
import { fetchUmangGA4Data, fetchUmangGlobalEmailerData, fetchUmangGoogleAdsData } from "../services/umang.service.js";
import { pool } from "../config/db.js";
import { fetchIntegersGA4Data, fetchIntegersGoogleAdsData } from "../services/integers.service.js";
import { fetchAadarGA4Data, fetchAadarGoogleAdsData } from "../services/aadar.service.js";

const automation = () => {
  console.log("automation started...");
  cron.schedule("*/3 * * * *", async () => {
    console.log("cron started");
    console.log(` Time: ${new Date().toISOString()}`);

    const safeExecute = async (fetchFn, insertQuery, name) => {
      try {
        console.log(` Fetching: ${name}`);
        const result = await fetchFn();

        if (result && result.success) {
          await pool.query(insertQuery, [result]);
          console.log(` ${name} saved successfully`);
          return { success: true, data: result };
        } else {
          const errorMsg = result?.error || "Unknown error";
          console.log(` ${name} failed:`, errorMsg);

          if (result?.error === "REFRESH_TOKEN_EXPIRED" ||
            result?.error === "ACCESS_TOKEN_EXPIRED" ||
            result?.error === "INVALID_API_KEY") {
            console.log(`${name} - Token Expired. Please refresh token.`);
          }

          return { success: false, error: errorMsg };
        }
      } catch (error) {
        console.log(` ${name} error:`, error.message);
        return { success: false, error: error.message };
      }
    };

    await safeExecute(
      fetchUmangGA4Data,
      `INSERT INTO dashboard.umang_global_ga4 (data) VALUES ($1)`,
      "Umang GA4"
    );

    await safeExecute(
      fetchIntegersGA4Data,
      `INSERT INTO dashboard.integers_insights_ga4 (data) VALUES ($1)`,
      "Integers GA4"
    );

    await safeExecute(
      fetchAadarGA4Data,
      `INSERT INTO dashboard.aadar_ga4 (data) VALUES ($1)`,
      "Aadar GA4"
    );

    await safeExecute(
      fetchUmangGoogleAdsData,
      `INSERT INTO dashboard.umang_google_ads (data) VALUES ($1)`,
      "Umang Google Ads"
    );

    await safeExecute(
      fetchIntegersGoogleAdsData,
      `INSERT INTO dashboard.integers_google_ads (data) VALUES ($1)`,
      "Integers Google Ads"
    );

    await safeExecute(
      fetchAadarGoogleAdsData,
      `INSERT INTO dashboard.aadar_google_ads (data) VALUES ($1)`,
      "Aadar Google Ads"
    );

    await safeExecute(
      fetchUmangGlobalEmailerData,
      `INSERT INTO dashboard.umang_emailer (data) VALUES ($1)`,
      "Umang Emailer"
    );
  });
};

export default automation;




// import cron from "node-cron";
// import { fetchUmangGA4Data, fetchUmangGlobalEmailerData, fetchUmangGoogleAdsData } from "../services/umang.service.js";
// import { pool } from "../config/db.js";
// import { fetchIntegersGA4Data, fetchIntegersGoogleAdsData } from "../services/integers.service.js";
// import { fetchAadarGA4Data, fetchAadarGoogleAdsData } from "../services/aadar.service.js";

// const automation = () => {
//     console.log("automation started...");
//     cron.schedule("0 17 * * *", async () => {
//         console.log("cron started");
//         console.log(
//             "Time:",
//             new Date().toLocaleString("en-IN", {
//                 timeZone: "Asia/Kolkata",
//             })
//         );

//         const safeExecute = async (fetchFn, insertQuery, name) => {
//             try {
//                 console.log(` Fetching: ${name}`);
//                 const result = await fetchFn();

//                 if (result && result.success) {
//                     await pool.query(insertQuery, [result]);
//                     console.log(` ${name} saved successfully`);
//                     return { success: true, data: result };
//                 } else {
//                     const errorMsg = result?.error || "Unknown error";
//                     console.log(` ${name} failed:`, errorMsg);

//                     if (result?.error === "REFRESH_TOKEN_EXPIRED" ||
//                         result?.error === "ACCESS_TOKEN_EXPIRED" ||
//                         result?.error === "INVALID_API_KEY") {
//                         console.log(`${name} - Token Expired. Please refresh token.`);
//                     }

//                     return { success: false, error: errorMsg };
//                 }
//             } catch (error) {
//                 console.log(` ${name} error:`, error.message);
//                 return { success: false, error: error.message };
//             }
//         };

//         await safeExecute(
//             fetchUmangGA4Data,
//             `INSERT INTO dashboard.umang_global_ga4 (data) VALUES ($1)`,
//             "Umang GA4"
//         );

//         await safeExecute(
//             fetchIntegersGA4Data,
//             `INSERT INTO dashboard.integers_insights_ga4 (data) VALUES ($1)`,
//             "Integers GA4"
//         );

//         await safeExecute(
//             fetchAadarGA4Data,
//             `INSERT INTO dashboard.aadar_ga4 (data) VALUES ($1)`,
//             "Aadar GA4"
//         );

//         await safeExecute(
//             fetchUmangGoogleAdsData,
//             `INSERT INTO dashboard.umang_google_ads (data) VALUES ($1)`,
//             "Umang Google Ads"
//         );

//         await safeExecute(
//             fetchIntegersGoogleAdsData,
//             `INSERT INTO dashboard.integers_google_ads (data) VALUES ($1)`,
//             "Integers Google Ads"
//         );

//         await safeExecute(
//             fetchAadarGoogleAdsData,
//             `INSERT INTO dashboard.aadar_google_ads (data) VALUES ($1)`,
//             "Aadar Google Ads"
//         );

//         await safeExecute(
//             fetchUmangGlobalEmailerData,
//             `INSERT INTO dashboard.umang_emailer (data) VALUES ($1)`,
//             "Umang Emailer"
//         );
//     },
//         {
//             timezone: "Asia/Kolkata",
//         }
//     );
// };

// export default automation;
