import { useState, useEffect } from 'react';
import Colors from '../components/Colors';
import Calendars from '../components/Calendars';
import Legend from '../components/Legend';
import { initDatabase, getAppData, updateAppData } from '../indexedDB/db';
import Dates from '../components/Dates';
import { getEvents } from '../utils/api';

const Dashboard = () => {
  const [appData, setAppData] = useState({});
  const [timeframe, setTimeframe] = useState('Week');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);

  const initApplication = async () => {
    await initDatabase();

    const appData = await getAppData();
    setAppData(appData);

    console.log('App data initialized');
    console.log(appData);
  }

  useEffect(() => {
    initApplication();
  }, []);

  useEffect(() => {
    updateAppData(appData);
  }, [appData]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents(startDate, endDate, appData.calendars, appData.colors);
        setEvents(events)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    
  }, [startDate, endDate, appData]);


  return (
    <>
      <Dates
        startDate={startDate}
        endDate={endDate}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className='flex'>
        {appData.calendars && (
          <Calendars
            calendars={appData.calendars}
            updateCalendars={(calendarId, key, value) => {
              const updatedState = {
                ...appData,
                calendars: appData.calendars.map(cal => {
                  if (cal.id === calendarId) {
                    return { ...cal, [key]: value };
                  }
                  return cal;
                })
              };
              setAppData(updatedState);
            }}
          />
        )}
        {events && (
          <Legend
            events={events}
            colors={appData.colors}
          />
        )}
      </div>
      {appData.colors && (
        <Colors
          className='flex gap-2'
          colors={appData.colors}
        />
      )}
      {events.map((event) => (
        <div key={event.id} className='border rounded-lg p-2 m-2'>
          <div className='flex items-center gap-2'>
            <span
              className='rounded-full p-4'
              style={{ backgroundColor: appData.colors[event.colorId]?.background }}>
            </span>
            <span className='p-2'>{event.summary}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;