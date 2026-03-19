'use client'
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function MeetingRoomsContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const dict: any = {
    vi: {
      title: "QUẢN LÝ PHÒNG HỌP & VIP",
      status: "Trạng thái",
      book: "Đặt phòng ngay",
      rooms: [
        { name: "Phòng VIP 01 (Diamond)", cap: "6-8 người", status: "Trống", color: "text-[#5DA9DD]" },
        { name: "Phòng VIP 02 (Ruby)", cap: "4 người", status: "Đang họp", color: "text-[#F79552]" },
        { name: "Phòng Hội thảo (Empire)", cap: "20 người", status: "Trống", color: "text-[#5DA9DD]" },
      ]
    },
    en: {
      title: "MEETING ROOMS & VIP",
      status: "Status",
      book: "Book Now",
      rooms: [
        { name: "VIP Room 01 (Diamond)", cap: "6-8 pax", status: "Available", color: "text-[#5DA9DD]" },
        { name: "VIP Room 02 (Ruby)", cap: "4 pax", status: "Occupied", color: "text-[#F79552]" },
        { name: "Conference (Empire)", cap: "20 pax", status: "Available", color: "text-[#5DA9DD]" },
      ]
    }
  };

  const t = dict[lang] || dict.vi;

  return (
    <div className="h-full w-full p-10 flex flex-col overflow-hidden animate-in fade-in duration-700 bg-[#F7F9FC]">
      {/* Header với màu xanh chủ đạo One Era */}
      <h1 className="text-3xl font-black text-[#5DA9DD] uppercase tracking-tight mb-10 border-l-8 border-[#F79552] pl-6">
        {t.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.rooms.map((room: any, idx: number) => (
          <div key={idx} className="bg-white rounded-[40px] p-10 shadow-sm border border-[#B3ABC4]/20 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-24 h-24 bg-[#5DA9DD]/10 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-[#5DA9DD] group-hover:text-white transition-colors duration-500">
              🏢
            </div>
            <h3 className="font-black text-[#4A8DB7] text-xl mb-2 uppercase tracking-tighter">{room.name}</h3>
            <p className="text-[#B3ABC4] text-[10px] mb-8 uppercase tracking-[0.2em] font-bold italic">{room.cap}</p>
            
            <div className="w-full border-t border-gray-50 pt-8 flex justify-between items-center">
              <span className={`text-[10px] font-black uppercase tracking-widest ${room.color}`}>
                ● {room.status}
              </span>
              <button className="bg-[#5DA9DD] text-white text-[10px] px-6 py-2.5 rounded-full font-black uppercase tracking-widest hover:bg-[#F79552] shadow-lg shadow-[#5DA9DD]/20 transition-all">
                {t.book}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Phần ghi chú sử dụng màu Neutral Lavender Grey */}
      <div className="mt-12 bg-gradient-to-r from-[#4A8DB7] to-[#5DA9DD] rounded-[40px] p-10 text-white shadow-2xl shadow-[#5DA9DD]/30">
         <h3 className="font-black uppercase tracking-[0.3em] text-[10px] mb-6 text-[#F79552]">
           Ghi chú vận hành / Operational Notes
         </h3>
         <div className="space-y-4">
            <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-sm">
                <span className="text-2xl">⚠️</span>
                <p className="text-sm leading-relaxed font-medium opacity-90">
                   {lang === 'vi' 
                    ? "Phòng Diamond cần chuẩn bị trà nóng cho đoàn đối tác vào lúc 15:00 hôm nay." 
                    : "Diamond Room needs hot tea preparation for partners at 15:00 today."}
                </p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default function MeetingRoomsPage() {
  return <Suspense><MeetingRoomsContent /></Suspense>;
}