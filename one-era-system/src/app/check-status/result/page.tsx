'use client'
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '@/app/register/visitor/visitor.module.css';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get('phone');
  const lang = searchParams.get('lang') || 'vi';
  
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t: any = {
    vi: {
      title: "THÔNG TIN TRA CỨU",
      notFound: "KHÔNG TÌM THẤY THÔNG TIN",
      back: "TRA CỨU LẠI",
      date: "Ngày tham quan",
      time: "Khung giờ",
      guests: "Số người",
      agency: "Đại lý",
      custName: "Khách đi cùng",
      staff: "Nhân viên đăng ký",
      loading: "Đang tải dữ liệu...",
      emptyMsg: "Rất tiếc, không có dữ liệu đăng ký cho số này."
    },
    en: {
      title: "SEARCH RESULT",
      notFound: "INFORMATION NOT FOUND",
      back: "SEARCH AGAIN",
      date: "Visit Date",
      time: "Time Slot",
      guests: "Total Guests",
      agency: "Agency",
      custName: "Customer Name",
      staff: "Staff Name",
      loading: "Loading...",
      emptyMsg: "Sorry, no registration data found for this number."
    }
  }[lang] || { vi: {} };

  useEffect(() => {
    if (phone) {
      // Gọi API với tham số phone (hoặc contact) đã được xử lý trim ở BE
      fetch(`http://localhost:3001/registrations/check?phone=${phone.trim()}`)
        .then(res => res.json())
        .then(json => {
          setData(json);
          setLoading(false);
        })
        .catch(err => {
          console.error("Lỗi kết nối API:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [phone]);

  if (loading) return (
    <div className={styles.glassContainer}>
      <div className="text-white text-center py-20 animate-pulse">{t.loading}</div>
    </div>
  );

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-10">
        <div onClick={() => router.push(`/check-status?lang=${lang}`)} className="cursor-pointer text-[#B3ABC4] hover:text-[#5DA9DD] transition-colors">
          <span className="text-sm font-bold uppercase tracking-widest">← {t.back}</span>
        </div>
        <img src="/images/logo-one-era.png" alt="Logo One Era" className="w-24" />
      </div>

      <h1 className={styles.title} style={{ color: '#5DA9DD', fontSize: '24px', marginBottom: '30px' }}>
        {data.length > 0 ? t.title : t.notFound}
      </h1>

      <div className="max-w-md mx-auto space-y-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
              {/* Badge phân loại */}
              <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-black uppercase tracking-tighter ${
                item.type === 'AGENCY' ? 'bg-[#F79552]' : 'bg-[#5DA9DD]'
              }`}>
                {item.type}
              </div>

              <div className="space-y-4">
                {/* Thông tin chính */}
                <div>
                  <p className="text-[10px] text-[#B3ABC4] uppercase tracking-widest mb-1">
                    {item.type === 'AGENCY' ? t.staff : "Họ tên"}
                  </p>
                  <p className="text-white font-bold text-lg uppercase">{item.fullName}</p>
                </div>

                {/* Nếu là Agency thì hiện thêm Tên Đại Lý và Khách đi cùng */}
                {item.type === 'AGENCY' && (
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <p className="text-[9px] text-[#B3ABC4] uppercase mb-1">{t.agency}</p>
                      <p className="text-[#F79552] font-bold text-sm">{item.agencyName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#B3ABC4] uppercase mb-1">{t.custName}</p>
                      <p className="text-white font-medium text-sm">
                        {item.customerName || 'N/A'} {item.customerPhoneSuffix ? `(***${item.customerPhoneSuffix})` : ''}
                      </p>
                    </div>
                  </div>
                )}

                {/* Thông tin lịch hẹn */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="bg-white/5 p-2 rounded-xl text-center">
                    <p className="text-[8px] text-[#B3ABC4] uppercase mb-1">{t.date}</p>
                    <p className="text-white font-bold text-[11px]">{item.date}</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl text-center">
                    <p className="text-[8px] text-[#B3ABC4] uppercase mb-1">{t.time}</p>
                    <p className="text-white font-bold text-[11px]">{item.timeSlot}</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl text-center">
                    <p className="text-[8px] text-[#B3ABC4] uppercase mb-1">{t.guests}</p>
                    <p className="text-white font-bold text-[11px]">{1 + (Number(item.guests) || 0)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-white/60 text-sm italic">{t.emptyMsg}</p>
          </div>
        )}

        <button 
          onClick={() => router.push(`/check-status?lang=${lang}`)}
          className={styles.btnSubmit}
          style={{ backgroundColor: '#5DA9DD', marginTop: '30px' }}
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}