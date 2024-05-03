import { Link } from 'react-router-dom';
import { fetchAuthUrl } from '../utils/auth';

const Home = () => {
  const navigateTo = (url) => {
    window.location.href = url;
  }
  
  const handleSignInClick = async () => {
    const url = await fetchAuthUrl();
    navigateTo(url);
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <h1>Google Calendar Calculate Time App</h1>
      <button className='bg-blue-400 text-white hover:bg-blue-600 p-2' onClick={handleSignInClick}>Sign In</button>
    </div>
  );
};

export default Home;