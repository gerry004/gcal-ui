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
    const labels = Object.keys(timeSpentByColor).map((colorId) => colors[colorId]?.label);
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
    console.log('Pie chart data:', pieChartData)
    return pieChartData;
  }

  const data = useMemo(() => transformTimeSpentByColorToPieChartData(timeSpentByColor), [timeSpentByColor]);

  return (
    <div className=''>
    <Pie data={data} />
    </div>
  );
}

export default PieChart;