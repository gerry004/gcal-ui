import React, { useState, useMemo } from 'react';
import { sortEventsByColor } from '../utils/events';

const Events = ({ colors, events }) => {
  const [activeTab, setActiveTab] = useState('All');
  const sortedEventsByColor = useMemo(() => sortEventsByColor(events), [events]);

  return (
    <>
      <div className='border border-black rounded-lg p-2 m-2 flex gap-2 justify-start items-center'>
        <button
          className='min-w-6 min-h-6 rounded-full border-black border'
          onClick={() => setActiveTab('All')}
        />
        {Object.keys(sortedEventsByColor).map((id) => (
            <button
              key={id}
              className='min-w-6 min-h-6 rounded-full border-black border'
              onClick={() => setActiveTab(id)}
              style={{ backgroundColor: colors[id]?.background }}
            />
        ))}
      </div>
      <div>
        {activeTab === 'All' && events.map((event) => (
          <div key={event.id} className='border rounded-lg p-2 m-2'>
            <div className='flex items-center gap-2'>
              <span
                className='rounded-full p-4'
                style={{ backgroundColor: colors[event.colorId]?.background }}>
              </span>
              <span className='p-2'>{event.summary}</span>
            </div>
          </div>
        ))}
        {activeTab !== 'All' && sortedEventsByColor[activeTab].map((event) => (
          <div key={event.id} className='border rounded-lg p-2 m-2'>
            <div className='flex items-center gap-2'>
              <span
                className='rounded-full p-4'
                style={{ backgroundColor: colors[event.colorId]?.background }}>
              </span>
              <span className='p-2'>{event.summary}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Events;
