import connectDB from "@/config/database";
import History from "@/models/History";
import { auth } from "@/auth"; 
import { NextResponse } from 'next/server';


export const GET = async (request) => {
  try {
    await connectDB();

    // 1. Get the current user session
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const userId = session.user.id;

    // 2. Find all history records for that user and sort by newest first
    const histories = await History.find({ user: userId }).sort({ createdAt: -1 }).lean();

    // 3. Return the data
    return NextResponse.json(histories);

  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    // 1. Get the current user session
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const userId = session.user.id;

    // 2. Get the data from the request body
    const data = await request.json();
    console.log("Recieved data : ", data);


    // 3. Create a new history object, making sure to include the userId
    const newHistoryItem = new History({
      ...data, // Spread all the fields from the request (claim, verdict, etc.)
      user: userId, // Add the user ID to link it
    });

    // 4. Save to the database
    await newHistoryItem.save();
    console.log('Saved history item : ', newHistoryItem._id);

    // 5. Return a success response
    return new NextResponse(JSON.stringify(newHistoryItem), { status: 201 }); // 201 = Created

  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};