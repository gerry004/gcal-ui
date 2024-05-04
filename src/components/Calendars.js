const Calendars = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className='p-2'>
          {item.summary}
          <input type='checkbox' />
        </li>
      ))}
    </ul>
  );
}

export default Calendars;