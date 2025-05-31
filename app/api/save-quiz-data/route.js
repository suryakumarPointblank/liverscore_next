// Create this file: app/api/save-quiz-data/route.js
import clientPromise from '../../lib/mongodb';

export async function POST(request) {
  try {
    const { userData, totalScore } = await request.json();

    const client = await clientPromise;
    const db = client.db('liver_assessment'); // Your database name
    const collection = db.collection('quiz_results');

    const document = {
      name: userData.name,
      email: userData.email,
      city: userData.city,
      mobile: userData.mobile,
      totalScore: totalScore,
      riskLevel: totalScore >= 8 ? 'high' : 'low',
      createdAt: new Date(),
      timestamp: new Date().toISOString()
    };

    const result = await collection.insertOne(document);

    return Response.json({ 
      success: true, 
      message: 'Data saved successfully',
      id: result.insertedId 
    });

  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to save data' 
    }, { status: 500 });
  }
}

// Optional: Handle other HTTP methods
export async function GET() {
  return Response.json({ message: 'GET method not supported' }, { status: 405 });
}