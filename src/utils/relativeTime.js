import { addDays, subDays, format } from 'date-fns';

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// assumes startOfWeek is Sunday and endOfWeek is Saturday
export const startOfWeek = (today = new Date()) => {
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek;
  const startOfWeekDate = new Date(today.setDate(diff));
  return formatDate(startOfWeekDate);
}

export const endOfWeek = (today = new Date()) => {
  const dayOfWeek = today.getDay();
  const diff = 6 - dayOfWeek;
  const endOfWeekDate = new Date(today.setDate(today.getDate() + diff));
  return formatDate(endOfWeekDate);
};

export const startOfMonth = (today = new Date()) => {
  const startOfMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
  return formatDate(startOfMonthDate);
};

export const endOfMonth = (today = new Date()) => {
  const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return formatDate(endOfMonthDate);
};

export const getLastWeekStart = (dateString) => {
  const givenDate = new Date(dateString);
  const thisWeekStartDate = startOfWeek(givenDate);
  const lastWeekStartDate = subDays(thisWeekStartDate, 7);
  return format(lastWeekStartDate, 'yyyy-MM-dd');
}

export const getLastWeekEnd = (dateString) => {
  const givenDate = new Date(dateString);
  const thisWeekStartDate = startOfWeek(givenDate);
  const lastWeekEndDate = subDays(thisWeekStartDate, 1);
  return format(lastWeekEndDate, 'yyyy-MM-dd');
}


export const getLastMonthStart = (dateString) => {
  const givenDate = new Date(dateString);
  const startOfCurrentMonth = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
  const startOfLastMonth = new Date(startOfCurrentMonth.getFullYear(), startOfCurrentMonth.getMonth() - 1, 1);
  return formatDate(startOfLastMonth);
}

export const getLastMonthEnd = (dateString) => {
  const givenDate = new Date(dateString);
  const startOfCurrentMonth = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
  const endOfLastMonth = new Date(startOfCurrentMonth.getFullYear(), startOfCurrentMonth.getMonth(), 0);
  return formatDate(endOfLastMonth);
}

export const getNextWeekStart = (dateString) => {
  const givenDate = new Date(dateString);
  const thisWeekStartDate = startOfWeek(givenDate);
  const nextWeekStartDate = addDays(thisWeekStartDate, 7);
  return formatDate(nextWeekStartDate);
}

export const getNextWeekEnd = (dateString) => {
  const givenDate = new Date(dateString);
  const nextWeekStartDate = getNextWeekStart(dateString);
  const nextWeekEndDate = addDays(new Date(nextWeekStartDate), 6);
  return formatDate(nextWeekEndDate);
}

export const getNextMonthStart = (dateString) => {
  const givenDate = new Date(dateString);
  const startOfNextMonth = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 1);
  return formatDate(startOfNextMonth);
}

export const getNextMonthEnd = (dateString) => {
  const givenDate = new Date(dateString);
  const endOfNextMonth = new Date(givenDate.getFullYear(), givenDate.getMonth() + 2, 0);
  return formatDate(endOfNextMonth);
}

export const tomorrow = (today = new Date()) => {
  const tomorrowDate = addDays(today, 1);
  return formatDate(tomorrowDate);
}

export const yesterday = (today = new Date()) => {
  const yesterdayDate = subDays(today, 1);
  return formatDate(yesterdayDate);
}
