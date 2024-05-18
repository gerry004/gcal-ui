import api from "../constants/axios";

export const getColors = async () => {
  try {
    const response = await api.get('calendar/colors');
    return response.data.colors;
  } catch (error) {
    console.error('Error fetching colors:', error);
    return [];
  }
};

export const getCalendars = async () => {
  try {
    const response = await api.get('calendar/calendars');
    return response.data.calendars;
  } catch (error) {
    console.error('Error fetching calendars:', error);
    return [];
  }
};

export const getEvents = async (startDate, endDate, calendars, colors) => {
  try {
    const response = await api.get('calendar/events', {
      params: { startDate, endDate, calendars, colors },
    });
    return response.data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};