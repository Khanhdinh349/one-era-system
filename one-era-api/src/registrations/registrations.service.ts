import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import { join } from 'path';

@Injectable()
export class RegistrationsService implements OnModuleInit {
  private db: Database.Database;

  onModuleInit() {
    const dbPath = join(process.cwd(), 'one-era.db');
    this.db = new Database(dbPath);

    // Tạo bảng nếu chưa có
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT,
        phoneNumber TEXT,
        cccd TEXT,
        guests INTEGER DEFAULT 0,
        date TEXT,
        timeSlot TEXT,
        type TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Lệnh này giúp tự động thêm các cột mới vào bảng cũ mà không làm mất dữ liệu
    const columns = [
      { name: 'agencyName', type: 'TEXT' },
      { name: 'customerName', type: 'TEXT' },
      { name: 'customerPhoneSuffix', type: 'TEXT' }
    ];

    columns.forEach(col => {
      try {
        this.db.exec(`ALTER TABLE registrations ADD COLUMN ${col.name} ${col.type}`);
        console.log(`+ Đã bổ sung cột: ${col.name}`);
      } catch (e) {
        // Cột đã tồn tại thì bỏ qua
      }
    });

    console.log('✅ Database One Era (Agency Ready) đã sẵn sàng!');
  }

  async create(data: any) {
    // Logic chặn 40 người (giữ nguyên)
    const stmtCount = this.db.prepare(
      'SELECT SUM(1 + guests) as total FROM registrations WHERE date = ? AND timeSlot = ?'
    );
    const row = stmtCount.get(data.date, data.timeSlot) as { total: number };
    const totalCurrent = row?.total || 0;
    const newComing = 1 + Number(data.guests || 0);

    if (totalCurrent + newComing > 40) {
      throw new BadRequestException(`Khung giờ này đã có ${totalCurrent} người. Không thể nhận thêm.`);
    }

    const stmtInsert = this.db.prepare(`
      INSERT INTO registrations (
        fullName, phoneNumber, cccd, agencyName, 
        customerName, customerPhoneSuffix, guests, date, timeSlot, type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmtInsert.run(
      data.fullName?.trim() || '',
      data.phoneNumber?.trim() || '',
      data.cccd?.trim() || '',
      data.agencyName?.trim() || null,
      data.customerName?.trim() || null,
      data.customerPhoneSuffix?.trim() || null,
      Number(data.guests) || 0,
      data.date,
      data.timeSlot,
      data.type || 'AGENCY'
    );

    return { id: result.lastInsertRowid, ...data };
  }

  async findByContact(contact: string) {
    const clean = contact?.trim() || '';
    return this.db.prepare(
      "SELECT * FROM registrations WHERE phoneNumber LIKE ? OR cccd LIKE ? ORDER BY createdAt DESC"
    ).all(`%${clean}%`, `%${clean}%`);
  }

  async findAll() {
    return this.db.prepare('SELECT * FROM registrations ORDER BY date ASC, timeSlot ASC').all();
  }
}