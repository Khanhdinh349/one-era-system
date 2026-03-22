'use client'
import React, { useEffect, useState, useMemo } from 'react';
import styles from './calendar.module.css';
import { ChevronLeft, ChevronRight, Download, User, Phone, X, Calendar as CalendarIcon } from 'lucide-react';

export default function FullCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [startDate, setStartDate] = useState(new Date());

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/slots'); 
      const data = await res.json();
      if (Array.isArray(data)) setEvents(data);
    } catch (error) {
      console.error("Lỗi kết nối database:", error);
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
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg"><CalendarIcon size={20} /></div>
          <div>
            <h1 className="text-md font-black text-slate-800 leading-none uppercase">ONE ERA SYSTEM</h1>
            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Quản trị viên</p>
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

      {/* Grid Lịch */}
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
                          <span className={styles.eventSub}>👤 {reg.fullName?.split(' ').pop()}</span>
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

      {/* MODAL CHI TIẾT - CĂN GIỮA TUYỆT ĐỐI */}
      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div 
            className="bg-white p-0 rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" 
            onClick={e => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className={`p-8 ${selected.type === 'AGENCY' ? 'bg-orange-500' : 'bg-blue-600'} text-white relative`}>
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"><X size={20}/></button>
              <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                Visitor Type: {selected.type}
              </span>
              <h2 className="text-3xl font-black mt-4 uppercase leading-none tracking-tighter">{selected.agencyName || selected.fullName}</h2>
            </div>

            {/* Body Modal */}
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100"><User size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Người đăng ký</p>
                    <p className="text-base font-black text-slate-800">{selected.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100"><Phone size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Liên hệ</p>
                    <p className="text-base font-black text-slate-800">{selected.phoneNumber || selected.phone || 'Chưa có số'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-[1.2rem] shadow-sm flex flex-col items-center justify-center text-blue-600 border border-blue-50">
                   <span className="text-[10px] font-black leading-none uppercase">Giờ</span>
                   <span className="text-lg font-black tracking-tighter">{selected.timeSlot}</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Ngày tham quan</p>
                  <p className="text-xl font-black text-slate-800 tracking-tight">{selected.date}</p>
                </div>
              </div>

              <button onClick={() => setSelected(null)} className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg">Xác nhận thông tin</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}