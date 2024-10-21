import express from "express";

import {getWeatherData} from "../controllers/fetchweather.controller.js"

const allRouter=express.Router()

allRouter.get("/",getWeatherData)


export default allRouter;