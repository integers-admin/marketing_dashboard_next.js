import { pool } from "../../config/db.js";

export const createMarketingDashboardTable = async () => {
  const query = `
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE SCHEMA IF NOT EXISTS dashboard;
    CREATE TABLE IF NOT EXISTS dashboard.marketing_dashboard (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        revenue_generated INT DEFAULT 0,
        linkedin_umang INT DEFAULT 0,
        facebook_umang INT DEFAULT 0,
        youtube_umang INT DEFAULT 0,
        pinterest_umang INT DEFAULT 0,
        instagram_umang INT DEFAULT 0,
        others_umang INT DEFAULT 0,
        instagram_integers INT DEFAULT 0,
        youtube_integers INT DEFAULT 0,
        twitter_integers INT DEFAULT 0,
        linkedin_integers INT DEFAULT 0,
        instagram_aadar INT DEFAULT 0,
        youtube_aadar INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.umang_global_ga4 (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.integers_insights_ga4 (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.aadar_ga4 (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.umang_google_ads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.integers_google_ads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.aadar_google_ads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dashboard.umang_emailer (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

  `;

  try {
    await pool.query(query);
    console.log("Tables created successfully");
  } catch (error) {
    console.log("Table creation error:", error.message);
    throw error;
  }
};
