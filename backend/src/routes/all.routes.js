import express from "express";

import {getWeatherData} from "../controllers/fetchweather.controller.js"

const allRouter=express.Router()

allRouter.get("/:city",getWeatherData)


export default allRouter;