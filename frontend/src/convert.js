
const convert=function(to,kelvin){
    console.log(to,kelvin);
    if(to==='°C'){
        return (kelvin - 273.15).toFixed(2);
    }
    if(to==='°F'){
        return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
    }
    if(to=='K'){
        return (kelvin*1).toFixed(2);
    }
    return;
}
export default convert;