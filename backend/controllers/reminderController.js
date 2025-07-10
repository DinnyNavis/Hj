const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const { getWeather } = require('../services/weatherService'); // ✅ Corrected
const sendEmail = require('../services/emailService'); // ✅ Default export

exports.manualReminder = async (req, res) => {
    try {
        const plants = await Plant.find({});

        for (const plant of plants) {
            const user = await Signup.findById(plant.userId);
            if (!user || !user.city || !user.email) continue;

            const weather = await getWeather(user.city); // ✅ function now resolves correctly
            const isRainy = typeof weather === 'string' && weather.toLowerCase().includes('rain');

            if (isRainy) continue;

            const subject = `💧 Reminder to Water Your ${plant.plantName}`;
            const text = `Hi ${user.name || 'Grower'},\n\nTime to water your plant: ${plant.plantName}!\n\n– Team Growlify`;

            await sendEmail({ to: user.email, subject, text });
        }

        res.json({ message: 'Manual watering reminders sent successfully' });
    } catch (error) {
        console.error('Manual reminder error:', error.message);
        res.status(500).json({ message: 'Failed to send reminders' });
    }
};
