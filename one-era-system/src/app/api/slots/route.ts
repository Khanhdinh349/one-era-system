import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  let db;
  try {
    // Đường dẫn trỏ thẳng sang folder BE
    const dbPath = path.resolve(process.cwd(), '..', 'one-era-api', 'one-era.db');
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Lấy tất cả dữ liệu, không quan tâm trạng thái DELETED hay không
    const registrations = await db.all('SELECT * FROM registrations');
    
    await db.close();
    return NextResponse.json(registrations);
  } catch (error: any) {
    if (db) await db.close();
    console.error("Lỗi đọc Database:", error.message);
    // Trả về mảng rỗng để giao diện không bị lỗi 500
    return NextResponse.json([], { status: 200 });
  }
}