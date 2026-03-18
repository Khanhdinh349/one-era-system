// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, phone, email, agency, company, target, date, time, note } = body;

    // 1. Kiểm tra dữ liệu bắt buộc
    if (!name || !phone) {
      return NextResponse.json({ error: 'Thiếu tên hoặc số điện thoại' }, { status: 400 });
    }

    // 2. Kết nối Database
    const db = await getDatabase();

    // 3. Thực hiện lưu (Insert)
    const result = await db.run(
      `INSERT INTO registrations (type, name, phone, email, organization, target, visit_date, visit_time, note) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type, 
        name, 
        phone, 
        email || '', 
        (agency || company || ''), 
        target || '', 
        date || '', 
        time || '', 
        note || ''
      ]
    );

    console.log(`[One Era Log] Đã lưu thành công ID: ${result.lastID}`);

    return NextResponse.json({ 
      message: 'Lưu dữ liệu thành công', 
      id: result.lastID 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Lỗi Server:", error);
    return NextResponse.json({ error: 'Lỗi hệ thống nội bộ' }, { status: 500 });
  }
}