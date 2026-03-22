'use client'
import React, { useEffect, useState, useMemo } from 'react';
import styles from './calendar.module.css';
import { ChevronLeft, ChevronRight, Download, Plus, User, Phone, X, Calendar as CalendarIcon } from 'lucide-react';

export default function FullCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [startDate, setStartDate] = useState(new Date());

  // Kết nối dữ liệu từ Backend port 3001
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:3001/registrations');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data.filter((e: any) => e.status !== 'DELETED'));
      }
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  // Tính toán 7 ngày trong tuần
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  }), [startDate]);

  const timeSlots = ["09:00", "10:30", "13:30", "15:00"];

  return (
    <div className={styles.adminContainer}>
      <div className={styles.topHeader}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg"><CalendarIcon size={20} /></div>
          <div>
            <h1 className="text-md font-black text-slate-800 leading-none">ONE ERA SYSTEM</h1>
            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">ADMIN: ONE-NAME</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className={styles.btnExcel}><Download size={14}/> XUẤT EXCEL</button>
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border">
            <button onClick={() => { const d = new Date(startDate); d.setDate(d.getDate()-7); setStartDate(d); }} className="p-1.5 hover:bg-white rounded-md"><ChevronLeft size={16}/></button>
            <span className="text-[11px] font-black px-4">{new Date(days[0]).toLocaleDateString('vi-VN')} - {new Date(days[6]).toLocaleDateString('vi-VN')}</span>
            <button onClick={() => { const d = new Date(startDate); d.setDate(d.getDate()+7); setStartDate(d); }} className="p-1.5 hover:bg-white rounded-md"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

      <div className={styles.calendarWrapper}>
        <div className={styles.calendarGrid}>
          <div className={styles.dayHeader} style={{fontSize: '11px', fontWeight: 900, color: '#94a3b8', display:'flex', alignItems:'center', justifyContent:'center'}}>GIỜ</div>
          {days.map((day) => (
            <div key={day} className={`${styles.dayHeader} ${day === new Date().toISOString().split('T')[0] ? styles.today : ''}`}>
              <p className="text-[9px] font-black text-slate-400 uppercase">{new Date(day).toLocaleDateString('vi-VN', { weekday: 'short' })}</p>
              <div className={styles.dayNum}><span className="text-lg font-black">{new Date(day).getDate()}</span></div>
            </div>
          ))}

          {timeSlots.map((slot) => (
            <React.Fragment key={slot}>
              <div className={styles.timeLabel}>{slot}</div>
              {days.map((day) => {
                const regs = events.filter(e => e.date === day && e.timeSlot === slot);
                return (
                  <div key={`${day}-${slot}`} className={styles.cell}>
                    {regs.map((reg) => (
                      <div key={reg.id} onClick={() => setSelected(reg)} className={`${styles.eventCard} ${reg.type === 'AGENCY' ? styles.agency : styles.visitor}`}>
                        <p className={styles.eventTitle}>{reg.type === 'AGENCY' ? (reg.agencyName || 'N/A') : reg.fullName}</p>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className={styles.eventSub}>👤 {reg.fullName.split(' ').pop()}</span>
                          <span className="text-[8px] font-black text-blue-600">+{reg.guests || 0}</span>
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

      {/* Modal Chi Tiết */}
      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black text-white ${selected.type === 'AGENCY' ? 'bg-orange-400' : 'bg-blue-400'}`}>{selected.type}</span>
                <button onClick={() => setSelected(null)}><X size={20}/></button>
             </div>
             <h2 className="text-2xl font-black uppercase text-slate-800 mb-6">{selected.agencyName || selected.fullName}</h2>
             <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 font-bold"><User size={18}/> {selected.fullName}</div>
                <div className="flex items-center gap-3 text-slate-600 font-bold"><Phone size={18}/> {selected.phoneNumber || selected.phone}</div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Khung giờ tham quan</p>
                  <p className="text-lg font-black text-blue-600">{selected.date} | {selected.timeSlot}</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}