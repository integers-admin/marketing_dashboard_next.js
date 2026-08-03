import express from "express";
import { getmarketingDashboardData, marketingDashboard } from "../controller/marketingDashboard.controller.js";

const marketingDashboardRoute = express.Router();

marketingDashboardRoute.post("/marketing-dashboard", marketingDashboard);
marketingDashboardRoute.get("/marketing-dashboard-data", getmarketingDashboardData);

export default marketingDashboardRoute;
