'use client'
import styles from '@/app/register/visitor/visitor.module.css';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const dict: any = {
    vi: {
      title: "KIỂM TRA THÔNG TIN", back: "QUAY LẠI",
      labelId: "SỐ ĐIỆN THOẠI HOẶC CCCD", labelPass: "MẬT KHẨU NỘI BỘ",
      btnVerify: "XÁC NHẬN TRUY CẬP", errEmpty: "Vui lòng nhập thông tin",
      errPass: "Mật khẩu không chính xác", errNotFound: "Thông tin không tồn tại trên hệ thống",
      exTitle: "VÍ DỤ TRA CỨU:", exCust: "Khách hàng", exStaff: "Nội bộ",
      loading: "Đang kiểm tra..."
    },
    en: {
      title: "CHECK INFORMATION", back: "BACK",
      labelId: "PHONE NUMBER OR ID", labelPass: "INTERNAL PASSWORD",
      btnVerify: "VERIFY ACCESS", errEmpty: "Please enter information",
      errPass: "Incorrect password", errNotFound: "Information not found in system",
      exTitle: "SEARCH EXAMPLES:", exCust: "Customer", exStaff: "Internal",
      loading: "Checking..."
    }
  };

  const t = dict[lang] || dict.vi;
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password nội bộ One Era
  const STAFF_EMAIL = 'admin@oneera.vn';

  const handleIdentityChange = (val: string) => {
    setIdentity(val);
    setError('');
  };

  const handleVerify = async () => {
    setError('');
    const cleanIdentity = identity.trim(); // Xóa khoảng trắng dư thừa

    if (!cleanIdentity) {
      setError(t.errEmpty);
      return;
    }

    // 1. Xử lý logic Nội bộ (Staff)
    if (cleanIdentity === STAFF_EMAIL) {
      if (password === '123456') {
        router.push(`/admin/dashboard?lang=${lang}`);
      } else {
        setError(t.errPass);
      }
      return;
    }

    // 2. Xử lý tra cứu Khách hàng (Gọi API Backend)
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/registrations/check?contact=${cleanIdentity}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Nếu tìm thấy, chuyển sang trang kết quả và truyền số điện thoại/CCCD qua URL
        router.push(`/check-status/result?phone=${cleanIdentity}&lang=${lang}`);
      } else {
        setError(t.errNotFound);
      }
    } catch (err) {
      setError("Không thể kết nối tới Server Backend (3001)");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-10">
        <div 
          onClick={() => router.push(`/?lang=${lang}`)} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-[#B3ABC4] group-hover:text-[#5DA9DD] transition-all duration-300 text-lg">←</span>
          <span className="text-[#B3ABC4] font-black text-[11px] tracking-[0.25em] uppercase group-hover:text-[#5DA9DD] transition-all duration-300">
            {t.back}
          </span>
        </div>
        <img src="/images/logo-one-era.png" alt="Logo One Era" className="w-28" />
      </div>

      <h1 className={styles.title} style={{ color: '#5DA9DD' }}>{t.title}</h1>

      <div className="max-w-md mx-auto space-y-8">
        {/* Ví dụ tra cứu */}
        <div className="bg-[#B3ABC4]/5 p-5 rounded-3xl border border-[#B3ABC4]/10 shadow-inner">
          <p className="text-[9px] text-[#B3ABC4] font-black uppercase tracking-[0.2em] mb-3 opacity-60">{t.exTitle}</p>
          <div className="space-y-2">
            <p className="text-xs text-white/60">
              • {t.exCust}: <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded ml-1">SĐT hoặc CCCD đã đăng ký</span>
            </p>
            <p className="text-xs text-white/60 cursor-pointer hover:text-[#F79552]" onClick={() => handleIdentityChange(STAFF_EMAIL)}>
              • {t.exStaff}: <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded ml-1">{STAFF_EMAIL}</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className={styles.label}>{t.labelId}</label>
            <input 
              type="text" 
              className={styles.regInput} 
              style={{ borderColor: 'rgba(93, 169, 221, 0.3)' }}
              value={identity} 
              onChange={(e) => handleIdentityChange(e.target.value)} 
              placeholder="0912..."
              disabled={loading}
            />
          </div>

          {identity.trim() === STAFF_EMAIL && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className={styles.label}>{t.labelPass}</label>
              <input 
                type="password" 
                className={styles.regInput} 
                style={{ borderColor: '#F79552' }}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••"
              />
            </div>
          )}

          {error && <p className={styles.errorText} style={{ color: '#F79552', fontSize: '13px' }}>{error}</p>}
          
          <button 
            onClick={handleVerify} 
            disabled={loading}
            className={styles.btnSubmit}
            style={{ 
              backgroundColor: loading ? '#2A4A61' : '#5DA9DD',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? t.loading : t.btnVerify}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckStatusPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <CheckStatusContent />
    </Suspense>
  );
}