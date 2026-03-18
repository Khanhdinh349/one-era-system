// src/lib/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Biến để lưu trữ kết nối, tránh việc mở quá nhiều kết nối gây chậm máy
let db: Database | null = null;

export async function getDatabase() {
  if (db) return db;

  db = await open({
    filename: './one_era.db', // File này sẽ tự sinh ra ở thư mục gốc project
    driver: sqlite3.Database,
  });

  // Tự động tạo bảng nếu chưa có
  await db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,         -- visitor, agency, partner
      name TEXT,
      phone TEXT,
      email TEXT,
      organization TEXT, -- Tên đại lý hoặc công ty đối tác
      target TEXT,       -- Sa bàn, Nhà mẫu, Immersion Room
      visit_date TEXT,
      visit_time TEXT,
      note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}