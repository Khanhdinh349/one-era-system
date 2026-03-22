'use client'
import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f0f4f8] font-sans">
      
      {/* Sidebar - Sử dụng tông Xanh chủ đạo của dự án */}
      <div className="w-[280px] bg-[#4A8DB7] text-white flex flex-col shrink-0 shadow-2xl z-20">
        <div className="p-10 text-center bg-[#5DA9DD]/20">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#5DA9DD] to-[#B3ABC4] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg border-2 border-white/20">
            👤
          </div>
          <h2 className="font-black text-xl tracking-tighter uppercase">One Era</h2>
          <p className="text-[10px] text-[#F79552] font-black tracking-[0.2em] mt-1">
            {lang === 'vi' ? 'QUẢN TRỊ VIÊN' : 'SYSTEM ADMIN'}
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
           {[
             { name: lang === 'vi' ? 'Bảng điều khiển' : 'Dashboard', icon: '📊', path: '/admin/dashboard' },
             { name: lang === 'vi' ? 'Lịch đăng ký' : 'Calendar', icon: '📅', path: '/admin/calendar' },
             { name: lang === 'vi' ? 'Phòng họp & VIP' : 'Meeting Rooms', icon: '🏢', path: '/admin/meeting-rooms' },
           ].map((item) => (
            <Link key={item.path} href={`${item.path}?lang=${lang}`}>
              <div className={`flex items-center p-4 rounded-2xl transition-all cursor-pointer ${pathname.includes(item.path) ? 'bg-white text-[#5DA9DD] font-bold shadow-xl translate-x-1' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <span className="mr-4 text-xl">{item.icon}</span>
                <span className="text-sm tracking-wide uppercase">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10 bg-[#4481A8]">
           <Link href={`/?lang=${lang}`} className="text-[11px] text-white/50 hover:text-[#F79552] transition-colors font-bold tracking-[0.2em]">
             {lang === 'vi' ? 'ĐĂNG XUẤT' : 'LOGOUT'} →
           </Link>
        </div>
      </div>

      <main className="flex-1 flex flex-col min-w-0 bg-[#F7F9FC] relative">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Suspense><AdminLayoutContent>{children}</AdminLayoutContent></Suspense>;
}