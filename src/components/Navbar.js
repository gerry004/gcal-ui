import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='flex bg-blue-400 text-white justify-end gap-2 p-2 min-h-14'>
      <button><Link to="/">Home</Link></button>
      <button><Link to="/dashboard">Dashboard</Link></button>
  </nav>
  );
}

export default Navbar;