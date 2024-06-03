import { useState, useEffect } from 'react';
import { initDatabase, getAppData, updateAppData } from '../indexedDB/db';
import { getEvents } from '../utils/api';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import { getNextMonthEnd, getNextMonthStart } from '../utils/relativeTime';

const Dashboard = () => {
  const [appData, setAppData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);
  const [lineEvents, setLineEvents] = useState([]);

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

    if (startDate && endDate && appData.calendars) {
      fetchEvents();
    }

  }, [startDate, endDate, appData.calendars]);

  useEffect(() => {
    const today = new Date();
    let startMonthDate = '2023-01-01';
    let endMonthDate = '2023-01-31';
    const fetchEventsByMonth = async () => {
      try {
        const filteredCalendars = appData.calendars.filter(cal => cal.checked);
        while (today > new Date(startMonthDate)) {
          const events = await getEvents(startMonthDate, endMonthDate, filteredCalendars);
          updateEvents(startMonthDate, events)
          startMonthDate = getNextMonthStart(startMonthDate);
          endMonthDate = getNextMonthEnd(startMonthDate);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (appData.calendars) {
      fetchEventsByMonth();
    }
  }, [appData.calendars]);

  const updateEvents = (startMonthDate, events) => {
    setAppData((prevState) => {
      const updatedState = {
        ...prevState,
        events: {
          ...prevState.events,
          [startMonthDate]: events,
        },
      };
      return updatedState;
    });
  };

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
          lineEvents={appData.events}
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