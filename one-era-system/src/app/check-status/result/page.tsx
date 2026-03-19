'use client'
import styles from '@/app/register/visitor/visitor.module.css';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang') || 'vi';

  const dict: any = {
    vi: {
      title: "THÔNG TIN ĐĂNG KÝ", sub: "MÃ ĐỊNH DANH", back: "TRA CỨU LẠI",
      print: "LƯU ẢNH XÁC NHẬN", labelType: "ĐỐI TƯỢNG", labelName: "HỌ VÀ TÊN",
      labelTarget: "NỘI DUNG THAM QUAN", labelDate: "NGÀY HẸN", labelTime: "KHUNG GIỜ"
    },
    en: {
      title: "REGISTRATION INFO", sub: "IDENTITY CODE", back: "SEARCH AGAIN",
      print: "SAVE CONFIRMATION", labelType: "CATEGORY", labelName: "FULL NAME",
      labelTarget: "VISIT PURPOSE", labelDate: "DATE", labelTime: "TIME SLOT"
    }
  };

  const t = dict[lang] || dict.vi;

  const mockData = {
    name: "NGUYỄN VĂN KHÁCH",
    type: lang === 'vi' ? "KHÁCH THAM QUAN" : "VISITOR",
    target: lang === 'vi' ? "SA BÀN & NHÀ MẪU" : "SALES MODEL & MOCKUP HOUSE",
    time: "10:30", 
    date: "25/03/2026", 
    code: "ERA-9999"
  };

  return (
    <div className={styles.glassContainer}>
      <div className="text-center mb-8">
        <h1 className={styles.title} style={{ fontSize: '24px', color: '#5DA9DD' }}>{t.title}</h1>
        <p className="text-[#F79552] font-black tracking-[0.3em] text-[10px] uppercase mt-2">
            {t.sub}: {mockData.code}
        </p>
      </div>

      <div className="bg-gradient-to-br from-white/10 to-[#5DA9DD]/5 p-8 rounded-[40px] border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-6">
            <div>
              <p className="text-[9px] text-[#B3ABC4] uppercase tracking-widest font-bold">{t.labelType}</p>
              <p className="text-white font-black text-sm mt-1">{mockData.type}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-[#B3ABC4] uppercase tracking-widest font-bold">{t.labelName}</p>
              <p className="text-white font-black text-sm mt-1">{mockData.name}</p>
            </div>
          </div>

          <div className="py-4">
            <p className="text-[9px] text-[#B3ABC4] uppercase tracking-widest font-bold mb-2">{t.labelTarget}</p>
            <p className="text-[#5DA9DD] font-black text-xl tracking-tight leading-tight uppercase">
                {mockData.target}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <div>
              <p className="text-[9px] text-[#B3ABC4] uppercase tracking-widest font-bold">{t.labelDate}</p>
              <p className="text-white font-black text-sm mt-1">{mockData.date}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-[#B3ABC4] uppercase tracking-widest font-bold">{t.labelTime}</p>
              <p className="text-white font-black text-sm mt-1">{mockData.time}</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#5DA9DD] blur-[100px] opacity-10"></div>
      </div>

      <div className="mt-10 flex flex-col gap-4 text-center">
        <button 
          onClick={() => window.print()} 
          className={styles.btnSubmit} 
          style={{ backgroundColor: '#5DA9DD', marginTop: 0 }}
        >
          {t.print}
        </button>
        <button 
          onClick={() => router.push(`/check-status?lang=${lang}`)} 
          className="text-[#B3ABC4] text-[9px] uppercase font-black tracking-[0.3em] hover:text-[#F79552] transition-colors"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20 font-bold tracking-widest">LOADING...</div>}>
      <ResultContent />
    </Suspense>
  );
}