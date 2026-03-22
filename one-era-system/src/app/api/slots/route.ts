import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDatabase();
    // Lấy khách chưa bị xóa và sắp xếp theo ngày
    const rows = await db.all('SELECT * FROM registrations WHERE status IS NOT "DELETED" ORDER BY visit_date ASC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi DB" }, { status: 500 });
  }
}