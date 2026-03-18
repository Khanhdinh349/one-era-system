import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Kết nối tới file database cục bộ (tự tạo nếu chưa có)
  const db = await open({
    filename: './one_era_data.db',
    driver: sqlite3.Database
  });

  // Tạo bảng nếu chưa tồn tại (chỉ chạy lần đầu)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT, name TEXT, phone TEXT, email TEXT, 
      target TEXT, date TEXT, time TEXT, note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Lưu dữ liệu
  await db.run(
    `INSERT INTO registrations (type, name, phone, email, target, date, time, note) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [body.type, body.name, body.phone, body.email, body.target, body.date, body.time, body.note]
  );

  return NextResponse.json({ message: "Lưu thành công vào Database nội bộ!" });
}