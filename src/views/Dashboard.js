import api from '../constants/axios';
import { useState, useEffect, useMemo } from 'react';
import ColorGrid from '../components/ColorGrid';
import Calendars from '../components/Calendars';
import Legend from '../components/Legend';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
  const [colors, setColors] = useState({})
  const [calendars, setCalendars] = useState([])
  const [events, setEvents] = useState([])

  const getColors = async () => {
    api.get('calendar/colors')
      .then(res => { console.log(res.data); setColors(res.data.colors) })
      .catch(err => console.error(err));
  }
  const fetchCalendarsAndEvents = async () => {
    const response = await api.get('calendar/calendars');
    const fetchedCalendars = response.data.calendars;
    setCalendars(fetchedCalendars);

    const colors = await api.get('calendar/colors');
    const fetchedColors = colors.data.colors;
    setColors(fetchedColors);

    const getEvents = async () => {
      api.get('calendar/events', { params: { startDate: '2024-05-01', endDate: '2024-05-04', calendars: fetchedCalendars, colors: fetchedColors } })
        .then(res => { console.log(res.data); setEvents(res.data.events) })
        .catch(err => console.error(err));
    }

    getEvents();
  }
  const sortEventsByColor = (events) => {
    const sortedEvents = {};
    events.forEach(event => {
      const color = event.colorId;
      sortedEvents[color] = sortedEvents[color] || [];
      sortedEvents[color].push(event);
    });
    return sortedEvents;
  };

  const millisecondsToMinutes = (milliseconds) => {
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
      throw new Error('Input must be a positive number representing milliseconds.');
    }
    const minutes = milliseconds / (1000 * 60);
    return minutes;
  }

  const calculateTimeSpentByColor = (eventsByColor) => {
    const timeSpentByColor = {};
    Object.keys(eventsByColor).forEach(color => {
      let timeSpentInMilliseconds = 0;
      eventsByColor[color].forEach(event => {
        const startDateTime = event.start.dateTime;
        const endDateTime = event.end.dateTime;
        const timeDifference = calculateTimeDifferenceInMilliseconds(startDateTime, endDateTime);
        timeSpentInMilliseconds += timeDifference;
      });
      const minutes = millisecondsToMinutes(timeSpentInMilliseconds);
      timeSpentByColor[color] = minutes;
    });
    return timeSpentByColor;
  }

  const calculateTimeDifferenceInMilliseconds = (startDateTime, endDateTime) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const timeDifference = endDate - startDate;
    if (isNaN(timeDifference)) {
      return 0;
    }
    return timeDifference;
  }


  const eventsByColor = sortEventsByColor(events);
  const timeSpentByColor = calculateTimeSpentByColor(eventsByColor);

  const minutesToHoursAndMinutes = (minutes) => {
    if (typeof minutes !== 'number' || minutes < 0) {
      throw new Error('Input must be a positive number representing minutes.');
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, minutes: remainingMinutes };
  }

  Object.keys(timeSpentByColor).forEach((color) => {
    const minutes = timeSpentByColor[color];
    timeSpentByColor[color] = minutesToHoursAndMinutes(minutes);
  });

  console.log(timeSpentByColor);

  useEffect(() => {
    // getColors();
    fetchCalendarsAndEvents();
  }, []);

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
      {colors && (<ColorGrid className='flex gap-2' colors={colors} />)}
      {calendars && (<Calendars className='flex flex-col' items={calendars} />)}
      {timeSpentByColor && (<Legend data={timeSpentByColor} colors={colors} />)}
      {/* {events && events.map(event => (
        <div key={event.id} className='p-2' style={{ backgroundColor: colors[event.colorId]?.background || colors[1].background }}>
          {event.summary}
        </div>
      ))} */}
    </>
  );
};

export default Dashboard;