import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

// 1. Định nghĩa kiểu dữ liệu (Interface) để Vercel không báo lỗi 'any'
interface Registration {
  id: number;
  fullName: string;
  phoneNumber: string;
  visit_date: string;
  timeSlot: string;
  guests: number;
  type: string;
  status: string;
  agencyName?: string;
}

export async function GET() {
  try {
    const db = await getDatabase();
    
    // 2. Gán kiểu Registration[] cho kết quả trả về từ DB
    const rows: Registration[] = await db.all(
      'SELECT * FROM registrations WHERE status IS NOT "DELETED" ORDER BY visit_date ASC'
    );

    // 3. Nếu Khánh có khai báo các mảng trống để xử lý logic, hãy thêm Type cho chúng
    // Ví dụ nếu bạn cần dùng các biến mà Vercel báo lỗi:
    const immersionSlots: any[] = []; 
    const modelHouseSlots: any[] = [];

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Lỗi Database:", error);
    return NextResponse.json({ error: "Lỗi kết nối cơ sở dữ liệu" }, { status: 500 });
  }
}