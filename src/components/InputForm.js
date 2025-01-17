import ConnectCalendar from "./ConnectCalendar";
import DatePicker from "./DatePicker";
import { useInputForm } from "../context/inputFormContext";
import Dropdown from "./Dropdown";
import { getCalendars } from "../utils/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const InputForm = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    calendar,
    setCalendar,
    generateCalendarWrapped,
    loading,
    error,
  } = useInputForm();

  const { isAuthenticated } = useAuth();

  const [calendars, setCalendars] = useState([]);
  const [calendarNames, setCalendarNames] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const isCalendarSelected = !!calendar;
      const areDatesValid =
        startDate && endDate && new Date(startDate) < new Date(endDate);
      setIsFormValid(isCalendarSelected && areDatesValid);
    };

    validateForm();
  }, [calendar, startDate, endDate]);

  useEffect(() => {
    const loadCalendars = async () => {
      try {
        const calendars = await getCalendars();
        setCalendars(calendars);
        const calendarNames = calendars.map((calendar) => calendar.summary);
        setCalendarNames(calendarNames);
      } catch (error) {
        console.error("Error fetching calendars:", error);
      }
    };

    loadCalendars();
  }, []);

  const handleGenerateClick = (e) => {
    e.preventDefault();
    generateCalendarWrapped(calendar);
  };

  const handleSelectCalendar = (calendarName) => {
    const selectedCalendar = calendars.find(
      (cal) => cal.summary === calendarName
    );
    setCalendar(selectedCalendar);
  };

  return (
    <div className="flex flex-col gap-2 border border-black bg-primary p-6 rounded-lg">
      <h2 className="text-white my-4">Generate Calendar Wrapped</h2>
      <ConnectCalendar />
      <Dropdown
        value={calendar?.summary}
        onSelect={handleSelectCalendar}
        options={calendarNames}
        placeholder="Select Calendar"
        disabled={!isAuthenticated}
      />
      <div className="flex flex-row gap-2">
        <DatePicker
          className="flex-grow"
          id="start-date"
          label="Start Date"
          date={startDate}
          setDate={setStartDate}
        />
        <DatePicker
          className="flex-grow"
          id="end-date"
          label="End Date"
          date={endDate}
          setDate={setEndDate}
        />
      </div>
      <button
        className={`bg-white text-primary font-semibold p-2 rounded-lg ${
          isFormValid ? "hover:text-secondary" : "cursor-not-allowed"
        }`}
        onClick={handleGenerateClick}
        disabled={!isFormValid || loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      {error && (
        <div className="text-red-500">{error}</div> // Show error message
      )}
    </div>
  );
};

export default InputForm;
