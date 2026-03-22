'use client'
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const dict: any = {
    vi: {
      welcome: "TỔNG QUAN VẬN HÀNH",
      stats: {
        visitors: "TỔNG LƯỢT KHÁCH",
        agency: "ĐẠI LÝ LIÊN KẾT",
        meetings: "LỊCH HỌP VIP",
        conversion: "TỶ LỆ CHỐT"
      },
      charts: {
        weekly: "LƯU LƯỢNG KHÁCH THEO TUẦN",
        ratio: "CƠ CẤU ĐỐI TÁC",
        retail: "Khách lẻ",
        partner: "Đối tác DN"
      }
    },
    en: {
      welcome: "OPERATIONAL OVERVIEW",
      stats: {
        visitors: "TOTAL VISITORS",
        agency: "AGENCIES",
        meetings: "VIP MEETINGS",
        conversion: "CONVERSION"
      },
      charts: {
        weekly: "WEEKLY VISITOR TRAFFIC",
        ratio: "PARTNER COMPOSITION",
        retail: "Retail",
        partner: "Corporate"
      }
    }
  };

  const t = dict[lang] || dict.vi;

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col overflow-hidden animate-in fade-in duration-700 p-2">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div className="relative">
           <h1 className="text-4xl font-black text-[#5DA9DD] tracking-tighter leading-none mb-1">{t.welcome}</h1>
           <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-[#F79552] rounded-full"></div>
              <p className="text-[#B3ABC4] text-[9px] font-bold tracking-[0.4em] uppercase">One Era Township Strategy</p>
           </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/40 text-[10px] font-bold text-[#5DA9DD]">
          {new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-4 gap-6 mb-8 shrink-0">
        {[
          { label: t.stats.visitors, val: "1,259", bg: "bg-gradient-to-br from-[#5DA9DD] to-[#4a8db7]", txt: "text-white" },
          { label: t.stats.agency, val: "42", bg: "bg-white", txt: "text-[#5DA9DD]" },
          { label: t.stats.meetings, val: "08", bg: "bg-gradient-to-br from-[#F79552] to-[#e67e35]", txt: "text-white" },
          { label: t.stats.conversion, val: "12.5%", bg: "bg-white", txt: "text-[#B3ABC4]" }
        ].map((card, idx) => (
          <div key={idx} className={`${card.bg} p-6 rounded-[2.5rem] shadow-xl shadow-[#5DA9DD]/5 border border-white/20 flex flex-col justify-center transition-transform hover:scale-[1.02]`}>
            <p className={`text-[9px] font-black tracking-widest opacity-70 mb-2 ${card.txt}`}>{card.label}</p>
            <h3 className={`text-4xl font-black ${card.txt}`}>{card.val}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-3 gap-8 min-h-0">
        
        {/* Weekly Bar Chart */}
        <div className="col-span-2 bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl shadow-[#B3ABC4]/10 border border-white/60 flex flex-col">
          <div className="flex justify-between items-center mb-10 shrink-0">
            <h3 className="font-black text-[#5DA9DD] text-[11px] tracking-[0.2em]">{t.charts.weekly}</h3>
            <div className="flex gap-2">
               <span className="w-2.5 h-2.5 rounded-full bg-[#5DA9DD]"></span>
               <span className="w-2.5 h-2.5 rounded-full bg-[#F79552]"></span>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-around gap-6 px-4 min-h-0">
            {[45, 85, 60, 95, 70, 50, 80].map((h, i) => (
              <div key={i} className="group relative flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-[#5DA9DD] to-[#B3ABC4] rounded-2xl transition-all duration-500 group-hover:from-[#F79552] group-hover:to-[#F79552] shadow-lg shadow-[#5DA9DD]/10" 
                  style={{height: `${h}%`}}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a2d42] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   {h}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Ratio Circle */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl shadow-[#B3ABC4]/10 border border-white/60 flex flex-col items-center">
          <h3 className="font-black text-[#5DA9DD] text-[11px] tracking-[0.2em] self-start mb-6 shrink-0">{t.charts.ratio}</h3>
          
          <div className="flex-1 flex flex-col justify-around w-full min-h-0">
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center shrink-0">
               <div className="absolute inset-0 rounded-full border-[22px] border-gray-50/50"></div>
               <div className="absolute inset-0 rounded-full border-[22px] border-[#F79552] border-t-transparent border-l-[#5DA9DD] rotate-[130deg] drop-shadow-md"></div>
               <div className="text-center">
                  <span className="block text-4xl font-black text-[#5DA9DD]">72%</span>
                  <span className="text-[8px] text-[#B3ABC4] font-bold uppercase tracking-widest italic">One Era Sky</span>
               </div>
            </div>

            <div className="space-y-4 px-4 w-full">
               {[
                 { label: t.charts.retail, val: "72%", color: "bg-[#5DA9DD]", txt: "text-[#5DA9DD]" },
                 { label: "Agency", val: "18%", color: "bg-[#F79552]", txt: "text-[#F79552]" },
                 { label: t.charts.partner, val: "10%", color: "bg-[#B3ABC4]", txt: "text-[#B3ABC4]" }
               ].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                       <span className="text-[10px] font-bold text-[#B3ABC4] uppercase">{item.label}</span>
                    </div>
                    <span className={`text-sm font-black ${item.txt}`}>{item.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <Suspense><DashboardContent /></Suspense>;
}