'use client'
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CalendarContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const dict: any = {
    vi: {
      title: "LỊCH TRÌNH THAM QUAN",
      filter: "Bộ lọc đối tượng",
      all: "Tất cả", visitor: "Khách lẻ", agency: "Đại lý", partner: "Đối tác",
      days: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      stats: "Hôm nay có 12 lượt hẹn tham quan Sales Gallery"
    },
    en: {
      title: "VISIT SCHEDULE",
      filter: "Category Filter",
      all: "All", visitor: "Retail", agency: "Agency", partner: "Partner",
      days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      stats: "12 appointments today at Sales Gallery"
    }
  };

  const t = dict[lang] || dict.vi;
  const [filter, setFilter] = useState('all');
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="h-full w-full p-10 flex flex-col overflow-hidden animate-in fade-in duration-700 bg-[#F7F9FC]">
      {/* Header với dải màu Sunset Orange đặc trưng */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-[#5DA9DD] uppercase tracking-tighter leading-none">
            {t.title}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-1 w-16 bg-[#F79552] rounded-full"></div>
            <p className="text-[#B3ABC4] text-[10px] font-black uppercase tracking-[0.3em]">{t.stats}</p>
          </div>
        </div>
        
        {/* Filter với màu Xanh bầu trời */}
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-[#B3ABC4]/20">
          {['all', 'visitor', 'agency', 'partner'].map((item) => (
            <button 
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === item ? 'bg-[#5DA9DD] text-white shadow-lg shadow-[#5DA9DD]/20' : 'text-[#B3ABC4] hover:bg-[#F7F9FC] hover:text-[#5DA9DD]'}`}
            >
              {t[item]}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white rounded-[40px] shadow-2xl shadow-[#B3ABC4]/10 border border-white overflow-hidden flex flex-col min-h-0">
        {/* Header Thứ - Tông màu Neutral Lavender */}
        <div className="grid grid-cols-7 bg-[#B3ABC4]/10 border-b border-[#B3ABC4]/10 py-5 shrink-0">
          {t.days.map((day: string) => (
            <div key={day} className="text-center text-[10px] font-black tracking-[0.3em] text-[#4A8DB7] uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Ô ngày - Tự động co giãn để fix viewport */}
        <div className="flex-1 grid grid-cols-7 min-h-0 overflow-hidden border-l border-[#B3ABC4]/5">
          {calendarDays.map((day) => (
            <div key={day} className="border-r border-b border-[#B3ABC4]/5 p-4 hover:bg-[#5DA9DD]/5 transition-colors group relative flex flex-col">
              <span className="text-sm font-black text-[#B3ABC4] group-hover:text-[#5DA9DD] transition-colors">
                {day < 10 ? `0${day}` : day}
              </span>
              
              {/* Giả lập các booking với màu sắc thương hiệu */}
              {day === 19 && (
                <div className="mt-2 space-y-1.5 overflow-hidden">
                  <div className="bg-[#5DA9DD]/10 text-[#4A8DB7] text-[9px] p-2 rounded-xl font-black border-l-4 border-[#5DA9DD] truncate shadow-sm">
                    10:30 • VIP DIAMOND
                  </div>
                  <div className="bg-[#F79552]/10 text-[#e67e35] text-[9px] p-2 rounded-xl font-black border-l-4 border-[#F79552] truncate shadow-sm">
                    14:00 • AGENCY EVENT
                  </div>
                </div>
              )}
              {day === 21 && (
                <div className="mt-2">
                  <div className="bg-[#B3ABC4]/10 text-[#7c758a] text-[9px] p-2 rounded-xl font-black border-l-4 border-[#B3ABC4] truncate shadow-sm">
                    09:00 • RETAIL TOUR
                  </div>
                </div>
              )}

              {/* Hiệu ứng trang trí góc */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F79552] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return <Suspense><CalendarContent /></Suspense>;
}