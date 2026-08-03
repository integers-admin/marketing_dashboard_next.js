// aadar GA4
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { GoogleAdsApi } from "google-ads-api";

const credential = process.env.GOOGLE_APPLICATION_CREDENTIALS_AADAR;

if (!credential) {
  throw new Error(
    "GOOGLE_APPLICATION_CREDENTIALS_AADAR is not set."
  );
}

let analyticsDataClient;

try {
  const config = credential.trim().startsWith("{")
    ? {
        credentials: JSON.parse(credential),
      }
    : {
        keyFilename: credential,
      };

  analyticsDataClient = new BetaAnalyticsDataClient(config);
} catch (error) {
  throw new Error(
    `Failed to initialize GA4 client: ${error.message}`
  );
}

export const fetchAadarGA4Data = async () => {
  try {
    const properties = [
      { id: "545808772", name: "aadar-website" },
    ];

    const today = new Date();

    const currentMonthStart = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
    const currentMonthEnd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthStart = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}-01`;
    const lastMonthEnd = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}-${String(new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0).getDate()).padStart(2, "0")}`;

    const results = [];

    for (const prop of properties) {
      try {
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${prop.id}`,
          dateRanges: [
            { startDate: currentMonthStart, endDate: currentMonthEnd },
            { startDate: lastMonthStart, endDate: lastMonthEnd },
          ],
          metrics: [
            { name: "activeUsers" },
            { name: "newUsers" },
            { name: "bounceRate" },
            { name: "userEngagementDuration" },
            { name: "sessions" },
          ],
        });

        let currentMonthClicks = 0;
        let lastMonthClicks = 0;

        const clickEventNames = ["click", "button_click", "link_click", "cta_click"];
        let foundClickEvent = null;

        for (const eventName of clickEventNames) {
          try {
            const [currentClickResponse] = await analyticsDataClient.runReport({
              property: `properties/${prop.id}`,
              dateRanges: [{ startDate: currentMonthStart, endDate: currentMonthEnd }],
              metrics: [{ name: "eventCount" }],
              dimensionFilter: {
                filter: {
                  fieldName: "eventName",
                  stringFilter: { matchType: "EXACT", value: eventName },
                },
              },
            });

            const [lastClickResponse] = await analyticsDataClient.runReport({
              property: `properties/${prop.id}`,
              dateRanges: [{ startDate: lastMonthStart, endDate: lastMonthEnd }],
              metrics: [{ name: "eventCount" }],
              dimensionFilter: {
                filter: {
                  fieldName: "eventName",
                  stringFilter: { matchType: "EXACT", value: eventName },
                },
              },
            });

            const currentClicks = Number(currentClickResponse.rows?.[0]?.metricValues?.[0]?.value || 0);
            const lastClicks = Number(lastClickResponse.rows?.[0]?.metricValues?.[0]?.value || 0);

            if (currentClicks > 0 || lastClicks > 0) {
              currentMonthClicks = currentClicks;
              lastMonthClicks = lastClicks;
              foundClickEvent = eventName;
              break;
            }
          } catch (error) {
            continue;
          }
        }

        let currentMonthUsers = 0;
        let lastMonthUsers = 0;
        let currentMonthNewUsers = 0;
        let lastMonthNewUsers = 0;
        let currentMonthBounceRate = 0;
        let lastMonthBounceRate = 0;
        let currentMonthAvgEngagementTime = 0;
        let lastMonthAvgEngagementTime = 0;

        if (response.rows && response.rows.length > 0) {
          response.rows.forEach((row, index) => {
            const range = row.dimensionValues?.[0]?.value || (index === 0 ? "date_range_0" : "date_range_1");

            const activeUsers = Number(row.metricValues?.[0]?.value || 0);
            const newUsers = Number(row.metricValues?.[1]?.value || 0);
            const bounceRate = Number(row.metricValues?.[2]?.value || 0);
            const engagementDuration = Number(row.metricValues?.[3]?.value || 0);
            const sessions = Number(row.metricValues?.[4]?.value || 0);

            const avgEngagementTime = sessions > 0 ? engagementDuration / sessions : 0;

            if (range === "date_range_0") {
              currentMonthUsers = activeUsers;
              currentMonthNewUsers = newUsers;
              currentMonthBounceRate = bounceRate;
              currentMonthAvgEngagementTime = avgEngagementTime;
            } else if (range === "date_range_1") {
              lastMonthUsers = activeUsers;
              lastMonthNewUsers = newUsers;
              lastMonthBounceRate = bounceRate;
              lastMonthAvgEngagementTime = avgEngagementTime;
            }
          });
        } else {
          console.log(`No main metrics rows found for ${prop.name}`);
        }

        const safePercentage = (current, last) => {
          if (last === 0 && current === 0) return 0;
          if (last === 0) return current > 0 ? 100 : 0;
          return ((current - last) / last) * 100;
        };

        const userChange = safePercentage(currentMonthUsers, lastMonthUsers);
        const newUserChange = safePercentage(currentMonthNewUsers, lastMonthNewUsers);
        const bounceRateChange = safePercentage(currentMonthBounceRate, lastMonthBounceRate);
        const avgEngagementTimeChange = safePercentage(currentMonthAvgEngagementTime, lastMonthAvgEngagementTime);
        const clickChange = safePercentage(currentMonthClicks, lastMonthClicks);

        const result = {
          name: prop.name,
          propertyId: prop.id,
          currentMonth: {
            activeUsers: currentMonthUsers,
            newUsers: currentMonthNewUsers,
            clicks: currentMonthClicks,
            bounceRate: parseFloat((currentMonthBounceRate * 100).toFixed(2)),
            averageEngagementTime: parseFloat(currentMonthAvgEngagementTime.toFixed(2)),
          },
          lastMonth: {
            activeUsers: lastMonthUsers,
            newUsers: lastMonthNewUsers,
            clicks: lastMonthClicks,
            bounceRate: parseFloat((lastMonthBounceRate * 100).toFixed(2)),
            averageEngagementTime: parseFloat(lastMonthAvgEngagementTime.toFixed(2)),
          },
          changes: {
            activeUsers: parseFloat(userChange.toFixed(2)),
            newUsers: parseFloat(newUserChange.toFixed(2)),
            clicks: parseFloat(clickChange.toFixed(2)),
            bounceRate: parseFloat(bounceRateChange.toFixed(2)),
            averageEngagementTime: parseFloat(avgEngagementTimeChange.toFixed(2)),
          },
          status: userChange >= 0 ? "up" : "down",
        };

        results.push(result);
      } catch (error) {
        console.log(`Error fetching data for ${prop.name}:`, error.message);
        results.push({
          name: prop.name,
          propertyId: prop.id,
          error: error.message,
          status: "error",
          currentMonth: {
            activeUsers: 0,
            newUsers: 0,
            clicks: 0,
            bounceRate: 0,
            averageEngagementTime: 0,
          },
          lastMonth: {
            activeUsers: 0,
            newUsers: 0,
            clicks: 0,
            bounceRate: 0,
            averageEngagementTime: 0,
          },
          changes: {
            activeUsers: 0,
            newUsers: 0,
            clicks: 0,
            bounceRate: 0,
            averageEngagementTime: 0,
          },
        });
      }
    }
    return {
      success: true,
      data: results,
    };

  } catch (err) {
    console.log("Error:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};

// google ads
export const fetchAadarGoogleAdsData = async () => {
  try {
    console.log("Fetching Aadar Google Ads data...");

    if (!process.env.GOOGLE_ADS_REFRESH_TOKEN) {
      console.log("Google Ads refresh token missing.");
      return {
        success: false,
        message: "Refresh token not found in env.",
        data: null
      };
    }

    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    });

    let customer;
    try {
      customer = client.Customer({
        customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID_AADAR,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
        login_customer_id: process.env.GOOGLE_ADS_MANAGER_CUSTOMER_ID,
      });
    } catch (initError) {
      console.log(" Google Ads Token Error:", initError.message);

      if (initError.message?.includes('invalid_grant') ||
        initError.message?.includes('Token has been expired') ||
        initError.message?.includes('refresh_token')) {
        return {
          success: false,
          message: "Google Ads refresh token has expired. Please generate a new one.",
          data: null
        };
      }

      return {
        success: false,
        message: initError.message || "Failed to initialize Google Ads customer",
        data: null
      };
    }

    const today = new Date();
    const currentMonthStart = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
    const currentMonthEnd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthStart = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}-01`;
    const lastMonthEnd = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}-${String(new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0).getDate()).padStart(2, "0")}`;

    let currentResponse;
    try {
      currentResponse = await customer.query(`
        SELECT metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.engagements
        FROM campaign
        WHERE segments.date BETWEEN '${currentMonthStart}' AND '${currentMonthEnd}'
      `);
    } catch (queryError) {
      console.log(" Current month query failed:", queryError.message);

      if (queryError.message?.includes('invalid_grant') ||
        queryError.message?.includes('Token has been expired')) {
        console.log(" Token expired during query!");
        return {
          success: false,
          message: "Token expired while fetching current month data",
          data: null
        };
      }
      throw queryError;
    }

    let lastResponse;
    try {
      lastResponse = await customer.query(`
        SELECT metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.engagements
        FROM campaign
        WHERE segments.date BETWEEN '${lastMonthStart}' AND '${lastMonthEnd}'
      `);
    } catch (queryError) {
      console.log(" Last month query failed:", queryError.message);

      if (queryError.message?.includes('invalid_grant') ||
        queryError.message?.includes('Token has been expired')) {
        console.log(" Token expired during query!");
        return {
          success: false,
          message: "Token expired while fetching last month data",
          data: null
        };
      }
      throw queryError;
    }

    let currentImpressions = 0, currentClicks = 0, currentCost = 0, currentEngagements = 0;
    if (currentResponse && currentResponse.length > 0) {
      currentResponse.forEach(row => {
        currentImpressions += row.metrics?.impressions || 0;
        currentClicks += row.metrics?.clicks || 0;
        currentCost += (row.metrics?.cost_micros || 0) / 1000000;
        currentEngagements += row.metrics?.engagements || 0;
      });
    }

    let lastImpressions = 0, lastClicks = 0, lastCost = 0, lastEngagements = 0;
    if (lastResponse && lastResponse.length > 0) {
      lastResponse.forEach(row => {
        lastImpressions += row.metrics?.impressions || 0;
        lastClicks += row.metrics?.clicks || 0;
        lastCost += (row.metrics?.cost_micros || 0) / 1000000;
        lastEngagements += row.metrics?.engagements || 0;
      });
    }

    const currentCTR = currentImpressions > 0 ? (currentClicks / currentImpressions) * 100 : 0;
    const lastCTR = lastImpressions > 0 ? (lastClicks / lastImpressions) * 100 : 0;

    const safeChange = (current, last) => {
      if (last === 0 && current === 0) return 0;
      if (last === 0) return current > 0 ? 100 : 0;
      return ((current - last) / Math.abs(last)) * 100;
    };

    const spendChange = safeChange(currentCost, lastCost);
    const impressionsChange = safeChange(currentImpressions, lastImpressions);
    const ctrChange = safeChange(currentCTR, lastCTR);
    const engagementsChange = safeChange(currentEngagements, lastEngagements);

    const responseData = {
      success: true,
      data: {
        summary: {
          currentMonth: {
            spend: parseFloat(currentCost.toFixed(2)),
            impressions: currentImpressions,
            ctr: parseFloat(currentCTR.toFixed(2)),
            engagements: currentEngagements,
          },
          lastMonth: {
            spend: parseFloat(lastCost.toFixed(2)),
            impressions: lastImpressions,
            ctr: parseFloat(lastCTR.toFixed(2)),
            engagements: lastEngagements,
          },
          changes: {
            spend: parseFloat(spendChange.toFixed(2)),
            impressions: parseFloat(impressionsChange.toFixed(2)),
            ctr: parseFloat(ctrChange.toFixed(2)),
            engagements: parseFloat(engagementsChange.toFixed(2)),
          },
        },
      },
    };

    console.log("Aadar Google Ads Data fetched successfully");
    return responseData;

  } catch (error) {
    console.log("Google Ads Error:", error.message);
    const errorResponse = {
      success: false,
      message: "Check your credentials and permissions",
      data: null
    };

    return errorResponse;
  }
};