import React, { createContext, useState, useContext } from "react";
import { getSummary } from "../utils/api";
import { useNavigate } from "react-router-dom";

const InputFormContext = createContext();

export const InputFormProvider = ({ children }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const generateCalendarWrapped = async (calendar) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getSummary(calendar, startDate, endDate);
      console.log(result);
      navigate("/wrapped");
    } catch (err) {
      console.error("Error generating calendar:", err);
      setError("There was an error generating the calendar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InputFormContext.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        calendar,
        setCalendar,
        generateCalendarWrapped,
        loading,
        error,
      }}
    >
      {children}
    </InputFormContext.Provider>
  );
};

export const useInputForm = () => useContext(InputFormContext);
