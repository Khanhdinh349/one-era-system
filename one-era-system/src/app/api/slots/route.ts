import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Ép kiểu rõ ràng là any[] để Vercel không báo lỗi 'implicitly has type any'
    const immersionSlots: any[] = []; 
    const modelHouseSlots: any[] = []; 

    // Truy vấn dữ liệu từ bảng registrations
    const rows: any[] = await db.all(
      'SELECT * FROM registrations WHERE status IS NOT "DELETED" ORDER BY visit_date ASC'
    );

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Lỗi Database:", error);
    return NextResponse.json({ error: "Lỗi kết nối cơ sở dữ liệu" }, { status: 500 });
  }
}
