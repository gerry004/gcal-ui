export const minutesToHoursAndMinutes = (minutes) => {
  if (typeof minutes !== 'number' || minutes < 0) {
    throw new Error('Input must be a positive number representing minutes.');
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

export const minutesToHours = (minutes) => {
  if (typeof minutes !== 'number' || minutes < 0) {
    throw new Error('Input must be a positive number representing minutes.');
  }
  const hours = minutes / 60;
  return hours;
}

export const hoursAndMinutesObjectToMinutes = (hoursAndMinutesObject) => {
  if (typeof hoursAndMinutesObject !== 'object' || hoursAndMinutesObject === null) {
    throw new Error('Input must be an object with keys "hours" and "minutes".');
  }
  const { hours, minutes } = hoursAndMinutesObject;
  if (typeof hours !== 'number' || typeof minutes !== 'number') {
    throw new Error('Input must be an object with keys "hours" and "minutes" that are numbers.');
  }
  if (hours < 0 || minutes < 0) {
    throw new Error('Hours and minutes must be positive numbers.');
  }
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

export const calculateTimeDifferenceInMilliseconds = (startDateTime, endDateTime) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  const timeDifference = endDate - startDate;
  if (isNaN(timeDifference)) {
    return 0;
  }
  return timeDifference;
}

export const millisecondsToMinutes = (milliseconds) => {
  if (typeof milliseconds !== 'number' || milliseconds < 0) {
    throw new Error('Input must be a positive number representing milliseconds.');
  }
  const minutes = milliseconds / (1000 * 60);
  return minutes;
}