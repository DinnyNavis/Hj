const Plant = require('../models/Plant');
const Signup = require('../models/Signup');

exports.addPlant = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const user = await Signup.findById(token);
        if (!user) return res.status(401).json({ message: 'Invalid user' });

        const newPlant = await Plant.create({ ...req.body, userId: user._id });
        res.json(newPlant);
    } catch {
        res.status(500).json({ message: 'Failed to add plant' });
    }
};

exports.getPlants = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const plants = await Plant.find({ userId: token });
        res.json(plants);
    } catch {
        res.status(500).json({ message: 'Failed to fetch plants' });
    }
};

exports.deletePlant = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        await Plant.deleteOne({ _id: req.params.id, userId: token });
        res.json({ message: 'Plant deleted' });
    } catch {
        res.status(500).json({ message: 'Failed to delete plant' });
    }
};
