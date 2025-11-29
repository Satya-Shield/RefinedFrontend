import connectDB from "@/config/database";
import History from "@/models/History";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';


export const GET = async (request) => {
  try {
    await connectDB();

    // 1. Get the current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Find the user in our database by clerkId, or create/update if needed
    let user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      // Try finding by email in case user exists with old clerkId
      user = await User.findOne({ email: clerkUser.emailAddresses[0]?.emailAddress });

      if (user) {
        // Update the clerkId if user exists with different clerkId
        user.clerkId = clerkUser.id;
        await user.save();
        console.log('Updated user clerkId:', user.email);
      } else {
        // Create new user if doesn't exist at all
        user = await User.create({
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress.split('@')[0] || 'user',
          image: clerkUser.imageUrl || '',
        });
        console.log('Auto-created user:', user.email);
      }
    }

    // 3. Find all history records for that user and sort by newest first
    const histories = await History.find({ user: user._id }).sort({ createdAt: -1 }).lean();

    // 4. Return the data
    return NextResponse.json(histories);

  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    // 1. Get the current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Find the user in our database by clerkId, or create/update if needed
    let user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      // Try finding by email in case user exists with old clerkId
      user = await User.findOne({ email: clerkUser.emailAddresses[0]?.emailAddress });

      if (user) {
        // Update the clerkId if user exists with different clerkId
        user.clerkId = clerkUser.id;
        await user.save();
        console.log('Updated user clerkId:', user.email);
      } else {
        // Create new user if doesn't exist at all
        user = await User.create({
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress.split('@')[0] || 'user',
          image: clerkUser.imageUrl || '',
        });
        console.log('Auto-created user:', user.email);
      }
    }

    // 3. Get the data from the request body
    const data = await request.json();
    console.log("Received data: ", data);

    // 4. Create a new history object, making sure to include the userId
    const newHistoryItem = new History({
      ...data, // Spread all the fields from the request (claim, verdict, etc.)
      user: user._id, // Add the user ID to link it
    });

    // 5. Save to the database
    await newHistoryItem.save();
    console.log('Saved history item: ', newHistoryItem._id);

    // 6. Return a success response
    return new NextResponse(JSON.stringify(newHistoryItem), { status: 201 }); // 201 = Created

  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};