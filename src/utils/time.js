export const minutesToHoursAndMinutes = (minutes) => {
  if (typeof minutes !== 'number' || minutes < 0) {
    throw new Error('Input must be a positive number representing minutes.');
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
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