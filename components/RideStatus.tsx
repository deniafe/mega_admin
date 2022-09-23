import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

type ChildrenProps = {
  graphData?: any[]
  graphData2?: any[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Ride Status',
    },
  },
};

 

export function RideStatus({graphData, graphData2}: ChildrenProps) {

const labels1: any[] = [];
const cancelled: any[] = []

const labels2: any[] = [];
const completed: any[] = []

graphData?.forEach((data: any) => {
  const key: any = Object.keys(data)[0]
  labels1.push(key)
  cancelled.push(data[key])
  console.log(data[key])
})

graphData2?.forEach((data: any) => {
  const key: any = Object.keys(data)[0]
  labels2.push(key)
  completed.push(data[key])
  console.log(data[key])
})

const labels = labels1.concat(labels2.filter((item) => labels1.indexOf(item) < 0));

console.log('labels', labels, labels1, labels2, cancelled, completed )

const data = {
  labels,
  datasets: [
    {
      label: 'Cancelled Trips',
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      // data: [-1000, -800, -600, -400, -200, 0, 200, 400, 600, 800, 1000],
      data: cancelled,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Completed Trips',
      data: completed,
      // data: [-900, -700, -500, -300, -100, 0, 100, 300, 500, 700, 900],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

  return <Line options={options} data={data} />;
}
