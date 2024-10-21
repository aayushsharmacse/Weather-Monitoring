import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = ({ temparray }) => {
    // console.log("temparray====",temparray);
    // console.log(temparray.map((i)=>Number(i.$numberDecimal)));
    temparray=temparray.map((i)=>Number(i.$numberDecimal))
    const labels = temparray.map((_, index) => `TU ${index + 1}`);
    console.log(temparray)
    console.log(labels)
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (K)',
                data:temparray ,
                // borderColor: 'rgba(75, 192, 192, 1)',
                // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <h2>Temperature Line Chart</h2>
            <Line data={data}/>
        </div>
    );
};

export default TemperatureChart;
