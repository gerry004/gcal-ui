import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useMemo } from 'react';
import { transformEventsToTimeSpentObject } from '../utils/events';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ events, colors }) => {

  const timeSpentByColor = useMemo(() => {
    if (events) {
      return transformEventsToTimeSpentObject(events);
    }
    return {};
  }, [events]);

  const transformTimeSpentByColorToPieChartData = (timeSpentByColor) => {
    const labels = Object.keys(timeSpentByColor).map((colorId) => { return colors[colorId]?.label || colorId });
    const data = Object.values(timeSpentByColor);
    const backgroundColor = Object.keys(timeSpentByColor).map((color) => colors[color]?.background);
    const borderWidth = 1;

    const pieChartData = {
      labels,
      datasets: [
        {
          label: 'Time Spent By Color',
          data,
          backgroundColor,
          borderWidth,
        },
      ],
    };

    return pieChartData;
  }

  const data = useMemo(() => transformTimeSpentByColorToPieChartData(timeSpentByColor), [timeSpentByColor]);

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            const totalTimeSpent = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
            const totalLabel = {
              text: `Total Time Spent: ${totalTimeSpent} hours`,
              fillStyle: 'transparent',
            };
            const colorLabels = data.labels.map((label, i) => {
              const value = data.datasets[0].data[i];
              const backgroundColor = data.datasets[0].backgroundColor[i];
              const percentage = ((value / totalTimeSpent) * 100).toFixed(2);
              return {
                text: `${label} - ${value} hours (${percentage}%)`,
                fillStyle: backgroundColor,
                index: i,
              };
            });
            return [totalLabel, ...colorLabels];
          },
        }
      },
    },
  };

  return (
    <Pie data={data} options={options} width={500} height={500} />
  );
}

export default PieChart;