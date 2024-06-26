import React, { useState } from 'react';
import Dates from './Dates';
import PieChart from './PieChart';
import Events from './Events';
import LineChart from './LineChart';

const Content = ({ events, lineEvents, colors, startDate, setStartDate, endDate, setEndDate }) => {
  const [timeframe, setTimeframe] = useState('Week');

  return (
    <div className='w-full px-36'>
      <h1 className="text-2xl font-semibold p-2 my-2">Dashboard</h1>
      <Dates
        startDate={startDate}
        endDate={endDate}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {events && (
        <div className='flex justify-between'>
          <PieChart events={events} colors={colors} />
          <LineChart events={lineEvents} colors={colors} />
        </div>
      )}
      {events && (
        <Events events={events} colors={colors} />
      )}
    </div>
  );
}

export default Content;