import api from '../constants/axios';
import { useState, useEffect, useMemo } from 'react';
import Colors from '../components/Colors';
import Calendars from '../components/Calendars';
import Legend from '../components/Legend';
import Timeframe from '../components/Timeframe';
import DatePicker from '../components/DatePicker';
import Dexie from 'dexie';

const dbName = 'MyDatabase';
const dbVersion = 2;
const initDatabase = async () => {
  const db = new Dexie(dbName);

  db.version(dbVersion).stores({
    gCal: '++id, application',
  });

  const result = await db.gCal.where('application').equals('gCal').first();

  if (!result) {
    await db.gCal.put({ application: 'gCal', startDate: '2022-01-01', endDate: '2022-12-31', calendars: [{ id: 'Gerry Yang', defaultColorId: 2 }] });
    const result = await db.gCal.where('application').equals('gCal').first();
    console.log('initial', { result })
  } else {
    await db.gCal.update(result.id, { startDate: 'hell nah'});
    const updatedResult = await db.gCal.where('application').equals('gCal').first();
    console.log({ updatedResult })
  }
};

const Dashboard = () => {
  const [colors, setColors] = useState({})
  const [calendars, setCalendars] = useState([])
  const [events, setEvents] = useState([])
  const [timeframe, setTimeframe] = useState('Week');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getColors = async () => {
    try {
      const response = await api.get('calendar/colors');
      return response.data.colors;
    } catch (error) {
      console.error('Error fetching colors:', error);
      return [];
    }
  };

  const getCalendars = async () => {
    try {
      const response = await api.get('calendar/calendars');
      return response.data.calendars;
    } catch (error) {
      console.error('Error fetching calendars:', error);
      return [];
    }
  };

  const getEvents = async (startDate, endDate, calendars, colors) => {
    try {
      const response = await api.get('calendar/events', {
        params: { startDate, endDate, calendars, colors },
      });
      return response.data.events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  const fetchData = async () => {
    const [fetchedColors, fetchedCalendars] = await Promise.all([
      getColors(),
      getCalendars(),
    ]);

    setColors(fetchedColors);

    fetchedCalendars.forEach(cal => cal.checked = true);
    setCalendars(fetchedCalendars);

    const fetchedEvents = await getEvents(
      startDate,
      endDate,
      fetchedCalendars,
      fetchedColors
    );
    setEvents(fetchedEvents);
    initDatabase();

    console.log({ fetchedColors, fetchedCalendars, fetchedEvents })
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const updateCalendars = (calendarId, property, value) => {
    const updatedCalendars = calendars.map(cal => {
      if (cal.id === calendarId) {
        return { ...cal, [property]: value };
      }
      return cal;
    });
    setCalendars(updatedCalendars);
  }

  return (
    <>
      <div className='flex justify-between items-center p-2 m-2'>
        <div className='flex gap-2'>
          <DatePicker id='start-date' label='Start Date' date={startDate} setDate={setStartDate} />
          <DatePicker id='end-date' label='End Date' date={endDate} setDate={setEndDate} />
        </div>
        <div className='flex m-1 rounded-full items-center'>
          <Timeframe timeframe={timeframe} setTimeframe={setTimeframe} />
        </div>
      </div>
      <div className='flex'>
        {calendars && (<Calendars calendars={calendars} updateCalendars={updateCalendars} />)}
        {events && (<Legend events={events} colors={colors} />)}
      </div>
      {colors && (<Colors className='flex gap-2' colors={colors} />)}
      {events.map((event) => (
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
    </>
  );
};

export default Dashboard;