'use client'
import styles from '../visitor/visitor.module.css'; // Dùng chung file CSS bạn đã cung cấp
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PartnerRegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  // Dữ liệu đa ngôn ngữ được cập nhật theo yêu cầu mới
  const dict: any = {
    vi: {
      title: "ĐĂNG KÝ ĐỐI TÁC", 
      back: "QUAY LẠI", 
      company: "TÊN ĐƠN VỊ ĐỐI TÁC", 
      name: "HỌ VÀ TÊN NGƯỜI LIÊN HỆ", 
      phone: "SỐ ĐIỆN THOẠI", 
      email: "EMAIL",
      note: "GHI CHÚ / NỘI DUNG HỢP TÁC",
      placeholderNote: "Nhập nội dung bạn muốn trao đổi...",
      submit: "GỬI THÔNG TIN ĐỐI TÁC",
      errCompany: "Vui lòng nhập tên đơn vị",
      errName: "Vui lòng nhập họ tên",
      errPhone: "Vui lòng nhập số điện thoại"
    },
    en: {
      title: "PARTNER REGISTRATION", 
      back: "BACK", 
      company: "COMPANY NAME", 
      name: "FULL NAME (CONTACT PERSON)", 
      phone: "PHONE NUMBER", 
      email: "EMAIL",
      note: "NOTE / COOPERATION CONTENT",
      placeholderNote: "Enter the content you want to discuss...",
      submit: "SUBMIT PARTNER INFO",
      errCompany: "Please enter company name",
      errName: "Please enter full name",
      errPhone: "Please enter phone number"
    }
  };

  const t = dict[lang] || dict.vi;

  const [formData, setFormData] = useState({ company: '', name: '', phone: '', email: '', note: '' });
  const [errors, setErrors] = useState<any>({});

  const handleValidation = () => {
    let newErrors: any = {};
    if (!formData.company) newErrors.company = t.errCompany;
    if (!formData.name) newErrors.name = t.errName;
    if (!formData.phone) newErrors.phone = t.errPhone;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-12">
        <div onClick={() => router.back()} className={styles.backBtn}>← {t.back}</div>
        <img src="/images/logo-one-era.png" alt="Logo" className="w-36" />
      </div>

      <h1 className={styles.title}>{t.title}</h1>

      <form className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="md:col-span-2">
            <label className={styles.label}>{t.company}</label>
            <input 
              type="text" 
              className={styles.regInput} 
              onChange={(e) => setFormData({...formData, company: e.target.value})} 
            />
            {errors.company && <p className={styles.errorText}>{errors.company}</p>}
          </div>

          <div>
            <label className={styles.label}>{t.name}</label>
            <input 
              type="text" 
              className={styles.regInput} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          <div>
            <label className={styles.label}>{t.phone}</label>
            <input 
              type="tel" 
              className={styles.regInput} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={styles.label}>{t.email}</label>
            <input 
              type="email" 
              className={styles.regInput} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className="md:col-span-2">
            <label className={styles.label}>{t.note}</label>
            <textarea 
              rows={4} 
              className={styles.regInput} 
              style={{resize: 'none'}} 
              placeholder={t.placeholderNote}
              onChange={(e) => setFormData({...formData, note: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="button" 
          onClick={handleValidation} 
          className={styles.btnSubmit}
        >
          {t.submit}
        </button>
      </form>
    </div>
  );
}

export default function PartnerPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <PartnerRegistrationForm />
    </Suspense>
  );
}