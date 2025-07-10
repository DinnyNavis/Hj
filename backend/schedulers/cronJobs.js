const cron = require('node-cron');
const { sendWateringReminders } = require('./wateringJob');
const { sendOrganicTips } = require('./tipJob');

// 💧 Indoor – every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('[NODE-CRON] Running watering reminder at 08:00 (Indoor)');
  await sendWateringReminders('Indoor');
});

// 💧 Balcony – 7:30 AM and 6:00 PM
cron.schedule('30 7 * * *', async () => {
  console.log('[NODE-CRON] Running watering reminder at 07:30 (Balcony)');
  await sendWateringReminders('Balcony');
});
cron.schedule('0 18 * * *', async () => {
  console.log('[NODE-CRON] Running watering reminder at 18:00 (Balcony)');
  await sendWateringReminders('Balcony');
});

// 💧 Outdoor – 6:30 AM, 12 PM, 6:30 PM
cron.schedule('30 6 * * *', async () => {
  console.log('[NODE-CRON] Running watering reminder at 06:30 (Outdoor)');
  await sendWateringReminders('Outdoor');
});
cron.schedule('0 12 * * *', async () => {
  console.log('[NODE-CRON] Running watering reminder at 12:00 (Outdoor)');
  await sendWateringReminders('Outdoor');
});
cron.schedule('30 18 * * *', async () => {
  console.log('[NODE-CRON] Running watering reminder at 18:30 (Outdoor)');
  await sendWateringReminders('Outdoor');
});

// 💧 2–3 times/week – Mon/Wed/Fri at 7:00 AM
cron.schedule('0 7 * * 1,3,5', async () => {
  console.log('[NODE-CRON] Running watering reminder (2–3 times/week)');
  await sendWateringReminders('2-3 times/week');
});

// 🌱 Organic tips – every day at 12:00 AM
cron.schedule('0 0 * * *', async () => {
  console.log('[NODE-CRON] Running organic tip job at midnight');
  await sendOrganicTips();
});
