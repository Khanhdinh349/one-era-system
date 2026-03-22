import { NextResponse } from 'next/server';

export async function GET() {
  // Thêm ': any[]' để ép kiểu, Vercel sẽ không bắt bẻ nữa
  const immersionSlots: any[] = []; 
  const modelHouseSlots: any[] = []; 

  return NextResponse.json({ immersionSlots, modelHouseSlots });
}