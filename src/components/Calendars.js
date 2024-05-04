const Divider = () => {
  return <hr className="border-t border-gray-300 m-2" />;
};

const Calendars = ({ calendars, updateCalendars }) => {
  const ownedCalendars = calendars.filter(calendar => calendar.accessRole === 'owner');
  const readOnlyCalendars = calendars.filter(calendar => calendar.accessRole === 'reader');

  return (
    <ul className='flex-col border-black border m-2 p-2 rounded-lg inline-flex'>
      {ownedCalendars.map((calendar, index) => (
        <li key={index} className='flex gap-2 items-center p-2'>
          <p>{calendar.summary}</p>
          <input type='checkbox' checked={calendar.checked} onChange={() => updateCalendars(calendar.id, 'checked', !calendar.checked)} />
        </li>
      ))}
      <Divider />
      {readOnlyCalendars.map((calendar, index) => (
        <li key={index} className='flex gap-2 items-center p-2'>
          <p>{calendar.summary}</p>
          <input type='checkbox' checked={calendar.checked} onChange={() => updateCalendars(calendar.id, 'checked', !calendar.checked)} />
        </li>
      ))}
    </ul>
  );
}

export default Calendars;