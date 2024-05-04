import api from '../constants/axios';
import { useState, useEffect, useMemo } from 'react';
import Colors from '../components/Colors';
import Calendars from '../components/Calendars';
import Legend from '../components/Legend';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { transformEventsToTimeSpentObject } from '../utils/events';

const Dashboard = () => {
  const [colors, setColors] = useState({})
  const [calendars, setCalendars] = useState([])
  const [events, setEvents] = useState([])

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

  const timeSpentByColor = useMemo(() => {
    if (events) {
      return transformEventsToTimeSpentObject(events);
    }
    return {};
  }, [events]);

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
      <div className='flex m-1 rounded-full items-center'>
        <FaArrowLeft />
        <button className='p-2 bg-gray-100 hover:bg-gray-200 border-gray-600 border rounded-l-lg'>Day</button>
        <button className='p-2 bg-gray-100 hover:bg-gray-200 border-gray-600 border'>Week</button>
        <button className='p-2 bg-gray-100 hover:bg-gray-200 border-gray-600 border rounded-r-lg'>Month</button>
        <FaArrowRight />
      </div>
      <div className='flex gap-2'>
        <input type='date' />
        <input type='date' />
      </div>
      {colors && (<Colors className='flex gap-2' colors={colors} />)}
      {calendars && (<Calendars className='flex flex-col' calendars={calendars} updateCalendars={updateCalendars} />)}
      {timeSpentByColor && (<Legend data={timeSpentByColor} colors={colors} />)}
    </>
  );
};

export default Dashboard;