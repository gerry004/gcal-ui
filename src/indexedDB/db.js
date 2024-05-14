import Dexie from 'dexie';

const dbName = 'gCal Database';
const dbVersion = 1;
const db = new Dexie(dbName);
db.version(dbVersion).stores({
  gCal: '++id, application',
});

const defaultApplicationData = {
  application: 'gCal',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  calendars: [{ id: 'Gerry Yang', defaultColorId: 2 }]
};

export const initDatabase = async () => {
  try {
    const result = await db.gCal.where('application').equals('gCal').first();

    if (!result) {
      await db.gCal.put(defaultApplicationData);
    }

    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getApplicationData = async () => {
  const applicationData = await db.gCal.where('application').equals('gCal').first();
  return applicationData;
}

export const updateDatabase = async (key, value) => {
  const applicationData = getApplicationData();
  await db.gCal.update(applicationData.id, { [key]: value });
}

export const getDatabaseFirstValue = async (where, value) => {
  return await db.gCal.where(where).equals(value).first();
}