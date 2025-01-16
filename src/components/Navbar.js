import { Link } from "react-router-dom";
import ConnectCalendar from "./ConnectCalendar";

const Navbar = () => {
  return (
    <nav
      id="navbar"
      className="flex flex-row justify-center items-center h-16 px-6 py-2 fixed top-0 right-0 left-0 bg-primary z-50"
    >
      <h2 className="text-white">
        <Link to="/">Calendar Wrapped</Link>
      </h2>
      <div className="ml-auto">
        <ConnectCalendar />
      </div>
    </nav>
  );
};

export default Navbar;
