import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client';
// const socket = io('https://fluffy-fiesta-gg7xwq99x47hv5gv-4000.app.github.dev');
console.log("Entered app.js")
function App() {
  console.log("Entered app.js ka function")
  const [weatherData, setWeatherData] = useState();
  const [dataReceived, setDataReceived]=useState();
//   useEffect(() => {
//     console.log("Entered useeffect");
//     try{
//     console.log("i am running...");
//     socket.on('weatherUpdate', (data) => {
//       console.log("I just received new data");
//       setWeatherData(data);
//     });
//   }catch(e){
//     console.log(e);
//   }
//   try{
//     return () => socket.off('weatherUpdate');
//   }catch(e){
// console.log(e);
//   }
//   }, []);
  return (
    <>
      <div className='complete center flexbycolumn spacearound'>
        <div className='flex1'>
        <h1 className='header'>Weather Updates</h1>
        </div>
      <div className='completewidth center flexbyrow spacearound flex1_2'>
      <div>
        <h3>Current details</h3>
      </div>
      <div>
        <h1>Something soon here</h1>
      </div>
      <div>
        <h3>Daily Stats</h3>
        <p>(Roll ups and aggregates)</p>
      </div>
      </div>
     </div>
    </>
  )
}

export default App
