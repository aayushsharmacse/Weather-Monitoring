import axios from "axios";
import http from "http";
import { Server } from "socket.io";
import cron from "node-cron";
import {WeatherData} from "../models/weatherdata.model.js"
import { createError } from "../utils/errorGenerator.util.js";

const getWeatherData = async (req,res) => {
    const {location,units}=req.params;
    // try{
    //     const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=93c3c0a3f800993703f786b1fd940912`)
    // }
    // catch(e){
    //     return createError(400,e.message);
    // }
    res.status(200).json({success:true,result:{data:"d",try:"fetched"}});
};

export {getWeatherData};