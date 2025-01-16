import { useAuth } from "../context/authContext";

const ConnectCalendar = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <button
      className="bg-white text-primary font-semibold p-2 rounded-lg hover:text-secondary"
      onClick={handleClick}
    >
      {isAuthenticated ? "Connected" : "Connect Google Calendar"}
    </button>
  );
};

export default ConnectCalendar;
