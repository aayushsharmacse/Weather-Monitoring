import express from "express";
import cors from "cors";
import errHandlerMiddleware from "./middlewares/err.middleware.js";
import notfountMiddleware from "./middlewares/notfound.middleware.js";
import allRouter from "./routes/all.routes.js";
import axios from "axios";
import http, { maxHeaderSize } from "http";
import { Server } from "socket.io";
import cron from "node-cron";
import {WeatherData} from "./models/weatherdata.model.js"
import { createError } from "./utils/errorGenerator.util.js";

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: 'https://fluffy-fiesta-gg7xwq99x47hv5gv-5173.app.github.dev',
        methods: ['GET'],
        credentials: true
    }
});
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",allRouter)


const fetchWeatherData=async()=>{
    const myData=[];
    const cities=['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    for(let city of cities){
        try{
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
        const {weather:[{main}],main:{temp,feels_like},dt}=response.data;
        const date = new Date(dt * 1000);
        const isoDate = date.toISOString().split('T')[0];
        let dateCityData;
        dateCityData=await WeatherData.findOne({date:isoDate,city:city})
        if(!dateCityData){
            dateCityData=await WeatherData.create({
                date:isoDate,
                temperatures:[temp],
                maxYet:temp,
                minYet:temp,
                avgYet:{tempCnt:1,avgValue:temp},
                weatherConditionCnt:{[main]:1},
                city:city,
                lastUpdate:response.data
            }
            );
        }
        else{
            console.log("main=",main);
            dateCityData.temperatures.push(temp);
            dateCityData.maxYet=Math.max(dateCityData.maxYet,temp);
            dateCityData.minYet=Math.min(dateCityData.minYet,temp);
            const {tempCnt:ptc,avgValue:pav}=dateCityData.avgYet;
            dateCityData.avgYet={tempCnt:ptc+1,avgValue:((pav*ptc+temp)/(ptc+1))};
            console.log("dateCityData.weatherConditionCnt[main]=",dateCityData.weatherConditionCnt[main]);
            if(dateCityData.weatherConditionCnt[main]){
                dateCityData.weatherConditionCnt=
                {...dateCityData.weatherConditionCnt,[main]:dateCityData.weatherConditionCnt[main]+1};
            }
            else{
                dateCityData.weatherConditionCnt={...dateCityData.weatherConditionCnt,[main]:1};
            }
            console.log("dateCityData.weatherConditionCnt[main]",dateCityData.weatherConditionCnt[main]);
            dateCityData.lastUpdate=response.data;
            await dateCityData.save();
        }
        // console.log("sending ",dateCityData)
        myData.push(dateCityData);
        console.log("emitted")
    }
    catch(e){
        console.log(e);
        return;
    }
}
io.emit('weatherUpdate', myData);
}
// cron.schedule('* * * * * *',fetchWeatherData);
// cron.schedule('*/1 * * * *', fetchWeatherData)
cron.schedule('*/5 * * * *', fetchWeatherData);
app.use(errHandlerMiddleware)
app.use(notfountMiddleware)
export default server;