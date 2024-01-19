const bcrypt = require('bcrypt');
const User = require('../models/User');

const userController = {
    signUp: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await User.create({ username, password: hashedPassword });
            req.seesion.user = newUser;
            res.redirect('/dashboard');

        } catch (error) {
            console.error(error);
                res.status(500).send('Server Error');

        }
    }
};

module.exports = userController;