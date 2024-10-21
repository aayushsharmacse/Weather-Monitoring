import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client';
import TemperatureChart from './TemperatureChart';
import axios from 'axios';
import convert from './convert';
const socket = io('https://fluffy-fiesta-gg7xwq99x47hv5gv-4000.app.github.dev');
// console.log("Entered app.js")
function App() {
  // console.log("Entered app.js ka function")
  const cities={'Delhi':0, 'Mumbai':1, 'Chennai':2, 'Bangalore':3, 'Kolkata':4, 'Hyderabad':5};
  // const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState('Delhi');
  const [unit, setUnit] = useState('K');
  const [dataReceived, setDataReceived]=useState([]);
  const [i, setI]=useState(cities[city]);
  useEffect(() => {
    try {
      socket.on('weatherUpdate', (data) => {
        console.log("I just received new data");
        setDataReceived(data);
      });
    } catch (error) {
      console.error("Error setting up socket listener:", error);
    }
    return () => {
      console.log("Removing socket listener...");
      socket.off('weatherUpdate');
    };
  }, []);

  useEffect(() => {
    const func=async()=>{
      try{
        // console.log("Fetching data")
        const data=await axios.get(`https://fluffy-fiesta-gg7xwq99x47hv5gv-4000.app.github.dev/api/v1/${city}`);
        // console.log(data.data);
        setDataReceived(data.data);
      }
      catch(e){
        console.log(e);
        return;
      }
    }
    func();
    // console.log("Entered useeffect");
  },[city]);
  const handleChangecity = (event) => {
    setCity(event.target.value);
    setI(cities[event.target.value]);
  };
  const handleChangeunit = (event) => {
    setUnit(event.target.value);
  };
  return (
    <>
          <div className='citydropdown'>
          <label htmlFor="cityDropdown"><h3>City:</h3></label>
        <select id="cityDropdown" value={city} onChange={handleChangecity}>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Hyderabad">Hyderabad</option>
        </select>
          </div>
          <div className='tempdropdown'>
          <label htmlFor="tempDropdown"><h3>Units:</h3></label>
            <select id="tempDropdown" value={unit} onChange={handleChangeunit}>
              <option value="K">K</option>
              <option value="°C">°C</option>
              <option value="°F">°F</option>
            </select>
          </div>
      <div className='complete center flexbycolumn spacearound'>
        <div className='flex1 center'>
        <h1 className='header'>Weather Updates</h1>
        </div>
      <div className='completewidth center flexbyrow spacearound flex4'>
      <div>
        <h3 className='center'>Current details</h3>
        <table>
          {/* {console.log("dataReceived[i]?.lastUpdate?.main",dataReceived[i]?.lastUpdate?.main)}     */}
          {dataReceived && dataReceived[i]?.lastUpdate?.main && Object.entries(dataReceived[i]?.lastUpdate?.main)
          .map(([key,value],index)=>{ 
        // {console.log("key,value",[key,value])}    
        
        return (<tbody key={index}>
            <tr>
              {(key==='temp' || key==='feels_like' || key==='temp_min' || key==='temp_max')?
                <td>{key} : {convert(unit,value).toString()} {unit}</td>
                :<td>{key} : {value.toString()}</td>
              }
            </tr>
        </tbody>);
          })
          }
      </table>
      </div>
      <div>
      {dataReceived && dataReceived[i]?.temperatures && 
    <TemperatureChart temparray={dataReceived[i]?.temperatures} />
}
      </div>
      <div>
        <h3>Daily Stats</h3>
        <p>(Roll ups and aggregates)</p>
        {/* {console.log(dataReceived[i].maxYet.$numberDecimal)} */}
          {dataReceived && dataReceived[i] &&
        <table>
            <tbody>
    <tr>
        <td>Max temp: {convert(unit,dataReceived[i].maxYet.$numberDecimal)}{unit}</td>
    </tr>
</tbody>
<tbody>
    <tr>
        <td>Min temp: {convert(unit,dataReceived[i].minYet.$numberDecimal)}{unit}</td>
    </tr>
</tbody>
<tbody>
    <tr>
        <td>Avg temp: {convert(unit,dataReceived[i].avgYet.avgValue.$numberDecimal)}{unit}</td>
    </tr>
</tbody>
<tbody>
    <tr>
        <td>Dominant temp: {
            Object.entries(dataReceived[i].weatherConditionCnt).reduce((max, [key, value]) => {
                return value > max.value ? { key, value } : max; 
            }, { key: null, value: -Infinity }).key.toString()
        }</td>
    </tr>
</tbody>
      </table>
}
      </div>
      </div>
     </div>
    </>
  )
}

export default App
