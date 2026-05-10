const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const User = require('./backend/models/User');
        const users = await User.find();
        console.log('Total Users in DB:', users.length);
        console.log('Users:', users.map(u => ({ name: u.name, email: u.email })));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
