import api from '../constants/axios';
import { useState, useEffect, useMemo } from 'react';
import Colors from '../components/Colors';
import Calendars from '../components/Calendars';
import Legend from '../components/Legend';
import Timeframe from '../components/Timeframe';
import DatePicker from '../components/DatePicker';

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
      '2024-05-01',
      '2024-05-04',
      fetchedCalendars,
      fetchedColors
    );
    setEvents(fetchedEvents);

    console.log({ fetchedColors, fetchedCalendars, fetchedEvents })
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    </>
  );
};

export default Dashboard;