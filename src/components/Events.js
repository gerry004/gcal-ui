import React, { useState, useMemo } from 'react';
import { sortEventsByColor } from '../utils/events';
import EventsList from './EventsList';

const Events = ({ colors, events }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [sumOfDurationsInHours, setSumOfDurationsInHours] = useState(0);
  const [searchString, setSearchString] = useState('');
  const sortedEventsByColor = useMemo(() => sortEventsByColor(events), [events]);

  return (
    <>
      <h2 className="text-2xl font-semibold p-2 my-2">Events</h2>
      <div className='border border-gray-300 rounded-lg p-2 m-2 flex gap-2 justify-between items-center'>
        <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg p-2" onChange={(e) => setSearchString(e.target.value)} />
        <span className="p-2">Sum: {sumOfDurationsInHours} hours</span>
      </div>
      <div className='border border-gray-300 rounded-lg p-2 m-2 flex gap-2 justify-start items-center'>
        <button
          className='min-w-6 min-h-6 rounded-full border-black border p-2'
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        {Object.keys(sortedEventsByColor).map((id) => (
          <button
            key={id}
            className='min-w-6 min-h-6 rounded-full border-black border p-2'
            onClick={() => setActiveTab(id)}
            style={{ backgroundColor: colors[id]?.background }}
          >
            {colors[id]?.label || id}
          </button>
        ))}
      </div>
      <EventsList
        events={activeTab === 'All' ? events : sortedEventsByColor[activeTab]}
        colors={colors}
        searchString={searchString}
        setSumOfDurationsInHours={setSumOfDurationsInHours}
      />
    </>
  );
}

export default Events;
