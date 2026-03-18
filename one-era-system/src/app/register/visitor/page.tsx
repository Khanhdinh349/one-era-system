'use client'
import styles from './visitor.module.css';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lấy ngôn ngữ từ URL (?lang=en hoặc ?lang=vi), mặc định là 'vi'
  const lang = searchParams.get('lang') || 'vi';

  // Dữ liệu đa ngôn ngữ
  const dict: any = {
    vi: {
      title: "ĐĂNG KÝ THAM QUAN", back: "QUAY LẠI", name: "HỌ VÀ TÊN", cccd: "SỐ CCCD", phone: "SỐ ĐIỆN THOẠI", email: "EMAIL (NẾU CÓ)",
      area: "KHU VỰC TRƯNG BÀY (MAX 25 KHÁCH)", saban: "SA BÀN", nhamau: "NHÀ MẪU", 
      special: "TRẢI NGHIỆM ĐẶC BIỆT (MAX 10 KHÁCH)", note: "GHI CHÚ", 
      guest: "SL KHÁCH", date: "NGÀY CHỌN", time: "GIỜ CHỌN", submit: "GỬI ĐĂNG KÝ",
      placeholderTime: "-- Chọn khung giờ --", placeholderNote: "Nhập ghi chú thêm...",
      errName: "Vui lòng nhập họ tên", errCCCD: "Vui lòng nhập CCCD", errPhone: "Vui lòng nhập số điện thoại",
      errSelect: "Vui lòng chọn ít nhất một khu vực"
    },
    en: {
      title: "VISIT REGISTRATION", back: "BACK", name: "FULL NAME", cccd: "ID NUMBER", phone: "PHONE NUMBER", email: "EMAIL (OPTIONAL)",
      area: "EXHIBITION AREA (MAX 25 GUESTS)", saban: "SALES MODEL", nhamau: "MOCKUP HOUSE",
      special: "SPECIAL EXPERIENCE (MAX 10 GUESTS)", note: "NOTE",
      guest: "GUESTS", date: "DATE", time: "TIME", submit: "SUBMIT",
      placeholderTime: "-- Select time --", placeholderNote: "Enter additional notes...",
      errName: "Please enter your name", errCCCD: "Please enter ID number", errPhone: "Please enter phone number",
      errSelect: "Please select at least one area"
    }
  };

  const t = dict[lang] || dict.vi;

  const [formData, setFormData] = useState({ name: '', cccd: '', phone: '', note: '' });
  const [errors, setErrors] = useState<any>({});
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeImmersion, setActiveImmersion] = useState(false);

  const [showMainTime, setShowMainTime] = useState(false);
  const [selectedMainTime, setSelectedMainTime] = useState(t.placeholderTime);
  const [showImmeTime, setShowImmeTime] = useState(false);
  const [selectedImmeTime, setSelectedImmeTime] = useState(t.placeholderTime);

  // Cập nhật lại placeholder khi ngôn ngữ URL thay đổi
  useEffect(() => {
    setSelectedMainTime(t.placeholderTime);
    setSelectedImmeTime(t.placeholderTime);
  }, [lang, t.placeholderTime]);

  const handleValidation = () => {
    let newErrors: any = {};
    if (!formData.name) newErrors.name = t.errName;
    if (!formData.cccd) newErrors.cccd = t.errCCCD;
    if (!formData.phone) newErrors.phone = t.errPhone;
    if (!activeMain && !activeImmersion) newErrors.selection = t.errSelect;
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

      <form className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <label className={styles.label}>{t.name}</label>
            <input type="text" className={styles.regInput} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>
          <div>
            <label className={styles.label}>{t.cccd}</label>
            <input type="text" className={styles.regInput} onChange={(e) => setFormData({...formData, cccd: e.target.value})} />
            {errors.cccd && <p className={styles.errorText}>{errors.cccd}</p>}
          </div>
          <div>
            <label className={styles.label}>{t.phone}</label>
            <input type="tel" className={styles.regInput} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </div>
          <div>
            <label className={styles.label}>{t.email}</label>
            <input type="email" className={styles.regInput} />
          </div>
        </div>

        <div>
          <label className={styles.label}>{t.area}</label>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div onClick={() => setActiveMain('sa-ban')} className={`${styles.chip} ${activeMain === 'sa-ban' ? styles.chipActive : ''}`}>{t.saban}</div>
            <div onClick={() => setActiveMain('nha-mau')} className={`${styles.chip} ${activeMain === 'nha-mau' ? styles.chipActive : ''}`}>{t.nhamau}</div>
          </div>
          {activeMain && (
            <div className={styles.subSelectionArea}>
              <div><label className={styles.label}>{t.guest}</label><input type="number" defaultValue={1} className={styles.regInput} /></div>
              <div><label className={styles.label}>{t.date}</label><input type="date" className={styles.regInput} /></div>
              <div className={styles.customSelectWrapper}>
                <label className={styles.label}>{t.time}</label>
                <div className={styles.customSelectHeader} onClick={() => setShowMainTime(!showMainTime)}>{selectedMainTime}</div>
                {showMainTime && (
                  <div className={styles.dropdownList}>
                    {["09:00", "10:30", "13:30", "15:00"].map(s => <div key={s} className={styles.dropdownItem} onClick={() => {setSelectedMainTime(s); setShowMainTime(false)}}>{s}</div>)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className={styles.label}>{t.special}</label>
          <div onClick={() => setActiveImmersion(!activeImmersion)} className={`${styles.chip} ${activeImmersion ? styles.chipActive : ''}`} style={{width: '100%'}}>IMMERSION ROOM</div>
          {activeImmersion && (
            <div className={styles.subSelectionArea}>
              <div><label className={styles.label}>{t.guest}</label><input type="number" defaultValue={1} className={styles.regInput} /></div>
              <div><label className={styles.label}>{t.date}</label><input type="date" className={styles.regInput} /></div>
              <div className={styles.customSelectWrapper}>
                <label className={styles.label}>{t.time}</label>
                <div className={styles.customSelectHeader} onClick={() => setShowImmeTime(!showImmeTime)}>{selectedImmeTime}</div>
                {showImmeTime && (
                  <div className={styles.dropdownList}>
                    {["09:00", "09:20", "09:40", "10:00"].map(s => <div key={s} className={styles.dropdownItem} onClick={() => {setSelectedImmeTime(s); setShowImmeTime(false)}}>{s}</div>)}
                  </div>
                )}
              </div>
            </div>
          )}
          {errors.selection && <p className={styles.errorText} style={{textAlign: 'center', marginTop: '1.5rem'}}>{errors.selection}</p>}
        </div>

        <div>
          <label className={styles.label}>{t.note}</label>
          <textarea rows={3} className={styles.regInput} style={{resize: 'none'}} placeholder={t.placeholderNote} />
        </div>

        <button type="button" onClick={handleValidation} className={styles.btnSubmit}>{t.submit}</button>
      </form>
    </div>
  );
}

// Bọc trong Suspense để tránh lỗi "useSearchParams() should be wrapped in a suspense boundary" trong Next.js
export default function VisitorRegistration() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}