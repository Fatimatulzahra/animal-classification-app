import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Upload from '@/lib/models/upload.model';

export async function GET(req: NextRequest) {
  try {
    const date = req.nextUrl.searchParams.get('date'); // Extract the date from query
    const userId = req.nextUrl.searchParams.get('userId'); // Extract userId from query

    // Validate input
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connect();

    // Build the date filter
    const dateFilter = {
      $gte: new Date(`${date}T00:00:00`),
      $lt: new Date(`${date}T23:59:59`),
    };

    // Fetch images from MongoDB
    const images = await Upload.find({ userId, uploadedAt: dateFilter }).exec();

    if (!images || images.length === 0) {
      return NextResponse.json([]); // Return an empty array if no images found
    }

    // Return the images in a format the frontend expects
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error fetching images:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Error fetching images', details: errorMessage },
      { status: 500 }
    );
  }
}
