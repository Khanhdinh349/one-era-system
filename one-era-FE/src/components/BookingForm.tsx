'use client'
import { useState, useEffect } from 'react';

interface Props { type: 'immersion' | 'model'; lang: 'vi' | 'en'; title: string; }

export default function BookingForm({ type, lang, title }: Props) {
  const [slots, setSlots] = useState<string[]>([]);
  // Giả lập các khung giờ đã bị đăng ký đầy (Sau này sẽ lấy từ API)
  const fullSlots = ["09:50", "13:30"]; 

  useEffect(() => {
    const list = [];
    let current = new Date();
    current.setHours(9, 0, 0); // Bắt đầu từ 9h
    const step = type === 'immersion' ? 25 : 90; // 25p hoặc 1h30p

    while (current.getHours() < 17) {
      const timeStr = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      list.push(timeStr);
      current.setMinutes(current.getMinutes() + step);
    }
    setSlots(list);
  }, [type]);

  return (
    <div className="bg-white/40 p-5 rounded-2xl border border-white/30">
      <h3 className="font-bold text-blue-900 mb-4 uppercase text-sm">{title}</h3>
      <div className="grid grid-cols-3 gap-2">
        {slots.map(slot => {
          const isFull = fullSlots.includes(slot);
          return (
            <button
              key={slot}
              disabled={isFull}
              type="button"
              className={`py-2 text-sm rounded-lg border transition-all ${
                isFull 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-40' 
                : 'bg-white hover:bg-blue-900 hover:text-white border-blue-200'
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}