import Navbar from "../components/Navbar";
import api from "../constants/axios";

const Home = () => {
  const checkAuth = async () => {
    api
      .get("/isAuthenticated")
      .then((res) => {
        alert(res.data.isAuthenticated);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1>Welcome to Calendar Wrapped</h1>
        <p>A simple Google Calendar wrapper</p>
        <button
          className="bg-white text-primary font-semibold p-2 rounded-lg hover:text-secondary"
          onClick={checkAuth}
        >
          Check Auth
        </button>
      </div>
    </>
  );
};

export default Home;
