import React from 'react';
import {Bar} from "react-chartjs-2";

const BarGraph = ({pourcentage}) => {

   const conversionPourcentage = (value) => {
      return (value * 100).toFixed(0);
   }

   pourcentage = pourcentage.map((val) => conversionPourcentage(val))

   const data = {
      labels: ["#1", "#2", "", "", ""],
      datasets: [
         {
            backgroundColor: "#9494947F",
            borderColor: "#949494FF",
            borderWidth: 2,
            hoverBackgroundColor: "#1B91FF7F",
            hoverBorderColor: "#1B91FFFF",
            data: [pourcentage[0], pourcentage[1], 0, 0, 0],
         },
      ],
   }

   const options = {
      maintainAspectRatio: false,
      responsive: false,
      aspectRatio: 1,
      onResize: null,
      resizeDelay: 0,
      type: 'bar',
      data: data,
      plugins: {
         legend: {
            display: false,
         }
      },
      scales: {
         y: {
            min: 0,
            max: 100,
            position: 'left',
            ticks:{
               stepSize: 20,
               padding: 10,
               callback: function (value) {
                  return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
               },
            },
            grid: {
               tickLength: 0,
               color: "#D9D9D9",
            },
            border: {
               dash: [4,4],
            },
         },
         x: {
            ticks:{
               padding: 10,
            },
            grid: {
               display: true,
               tickLength: 0,
               color: "#D9D9D9",
            },
            border: {
               dash: [4,4],
            },
         }
      }
   };

   return (
      <Bar data={data} width={260} height={260} options={options}/>
   );
};

export default BarGraph;
