'use client'
import styles from '../visitor/visitor.module.css';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckScheduleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isSearched, setIsSearched] = useState(false);

  const dict: any = {
    vi: {
      title: "TRA CỨU LỊCH ĐĂNG KÝ",
      back: "QUAY LẠI",
      labelPhone: "NHẬP SỐ ĐIỆN THOẠI ĐÃ ĐĂNG KÝ",
      btnCheck: "KIỂM TRA NGAY",
      noResult: "Không tìm thấy thông tin đăng ký cho số điện thoại này.",
      infoTitle: "CHI TIẾT ĐĂNG KÝ",
      labelType: "Loại hình",
      labelName: "Người đăng ký",
      labelCompany: "Đơn vị/Đại lý",
      labelTarget: "Nội dung/Khu vực",
      labelTime: "Thời gian tham quan",
      status: "Trạng thái",
      confirmed: "Đã xác nhận",
      types: { visitor: "Khách tham quan", agency: "Đại lý", partner: "Đối tác" }
    },
    en: {
      title: "CHECK REGISTRATION",
      back: "BACK",
      labelPhone: "ENTER REGISTERED PHONE NUMBER",
      btnCheck: "CHECK NOW",
      noResult: "No registration found for this phone number.",
      infoTitle: "REGISTRATION DETAILS",
      labelType: "Category",
      labelName: "Registered by",
      labelCompany: "Company/Agency",
      labelTarget: "Purpose/Area",
      labelTime: "Visit Time",
      status: "Status",
      confirmed: "Confirmed",
      types: { visitor: "Visitor", agency: "Agency", partner: "Partner" }
    }
  };

  const t = dict[lang] || dict.vi;

  // Giả lập hàm gọi dữ liệu từ CRM/Database
  const handleCheck = () => {
    setIsSearched(true);
    // Đây là nơi bạn sẽ gọi API fetch(`/api/bookings?phone=${phone}`)
    // Demo dữ liệu mẫu cho một Đại lý đăng ký:
    if (phone === "0901234567") {
      setResult({
        type: 'agency',
        name: 'Nguyễn Văn A',
        company: 'Đại lý Bất động sản KOG',
        target: 'Sa bàn & Nhà mẫu (5 khách)',
        time: '10:30 | 25/03/2026',
        note: 'Cần hỗ trợ xe điện đón khách'
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-12">
        <div onClick={() => router.back()} className={styles.backBtn}>← {t.back}</div>
        <img src="/images/logo-one-era.png" alt="Logo" className="w-36" />
      </div>

      <h1 className={styles.title}>{t.title}</h1>

      <div className="max-w-md mx-auto space-y-8">
        <div>
          <label className={styles.label}>{t.labelPhone}</label>
          <input 
            type="tel" 
            className={styles.regInput} 
            placeholder="090xxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <button onClick={handleCheck} className={styles.btnSubmit}>{t.btnCheck}</button>

        {/* Hiển thị kết quả */}
        {isSearched && (
          <div className="mt-12 animate-in fade-in slide-in-from-top-4 duration-500">
            {result ? (
              <div className={styles.subSelectionArea} style={{display: 'block', gridTemplateColumns: 'none'}}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={styles.label} style={{color: '#c5a059', marginBottom: 0}}>{t.infoTitle}</h3>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30 uppercase font-bold">
                    {t.confirmed}
                  </span>
                </div>

                <div className="space-y-5 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase">{t.labelType}</span>
                    <span className="text-white font-bold">{t.types[result.type]}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase">{t.labelName}</span>
                    <span className="text-white font-bold">{result.name}</span>
                  </div>

                  {result.company && (
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase">{t.labelCompany}</span>
                      <span className="text-white font-bold">{result.company}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase">{t.labelTarget}</span>
                    <span className="text-[#c5a059] font-bold">{result.target}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase">{t.labelTime}</span>
                    <span className="text-white font-bold">{result.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-red-400 text-sm italic">{t.noResult}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckSchedulePage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <CheckScheduleContent />
    </Suspense>
  );
}