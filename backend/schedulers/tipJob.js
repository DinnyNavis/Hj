// schedulers/tipJob.js

const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const { sendEmail } = require('../services/emailService');
const { hasTipBeenSent, markTipAsSent } = require('../utils/tipTracker');

const tips = {
  5: 'Crushed eggshells boost calcium for stronger stems.',
  10: 'Onion peels enrich soil with potassium and phosphorus.',
  15: 'Banana peel water adds magnesium and helps blooming.',
  20: 'Used tea leaves improve soil texture and nutrient levels.'
};

const sendOrganicTips = async () => {
  console.log('[NODE-CRON] Running organic tips job');

  try {
    const plants = await Plant.find({}).lean();
    const today = new Date();

    for (const plant of plants) {
      const user = await Signup.findById(plant.userId);
      if (!user || !user.email) continue;

      const daysOld = Math.floor((today - new Date(plant.datePlanted)) / (1000 * 60 * 60 * 24));

      if (tips[daysOld] && !hasTipBeenSent(plant._id, daysOld)) {
        const subject = `🌱 Organic Tip for ${plant.plantName || 'Your Plant'}`;
        const text = `Hi ${user.name || 'Grower'},\n\nHere's your day ${daysOld} tip:\n\n${tips[daysOld]}\n\n– Team Growlify`;

        await sendEmail({ to: user.email, subject, text });
        markTipAsSent(plant._id, daysOld);

        console.log(`[TIP SENT] Day ${daysOld} tip sent to ${user.email} for ${plant.plantName}`);
      }
    }
  } catch (err) {
    console.error('[NODE-CRON] Error in organic tip job:', err);
  }
};

module.exports = { sendOrganicTips };
