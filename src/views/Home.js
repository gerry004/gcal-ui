import api from '../constants/axios';

const Home = () => {
  const navigateTo = (url) => {
    window.location.href = url;
  }
  
  const handleSignInClick = async () => {
    api.get('/request')
      .then(res => { navigateTo(res.data.url) })
      .catch(err => console.error(err));
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h1>Google Calendar Calculate Time App</h1>
      <button className='bg-blue-400 text-white hover:bg-blue-600 p-2' onClick={handleSignInClick}>Sign In</button>
    </div>
  );
};

export default Home;