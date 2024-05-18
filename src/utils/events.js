
import { millisecondsToMinutes, calculateTimeDifferenceInMilliseconds, minutesToHoursAndMinutes } from './time';

export const sortEventsByColor = (events) => {
  const sortedEvents = {};
  events.forEach(event => {
    const color = event.colorId;
    sortedEvents[color] = sortedEvents[color] || [];
    sortedEvents[color].push(event);
  });
  return sortedEvents;
};

const calculateTimeSpentByColor = (eventsByColor) => {
  const timeSpentByColor = {};
  Object.keys(eventsByColor).forEach(color => {
    let timeSpentInMilliseconds = 0;
    eventsByColor[color].forEach(event => {
      const startDateTime = event.start.dateTime;
      const endDateTime = event.end.dateTime;
      const timeDifference = calculateTimeDifferenceInMilliseconds(startDateTime, endDateTime);
      timeSpentInMilliseconds += timeDifference;
    });
    const minutes = millisecondsToMinutes(timeSpentInMilliseconds);
    timeSpentByColor[color] = minutes;
  });
  return timeSpentByColor;
}

export const transformEventsToTimeSpentObject = (events) => {
  const eventsByColor = sortEventsByColor(events);
  const timeSpentByColor = calculateTimeSpentByColor(eventsByColor);

  Object.keys(timeSpentByColor).forEach((color) => {
    const minutes = timeSpentByColor[color];
    timeSpentByColor[color] = minutesToHoursAndMinutes(minutes);
  });

  return timeSpentByColor;
} 