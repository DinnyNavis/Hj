const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const sendEmail = require('../services/emailService');
const getWeather = require('../services/weatherService');

const sendWateringReminders = async (location) => {
  console.log(`[NODE-CRON] Running watering reminder job for location: ${location}`);

  try {
    const plants = await Plant.find({});
    const users = await Signup.find({});

    for (const plant of plants) {
      if (!plant.userId) {
        console.warn(`[SKIP] Plant "${plant.plantName}" has no userId`);
        continue;
      }

      const isMatchingLocation =
        (location === '2-3 times/week' && plant.schedule === '2-3 times/week') ||
        (plant.location && plant.location.toLowerCase() === location.toLowerCase());

      if (!isMatchingLocation) continue;

      const user = users.find(u => u._id.toString() === plant.userId.toString());
      if (!user || !user.city || !user.email) {
        console.warn(`[SKIP] Missing user data for plant "${plant.plantName}" — userId: ${plant.userId}`);
        continue;
      }

      const weather = await getWeather(user.city);
      if (typeof weather === 'string' && weather.toLowerCase().includes('rain')) {
        console.log(`[SKIP] It's raining in ${user.city}, skipping email to ${user.email}`);
        continue;
      }

      // 💧 Determine watering amount
      let amount = '150ml (default)';
      if (plant.location === 'Indoor') amount = '100–150ml';
      else if (plant.location === 'Balcony') amount = '75–100ml (twice a day)';
      else if (plant.location === 'Outdoor') amount = '60–80ml (three times a day)';
      else if (plant.schedule === '2-3 times/week') amount = '200–300ml';

      const subject = `💧 Reminder: Time to water your ${plant.plantName}`;
      const body = `Hey ${user.name || 'gardener'},\n\n🌱 Don't forget to water your ${plant.plantName} today.\n💧 Recommended amount: ${amount}.\n\nHappy Gardening!\n– Team Growlify`;

      if (!user.email) {
        console.error(`❌ Cannot send email — user.email is undefined for plant "${plant.plantName}", userId: ${plant.userId}`);
        continue;
      }

      console.log(`📤 Sending email to ${user.email} for plant: ${plant.plantName}`);

      // ✅ Corrected: object-style email sending
      await sendEmail({
        to: user.email,
        subject,
        text: body
      });

      console.log(`[EMAIL SENT] to ${user.email} for ${plant.plantName}`);
    }
  } catch (err) {
    console.error('[NODE-CRON] Error in watering reminder:', err);
  }
};

module.exports = { sendWateringReminders };
