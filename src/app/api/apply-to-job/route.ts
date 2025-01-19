import { addApplication } from './addApplication';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const newApp = await req.json(); // Parse the app  data from the request body
    const result = await addApplication(newApp);

    if (result.success) {
      return NextResponse.json({ success: true, id: result.id }, { status: 201 });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (err) {
    console.error('Error in API route:', err);
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
