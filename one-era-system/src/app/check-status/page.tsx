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
      labelId: "SỐ ĐIỆN THOẠI HOẶC EMAIL", labelPass: "MẬT KHẨU NỘI BỘ",
      btnVerify: "XÁC NHẬN TRUY CẬP", errEmpty: "Vui lòng nhập thông tin",
      errPass: "Mật khẩu không chính xác", errNotFound: "Thông tin không tồn tại",
      exTitle: "VÍ DỤ TRA CỨU:", exCust: "Khách hàng", exStaff: "Nội bộ"
    },
    en: {
      title: "CHECK INFORMATION", back: "BACK",
      labelId: "PHONE NUMBER OR EMAIL", labelPass: "INTERNAL PASSWORD",
      btnVerify: "VERIFY ACCESS", errEmpty: "Please enter information",
      errPass: "Incorrect password", errNotFound: "Information not found",
      exTitle: "SEARCH EXAMPLES:", exCust: "Customer", exStaff: "Internal"
    }
  };

  const t = dict[lang] || dict.vi;
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [error, setError] = useState('');

  const EXAMPLES = { customer: '0901234567', staff: 'admin@oneera.vn' };

  const handleIdentityChange = (val: string) => {
    setIdentity(val);
    setError('');
    setIsInternal(val === EXAMPLES.staff);
  };

  const handleVerify = () => {
    if (!identity) { setError(t.errEmpty); return; }
    if (identity === EXAMPLES.staff) {
      if (password === '123456') {
        router.push(`/admin/dashboard?lang=${lang}`);
      } else {
        setError(t.errPass);
      }
    } else if (identity === EXAMPLES.customer) {
      router.push(`/check-status/result?phone=${identity}&lang=${lang}`);
    } else {
      setError(t.errNotFound);
    }
  };

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-10">
        {/* Quay lại trang chủ src/app/page.tsx */}
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
        <div className="bg-[#B3ABC4]/5 p-5 rounded-3xl border border-[#B3ABC4]/10 shadow-inner">
          <p className="text-[9px] text-[#B3ABC4] font-black uppercase tracking-[0.2em] mb-3 opacity-60">{t.exTitle}</p>
          <div className="space-y-2">
            <p className="text-xs text-white/60 cursor-pointer hover:text-[#F79552] transition-colors" onClick={() => handleIdentityChange(EXAMPLES.customer)}>
              • {t.exCust}: <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded ml-1">{EXAMPLES.customer}</span>
            </p>
            <p className="text-xs text-white/60 cursor-pointer hover:text-[#F79552] transition-colors" onClick={() => handleIdentityChange(EXAMPLES.staff)}>
              • {t.exStaff}: <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded ml-1">{EXAMPLES.staff}</span>
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
              placeholder="..."
            />
          </div>

          {isInternal && (
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

          {error && <p className={styles.errorText} style={{ color: '#F79552' }}>{error}</p>}
          
          <button 
            onClick={handleVerify} 
            className={styles.btnSubmit}
            style={{ backgroundColor: '#5DA9DD' }}
          >
            {t.btnVerify}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckStatusPage() {
  return <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}><CheckStatusContent /></Suspense>;
}