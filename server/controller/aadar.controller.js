// GA4
import axios from "axios";
import { pool } from "../config/db.js";

export const getAadarGA4Data = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT data 
      FROM dashboard.aadar_ga4 
      ORDER BY created_at DESC 
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No data found in database",
      });
    }

    const currentMonthData = result?.rows[0]?.data?.data?.[0]?.currentMonth;

    res.json({
      success: true,
      data: currentMonthData,
    });

  } catch (error) {
    console.log("Database Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch data from database",
    });
  }
};

export const getAadarGoogleAdsData = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT data 
      FROM dashboard.aadar_google_ads 
      ORDER BY created_at DESC 
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No data found in database",
      });
    }

    res.json({
      success: true,
      data: result?.rows[0]?.data?.data?.summary?.currentMonth,
    });

  } catch (error) {
    console.log("Database Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch data from database",
    });
  }
};




export const getAadarInstaPostData = async (req, res) => {
  try {
    const { limit = 2 } = req.query;
    const accessToken = process.env.AADAR_ACCESS_TOKEN;

    if (!accessToken) {
      console.log(" Aadar_ACCESS_TOKEN missing.");
      return res.status(400).json({
        success: false,
        message: "Instagram access token not found. Please add Aadar_ACCESS_TOKEN to .env file",
        data: null
      });
    }

    let instagramId = process.env.AADAR_INSTAGRAM_ID;

    if (!instagramId) {
      const userRes = await axios.get(`https://graph.facebook.com/v25.0/me`, {
        params: {
          fields: "instagram_business_account",
          access_token: accessToken,
        },
      });

      instagramId = userRes.data?.instagram_business_account?.id;

      if (!instagramId) {
        return res.status(400).json({
          success: false,
          message: "Instagram Business Account not linked to Facebook Page",
          data: null
        });
      }
    }

    let response;
    try {
      response = await axios.get(
        `https://graph.facebook.com/v25.0/${instagramId}/media`,
        {
          params: {
            fields:
              "id,media_type,media_url",
            limit: parseInt(limit),
            access_token: accessToken,
          },
        }
      );
    } catch (postError) {
      if (postError.response?.status === 401 ||
        postError.response?.data?.error?.message?.includes('expired')) {

        console.log(" Instagram Token Expired!");

        return res.status(401).json({
          success: false,
          message: "Instagram access token expired. Please generate a new one.",
          data: null
        });
      }

      console.log("Instagram API Error:", postError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch Instagram posts",
        details: postError.response?.data || postError.message,
        data: null
      });
    }

    const allPosts = response?.data?.data || [];
    const imagePosts = allPosts.filter(
      (itm) => itm?.media_type?.toUpperCase() === "IMAGE"
    );

    return res.status(200).json({
      success: true,
      data: imagePosts
    });

  } catch (error) {
    console.log(" Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null
    });
  }
};
