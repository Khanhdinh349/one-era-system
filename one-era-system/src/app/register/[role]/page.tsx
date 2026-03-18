'use client'
import { useSearchParams, useParams } from 'next/navigation';
import BookingForm from '@/components/BookingForm';

export default function RegisterPage() {
  const { role } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const isAgency = role === 'agency';

  return (
    <div className="glass-panel w-full max-w-4xl p-10 md:p-14 mx-4">
      {/* Header Form */}
      <div className="text-center mb-12">
        <h1 className="text-white text-2xl font-light tracking-[0.3em] uppercase mb-4">
          {lang === 'vi' ? 'Đăng ký tham quan' : 'Tour Registration'}
        </h1>
        <div className="h-[1px] w-24 bg-gold/50 mx-auto"></div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Cột trái: Thông tin cá nhân */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/60 text-[10px] uppercase tracking-widest ml-2">Full Name</label>
            <input type="text" placeholder="..." className="luxury-input" />
          </div>
          
          <div className="space-y-2">
            <label className="text-white/60 text-[10px] uppercase tracking-widest ml-2">Phone Number</label>
            <input type="text" placeholder="..." className="luxury-input" />
          </div>

          {isAgency && (
             <div className="space-y-2 animate-in slide-in-from-left duration-500">
                <label className="text-white/60 text-[10px] uppercase tracking-widest ml-2">Agency Name</label>
                <input type="text" placeholder="..." className="luxury-input" />
             </div>
          )}
        </div>

        {/* Cột phải: Chọn khung giờ (Dùng Component cũ bạn đã tạo) */}
        <div className="space-y-8">
          <BookingForm 
            type="immersion" 
            lang={lang as any} 
            title={lang === 'vi' ? "Phòng Immersion (25p)" : "Immersion Room"} 
          />
          <BookingForm 
            type="model" 
            lang={lang as any} 
            title={lang === 'vi' ? "Sa bàn & Nhà mẫu (90p)" : "Model House Tour"} 
          />
        </div>

        {/* Nút gửi */}
        <div className="lg:col-span-2 pt-6">
          <button className="w-full py-5 bg-white/90 hover:bg-gold text-black font-bold rounded-2xl transition-all duration-500 uppercase tracking-[0.2em] text-[11px] shadow-2xl active:scale-[0.98]">
            {lang === 'vi' ? 'Gửi thông tin đăng ký' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </div>
  );
}