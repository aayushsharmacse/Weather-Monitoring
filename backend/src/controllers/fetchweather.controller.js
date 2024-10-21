import axios from "axios";
import http from "http";
import { Server } from "socket.io";
import cron from "node-cron";
import {WeatherData} from "../models/weatherdata.model.js"
import { createError } from "../utils/errorGenerator.util.js";

const getWeatherData = async (req,res) => {
    const {city}=req.params;
    console.log("REACHED BACKEND AT LEAST =",city);
    const cities={'Delhi':0, 'Mumbai':1, 'Chennai':2, 'Bangalore':3, 'Kolkata':4, 'Hyderabad':5};
    const arr=[null,null,null,null,null,null];
    try{
        const data=await WeatherData.findOne({city:city});
        console.log(data);
        console.log(cities[city]);
        arr[cities[city]]=data;
        return res.status(200).json(arr);
    }
    catch(e){
        return createError(400,e.message);
    }
};

export {getWeatherData};