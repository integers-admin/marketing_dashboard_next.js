import express from "express";
import { getAadarGA4Data, getAadarGoogleAdsData, getAadarInstaPostData } from "../controller/aadar.controller.js";

const aadarRouter = express.Router();

aadarRouter.get("/aadar-ga4",getAadarGA4Data);

aadarRouter.get("/aadar-ads",getAadarGoogleAdsData);

aadarRouter.get("/aadar-insta-post",getAadarInstaPostData);

export default aadarRouter;
