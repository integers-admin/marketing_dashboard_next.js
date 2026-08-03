import express from "express";
import { getIntegersGA4Data, getIntegersGoogleAdsData, getIntegersInstaPostData } from "../controller/integers.controller.js";

const integersRouter = express.Router();

integersRouter.get("/integers-ga4",getIntegersGA4Data);

integersRouter.get("/integers-ads",getIntegersGoogleAdsData);

integersRouter.get("/integers-insta-post",getIntegersInstaPostData);

export default integersRouter;
