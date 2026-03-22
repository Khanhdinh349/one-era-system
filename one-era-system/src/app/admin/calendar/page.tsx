'use client'
import React, { useEffect, useState, useMemo } from 'react';
import styles from './calendar.module.css';
import { 
  ChevronLeft, ChevronRight, FileSpreadsheet, 
  User, Phone, Calendar as CalendarIcon, X, ShieldCheck, Trash2
} from 'lucide-react';

export default function AdminCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); 
  const [startDate, setStartDate] = useState(new Date());

  // Đảm bảo cổng này khớp với cổng JSON Server của bạn
  const API_URL = "http://localhost:3001/registrations";

  const fetchEvents = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        // Lọc bỏ khách đã xóa
        setEvents(data.filter((e: any) => e.status !== 'DELETED'));
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    }
  };

  // HÀM XÓA & LƯU LỊCH SỬ - FIX LỖI ID KHÔNG KHỚP
  const handleSoftDelete = async (id: any) => {
    if (!id) return alert("Không tìm thấy ID khách hàng.");
    
    if (!window.confirm("Khánh muốn xóa và lưu lịch sử khách này chứ?")) return;

    const now = new Date().toLocaleString('vi-VN');
    const updateData = { 
      status: "DELETED", 
      deletedAt: now,
      deletedBy: "Admin Khánh" 
    };

    try {
      // THỬ LẦN 1: Gửi ID nguyên bản
      let res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      // THỬ LẦN 2: Nếu lỗi 404, thử ép kiểu ID (từ string sang number hoặc ngược lại)
      if (res.status === 404) {
        const fallbackId = typeof id === 'string' ? parseInt(id) : String(id);
        res = await fetch(`${API_URL}/${fallbackId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData)
        });
      }

      if (res.ok) {
        setEvents(prev => prev.filter(e => e.id !== id && e.id !== parseInt(id)));
        setSelectedEvent(null);
        alert(`Đã xóa & lưu vết thành công lúc: ${now}`);
      } else {
        alert(`Lỗi ${res.status}: Không tìm thấy ID ${id} trong file db.json.`);
      }
    } catch (error) {
      alert("Lỗi kết nối Server. Khánh kiểm tra terminal đã chạy JSON Server chưa nhé.");
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  }), [startDate]);

  const timeSlots = ["09:00", "10:30", "13:30", "15:00"];

  return (
    <div className={styles.adminContainer}>
      {/* HEADER */}
      <div className={styles.topHeader}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg"><CalendarIcon size={20} /></div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 leading-tight">Lịch Tham Quan One Era</h2>
            <p className="text-[9px] text-gray-400 font-black uppercase">Quản trị CRM - Khánh</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
          <button onClick={() => { const d = new Date(startDate); d.setDate(d.getDate() - 7); setStartDate(d); }} className="p-1.5 hover:bg-white rounded-md"><ChevronLeft size={16}/></button>
          <span className="text-[12px] font-bold px-4 min-w-[160px] text-center">{new Date(days[0]).toLocaleDateString('vi-VN')} - {new Date(days[6]).toLocaleDateString('vi-VN')}</span>
          <button onClick={() => { const d = new Date(startDate); d.setDate(d.getDate() + 7); setStartDate(d); }} className="p-1.5 hover:bg-white rounded-md"><ChevronRight size={16}/></button>
        </div>
      </div>

      {/* LỊCH TRÌNH */}
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarGrid}>
          <div className={styles.timeHeaderSticky}>GIỜ</div>
          {days.map((day) => (
            <div key={day} className={`${styles.dayHeaderSticky} ${day === new Date().toISOString().split('T')[0] ? styles.today : ''}`}>
              <p className="text-[9px] font-bold text-gray-400 uppercase">{new Date(day).toLocaleDateString('vi-VN', { weekday: 'short' })}</p>
              <p className="text-xl font-light">{new Date(day).getDate()}</p>
            </div>
          ))}

          {timeSlots.map((slot) => (
            <React.Fragment key={slot}>
              <div className={styles.timeLabel}>{slot}</div>
              {days.map((day) => {
                const regs = events.filter(e => e.date === day && e.timeSlot === slot);
                return (
                  <div key={`${day}-${slot}`} className={styles.cell}>
                    {regs.map((reg, idx) => (
                      <div key={reg.id || idx} onClick={() => setSelectedEvent(reg)} className={`${styles.eventCard} ${reg.type === 'AGENCY' ? styles.agency : styles.visitor}`}>
                        <p className="font-bold text-[9px] truncate uppercase">{reg.type === 'AGENCY' ? reg.agencyName : reg.fullName}</p>
                        <div className="flex justify-between items-center text-[7px] text-gray-400 mt-1">
                          <span>👤 {reg.fullName}</span>
                          <span className="font-black text-blue-500">+{1 + (reg.guests || 0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MODAL CHI TIẾT */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className={`p-10 ${selectedEvent.type === 'AGENCY' ? 'bg-orange-50' : 'bg-blue-50/50'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase bg-blue-600 text-white">{selectedEvent.type}</span>
                <button onClick={() => setSelectedEvent(null)}><X size={28} className="text-gray-400" /></button>
              </div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{selectedEvent.type === 'AGENCY' ? selectedEvent.agencyName : selectedEvent.fullName}</h2>
            </div>
            <div className="p-10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Khung giờ</p>
                  <p className="text-xl font-bold text-blue-700">{selectedEvent.timeSlot}</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100 text-center">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Đoàn khách</p>
                  <p className="text-3xl font-black text-gray-900">{1 + (selectedEvent.guests || 0)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100"><User size={18} className="text-blue-600"/><p className="font-bold text-gray-800">{selectedEvent.fullName}</p></div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100"><Phone size={18} className="text-blue-600"/><p className="font-bold text-gray-800">{selectedEvent.phoneNumber}</p></div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100"><ShieldCheck size={18} className="text-blue-600"/><p className="font-bold text-gray-800">{selectedEvent.cccd || '123456789'}</p></div>
              </div>
              
              <button 
                onClick={() => handleSoftDelete(selectedEvent.id)} 
                className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-[2rem] font-black uppercase text-xs hover:bg-red-700 transition-all shadow-lg"
              >
                <Trash2 size={16} /> Xóa & Lưu lịch sử
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}