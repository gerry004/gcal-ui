import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { transformEventsToTimeSpentObject } from '../utils/events';

Chart.register(...registerables);

const LineChart = ({ events = {}, colors }) => {
  const timeSpentObjects = useMemo(() =>
    Object.keys(events).map(startMonthDate =>
      transformEventsToTimeSpentObject(events[startMonthDate])
    ), [events]);

  const transformedData = useMemo(() => {
    const data = {};

    timeSpentObjects.forEach((timeSpentObject, i) => {
      Object.keys(timeSpentObject).forEach(colorId => {
        if (!data[colorId]) {
          data[colorId] = new Array(timeSpentObjects.length).fill(null);
        }
        data[colorId][i] = timeSpentObject[colorId];
      });
    });

    return data;
  }, [timeSpentObjects]);

  const data = {
    labels: Object.keys(events),
    datasets: Object.keys(transformedData).map(colorId => ({
      label: colors[colorId]?.label || colorId,
      data: transformedData[colorId],
      fill: false,
      backgroundColor: colors[colorId]?.background || 'black',
      borderColor: colors[colorId]?.background || 'black',
    })),
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  return <Line data={data} options={options} width={500} height={500} />;
};

export default LineChart;
