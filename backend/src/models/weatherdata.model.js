import mongoose from "mongoose";

const weatherDataSchema=new mongoose.Schema({
    date:{
        type:String
    },
    temperatures:{
        type:[mongoose.Types.Decimal128]
    },
    maxYet:{
        type:mongoose.Types.Decimal128
    },
    minYet:{
        type:mongoose.Types.Decimal128
    },
    avgYet:{
        type:{tempCnt:Number,avgValue:mongoose.Types.Decimal128}
    },
    weatherConditionCnt:{
        type:{}
    },
    city:{
        type:String
    },
    lastUpdate:{
        type:{}
    }
}, {timestamps:true})

export const WeatherData=mongoose.model("WeatherData",weatherDataSchema);