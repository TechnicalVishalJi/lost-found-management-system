const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        
        let user = await User.findOne({ Email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        user = new User({ Name, Email, Password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        
        const user = await User.findOne({ Email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, Name: user.Name, Email: user.Email } });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };
