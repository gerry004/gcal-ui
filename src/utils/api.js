import api from "../constants/axios";

export const getColors = async () => {
  try {
    const response = await api.get("calendar/colors");
    return response.data.colors;
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

export const getCalendars = async () => {
  try {
    const response = await api.get("calendar/calendars");
    return response.data.calendars;
  } catch (error) {
    console.error("Error fetching calendars:", error);
    return [];
  }
};

export const getEvents = async (startDate, endDate, calendars) => {
  try {
    const response = await api.get("calendar/events", {
      params: { startDate, endDate, calendars },
    });
    return response.data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getSummary = async (calendar, startDate, endDate) => {
  try {
    const response = await api.get("calendar/summary", {
      params: { calendars: [calendar], startDate, endDate },
    });
    return response.data.summary;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return [];
  }
};
