import api from '../constants/axios';

const Dashboard = () => {
  const calendarClick = async () => {
    const { data } = await api.post('calendar/events');
    console.log(data)
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button className='bg-blue-400 text-white hover:bg-blue-600 p-2' onClick={calendarClick}>Get Calendar Events</button>
    </>
  );
};

export default Dashboard;