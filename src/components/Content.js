import React, { useState } from 'react';
import Dates from './Dates';
import PieChart from './PieChart';
import Events from './Events';

const Content = ({ events, colors, startDate, setStartDate, endDate, setEndDate }) => {
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
        <PieChart events={events} colors={colors} />
      )}
      {events && (
        <Events events={events} colors={colors} />
      )}
    </div>
  );
}

export default Content;