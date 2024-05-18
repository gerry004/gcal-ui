import Dexie from 'dexie';
import { getCalendars, getColors } from '../utils/api';

const dbName = 'gCal Database';
const dbVersion = 1;
const db = new Dexie(dbName);
db.version(dbVersion).stores({
  gCal: '++id, application',
});

const setupAppData = async () => {
  const appData = {
    application: 'gCal',
    calendars: [],
    colors: {},
  }

  const calendars = await getCalendars();
  calendars.forEach(cal => {
    if (cal.primary) {
      appData.calendars.push({ ...cal, defaultEventColor: '1', checked: cal.selected });
    } else {
      appData.calendars.push({ ...cal, defaultEventColor: null, checked: cal.selected });
    }
  });

  const colors = await getColors();
  appData.colors = colors;

  return await db.gCal.put(appData);
}

export const initDatabase = async () => {
  try {
    const result = await getAppData();

    if (!result) {
      await setupAppData();
    }

    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getAppData = async () => {
  const appData = await db.gCal.where('application').equals('gCal').first();
  return appData;
}

export const updateAppData = async (newAppData) => {
  await db.gCal.put(newAppData);
}

export const getDatabaseFirstValue = async (where, value) => {
  return await db.gCal.where(where).equals(value).first();
}