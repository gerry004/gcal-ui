import { useState, useEffect } from 'react';
import Events from '../components/Events';
import Calendars from '../components/Calendars';
import Colors from '../components/Colors';
import { initDatabase, getAppData, updateAppData } from '../indexedDB/db';
import Dates from '../components/Dates';
import { getEvents } from '../utils/api';
import PieChart from '../components/PieChart';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const Dashboard = () => {
  const [appData, setAppData] = useState({});
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
        const filteredCalendars = appData.calendars.filter(cal => cal.checked);
        const events = await getEvents(startDate, endDate, filteredCalendars);
        setEvents(events)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

  }, [startDate, endDate, appData]);

  const updateColors = (colorId, key, value) => {
    const updatedState = {
      ...appData,
      colors: {
        ...appData.colors,
        [colorId]: {
          ...appData.colors[colorId],
          [key]: value
        }
      }
    };
    setAppData(updatedState);
  }

  const updateCalendars = (calendarId, key, value) => {
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
  }

  return (
    <>
      <div className='flex'>
        {appData.calendars && appData.colors && (
          <Sidebar
            calendars={appData.calendars}
            colors={appData.colors}
            updateCalendars={updateCalendars}
            updateColors={updateColors}
          />
        )}
        <Content
          events={events}
          colors={appData.colors}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
    </>
  );
};

export default Dashboard;