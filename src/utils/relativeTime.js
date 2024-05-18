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
