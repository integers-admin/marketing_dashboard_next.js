import express from "express";
import { getUmangEmailerData, getUmangGA4Data, getUmangGlobalInstaPostData, getUmangGoogleAdsData } from "../controller/umang.controller.js";

const umangRouter = express.Router();

umangRouter.get("/umang-ga4",getUmangGA4Data);

umangRouter.get("/umang-ads",getUmangGoogleAdsData);

umangRouter.get("/umang-emailer",getUmangEmailerData);

umangRouter.get("/umang-insta-post",getUmangGlobalInstaPostData);

export default umangRouter;
