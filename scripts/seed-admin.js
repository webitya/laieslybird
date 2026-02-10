const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Define a simple Schema for seeding
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    role: String,
});

async function seed() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.error('MONGODB_URI not found in env');
        process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const email = process.env.ADMIN_EMAIL || 'admin@laieslybird.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = 'Admin User';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('Admin user already exists');
    } else {
        const passwordHash = await bcrypt.hash(password, 12);
        await User.create({
            name,
            email,
            passwordHash,
            role: 'admin',
        });
        console.log('Admin user created successfully');
    }

    await mongoose.disconnect();
    console.log('Disconnected');
}

seed().catch(console.error);
