import { pool } from "../config/db.js";


export const marketingDashboard = async (req, res) => {
  try {
    const {
      revenueGenerated,
      linkedinUmang,
      facebookUmang,
      youtubeUmang,
      pinterestUmang,
      instagramUmang,
      twitterUmang,
      instagramIntegers,
      youtubeIntegers,
      facebookIntegers,
      linkedinIntegers,
      instagramAadar,
      linkedinAadar,
    } = req.body;

    const query = `
            INSERT INTO dashboard.marketing_dashboard
            (
                revenue_generated,
                linkedin_umang,
                facebook_umang,
                youtube_umang,
                pinterest_umang,
                instagram_umang,
                twitter_umang,
                instagram_integers,
                youtube_integers,
                facebook_integers,
                linkedin_integers,
                instagram_aadar,
                linkedin_aadar
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,
                $7,$8,$9,$10,
                $11,$12,$13
            )
            RETURNING *;
        `;

    const values = [
      Number(revenueGenerated),

      Number(linkedinUmang),
      Number(facebookUmang),
      Number(youtubeUmang),
      Number(pinterestUmang),
      Number(instagramUmang),
      Number(twitterUmang),

      Number(instagramIntegers),
      Number(youtubeIntegers),
      Number(facebookIntegers),
      Number(linkedinIntegers),

      Number(instagramAadar),
      Number(linkedinAadar),
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message:"Data inserted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getmarketingDashboardData = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * 
      FROM dashboard.marketing_dashboard 
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
      data: result.rows[0],
    });

  } catch (error) {
    console.log("Database Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch data from database",
    });
  }
};
