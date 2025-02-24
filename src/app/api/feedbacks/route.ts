import { NextResponse } from 'next/server';
import { getAllFeedbacks } from '@/db/queries/feedbacks';
import { Feedback } from '@/types';

export async function GET(): Promise<
  NextResponse<{ success: boolean; message?: string; data: Feedback[] | [] }>
> {
  try {
    const feedbacks = await getAllFeedbacks();
    return NextResponse.json({ success: true, data: feedbacks }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: [],
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Unknown error occured.',
          data: [],
        },
        { status: 500 }
      );
    }
  }
}
