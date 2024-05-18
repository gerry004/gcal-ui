import Colors from "./Colors";
import { useState } from "react";

const Divider = () => {
  return <hr className="border-t border-gray-300 m-2" />;
};

const Calendars = ({ calendars, colors, updateCalendars }) => {
  const [openColorPickerId, setOpenColorPickerId] = useState('');
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const ownedCalendars = calendars.filter(calendar => calendar.accessRole === 'owner');
  const readOnlyCalendars = calendars.filter(calendar => calendar.accessRole === 'reader');

  const onClickColor = (calendarId, colorId) => {
    setOpenColorPicker(false);
    updateCalendars(calendarId, 'defaultEventColor', colorId);
  }

  return (
    <ul className='flex-col border-black border mx-2 p-2 rounded-lg inline-flex'>
      {ownedCalendars.map((calendar, index) => (
        <li key={index} className='flex gap-2 items-center p-2'>
          <button
            className='min-w-6 min-h-6 rounded-full border-black border'
            style={{ backgroundColor: colors[calendar.defaultEventColor]?.background }}
            onClick={() => { setOpenColorPicker(true); setOpenColorPickerId(calendar.id) }}
          />
          <p>{calendar.summary}</p>
          <input type='checkbox' checked={calendar.checked} onChange={() => updateCalendars(calendar.id, 'checked', !calendar.checked)} />
          {openColorPicker && openColorPickerId === calendar.id && <Colors colors={colors} onClickColor={(colorId) => onClickColor(calendar.id, colorId)} />}
        </li>
      ))}
      <Divider />
      {readOnlyCalendars.map((calendar, index) => (
        <li key={index} className='flex gap-2 items-center p-2'>
          <button
            className='min-w-6 min-h-6 rounded-full border-black border'
            style={{ backgroundColor: colors[calendar.defaultEventColor]?.background }}
            onClick={() => { setOpenColorPicker(true); setOpenColorPickerId(calendar.id) }}
          />
          <p>{calendar.summary}</p>
          <input type='checkbox' checked={calendar.checked} onChange={() => updateCalendars(calendar.id, 'checked', !calendar.checked)} />
          {openColorPicker && openColorPickerId === calendar.id && <Colors colors={colors} onClickColor={(colorId) => onClickColor(calendar.id, colorId)} />}
        </li>
      ))}
    </ul>
  );
}

export default Calendars;