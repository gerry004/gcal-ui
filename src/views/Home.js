import { InputFormProvider } from "../context/inputFormContext";
import InputForm from "../components/InputForm";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1>Welcome to Calendar Wrapped</h1>
      <p>A simple Google Calendar wrapper</p>
      <InputFormProvider>
        <InputForm />
      </InputFormProvider>
    </div>
  );
};

export default Home;
