import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Upload from '@/lib/models/upload.model';

// API route to fetch images grouped by date or for a specific date
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const userId = req.nextUrl.searchParams.get('userId');
    const date = req.nextUrl.searchParams.get('date'); 

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connect(); // Connect to MongoDB

    // Query to fetch images for the user
    let query: any = { userId };

    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1); 

      query.uploadedAt = { $gte: startDate, $lt: endDate };
    }

    // Fetch images from MongoDB
    const images = await Upload.find(query).exec();

    if (date) {
      // Return images for the specific date
      return NextResponse.json({ images });
    }

    
    const groupedImages = images.reduce((acc: any, image: any) => {
      const date = new Date(image.uploadedAt).toISOString().split('T')[0]; 
      if (!acc[date]) acc[date] = [];
      acc[date].push(image);
      return acc;
    }, {});

    // Return grouped images
    return NextResponse.json(groupedImages);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: 'Error fetching images', details: errorMessage },
      { status: 500 }
    );
  }
}
// POST route to save image and classification data
export async function POST(req: NextRequest) {
  try {
    const { imageUrl, classification, userId } = await req.json(); 

    if (!imageUrl || !classification || !userId) {
      return NextResponse.json({ 
        error: 'Image URL, classification, and user ID are required' 
      }, { status: 400 });
    }

    await connect();

    // Create a new upload entry with image, classification, and user data
    const newUpload = new Upload({
      fileUrl: imageUrl,
      classification: classification.predicted_label,
      confidence: classification.confidence,
      uploadedAt: new Date(),
      userId: userId, 
    });

    // Save the upload to MongoDB
    await newUpload.save();

    return NextResponse.json({ message: 'Upload and classification saved successfully' });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: 'Error saving upload and classification result', details: errorMessage },
      { status: 500 }
    );
  }
}