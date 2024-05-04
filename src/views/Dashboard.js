import api from '../constants/axios';
import { useState } from 'react';

const Dashboard = () => {
  const [colors, setColors] = useState({})
  const [calendars, setCalendars] = useState([])
  const [events, setEvents] = useState([])

  const getColors = async () => {
    api.get('calendar/colors')
      .then(res => { console.log(res.data); setColors(res.data.colors) })
      .catch(err => console.error(err));
  }

  const getCalendars = async () => {
    api.get('calendar/calendars')
      .then(res => { console.log(res.data); setCalendars(res.data.calendars) })
      .catch(err => console.error(err));
  }

  const getEvents = async () => {
    api.get('calendar/events')
      .then(res => { console.log(res.data); setEvents(res.data.events) })
      .catch(err => console.error(err));
  }

  return (
    <>
      <div className='flex justify-center gap-2 p-2'>
        <button className='bg-blue-400 text-white hover:bg-blue-600 p-2' onClick={getColors}>Get Colors</button>
        <button className='bg-blue-400 text-white hover:bg-blue-600 p-2' onClick={getCalendars}>Get Calendars</button>
        <button className='bg-blue-400 text-white hover:bg-blue-600 p-2' onClick={getEvents}>Get Events</button>
      </div>
      {colors && Object.entries(colors).map(([colorName, rgbValue]) => (
        <span
          key={colorName}
          className='flex items-center justify-center p-2 gap-4'
          style={{backgroundColor: rgbValue.background}}
        >
          {colorName}: {rgbValue.background}
        </span>
      ))}
      {calendars && calendars.map(calendar => (
        <div key={calendar.id} className='p-2'>
          {calendar.summary}
        </div>
      ))}
      {events && events.map(event => (
        <div key={event.id} className='p-2' style={{backgroundColor: colors[event.colorId].background}}>
          {event.summary}
        </div>
      ))}
    </>
  );
};

export default Dashboard;