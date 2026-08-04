import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { createMarketingDashboardTable } from "./model/dashboard/marketingDashboard.model.js";
import marketingDashboardRoute from "./route/marketingDashboard.route.js";
import automation from "./automation/cron.js";
import umangRouter from "./route/umang.route.js";
import integersRouter from "./route/integers.route.js";
import aadarRouter from "./route/aadar.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://marketing-dashboard-next-js.vercel.app",
      "https://marketing-dashboard-kappa-sandy.vercel.app",
      "https://marketing-dashboard-next-js-wnxa.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
  })
);

app.get("/test", (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "API Working" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, message: "Something went wrong" });
  }
});

app.use(express.json());

// marketing dashboard
app.use("/api", marketingDashboardRoute);

// umang-global
app.use("/api/umang", umangRouter);

// integers insights
app.use("/api/integers", integersRouter);

// aadar
app.use("/api/aadar", aadarRouter);

const startServer = async () => {
  try {
    await connectDB();

    await createMarketingDashboardTable();

    automation();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.log("Error:", error.message);

    process.exit(1);
  }
};

startServer();
