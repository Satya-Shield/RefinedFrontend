// Run this script once to sync your current Clerk user to MongoDB
// Usage: node scripts/sync-user.js

import connectDB from '../config/database.js';
import User from '../models/User.js';

async function syncUser() {
    try {
        await connectDB();

        // Replace these with your actual Clerk user details
        // You can find your Clerk ID in the Clerk Dashboard or browser dev tools
        const clerkId = 'YOUR_CLERK_USER_ID'; // Replace this!
        const email = 'YOUR_EMAIL'; // Replace this!
        const username = 'YOUR_USERNAME'; // Replace this!

        const existingUser = await User.findOne({ clerkId });

        if (existingUser) {
            console.log('User already exists:', existingUser);
        } else {
            const newUser = await User.create({
                clerkId,
                email,
                username,
                image: '',
            });
            console.log('User created successfully:', newUser);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error syncing user:', error);
        process.exit(1);
    }
}

syncUser();
