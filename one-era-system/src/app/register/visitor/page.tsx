'use client'
import styles from './visitor.module.css';
import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VisitorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const timeSlots = ["09:00", "10:30", "13:30", "15:00"];

  // State
  const [selTime, setSelTime] = useState("");
  const [showTime, setShowTime] = useState(false);

  // Dictionary chuyển ngữ
  const dict = {
    vi: {
      back: "← QUAY LẠI",
      title: "ĐĂNG KÝ THAM QUAN",
      name: "HỌ TÊN KHÁCH",
      cccd: "CCCD",
      phone: "SĐT",
      plus: "SỐ LƯỢNG NGƯỜI ĐI CÙNG",
      date: "NGÀY",
      time: "KHUNG GIỜ",
      submit: "XÁC NHẬN ĐĂNG KÝ",
      loading: "Đang tải..."
    },
    en: {
      back: "← BACK",
      title: "VISITOR REGISTRATION",
      name: "FULL NAME",
      cccd: "ID CARD / PASSPORT",
      phone: "PHONE NUMBER",
      plus: "NUMBER OF GUESTS",
      date: "DATE",
      time: "TIME SLOT",
      submit: "CONFIRM REGISTRATION",
      loading: "Loading..."
    }
  };

  const t = lang === 'en' ? dict.en : dict.vi;

  // Logic Ngày & Giờ
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 2);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    const nextSlot = timeSlots.find(slot => {
      const [h, m] = slot.split(':').map(Number);
      return (h * 60 + m) > currentTimeInMinutes;
    });
    setSelTime(nextSlot || timeSlots[0]);
  }, []);

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-10">
        <div onClick={() => router.back()} className={styles.backBtn}>
          <span>{t.back}</span>
        </div>
        <img src="/images/logo-one-era.png" alt="Logo" className="w-32" />
      </div>

      <h1 className={styles.title}>{t.title}</h1>

      <form className="space-y-6">
        <div className={styles.formGrid}>
          <div className="col-span-2">
            <label className={styles.label}>{t.name}</label>
            <input type="text" className={styles.regInput} placeholder="..." />
          </div>
          <div>
            <label className={styles.label}>{t.cccd}</label>
            <input type="text" className={styles.regInput} placeholder="..." />
          </div>
          <div>
            <label className={styles.label}>{t.phone}</label>
            <input type="tel" className={styles.regInput} placeholder="..." />
          </div>
        </div>

        <div className={styles.subSelectionArea}>
          <div>
            <label className={styles.label}>{t.plus}</label>
            <input type="number" defaultValue={0} min={0} max={10} className={styles.regInput} />
          </div>
          <div>
            <label className={styles.label}>{t.date}</label>
            <input type="date" min={today} max={maxDateStr} defaultValue={today} className={styles.regInput} />
          </div>
          <div className="relative">
            <label className={styles.label}>{t.time}</label>
            <div className={styles.customSelectHeader} onClick={() => setShowTime(!showTime)}>
              {selTime || "--:--"}
            </div>
            {showTime && (
              <div className={styles.dropdownList}>
                <div className={styles.scrollArea}>
                  {timeSlots.map(slot => (
                    <div key={slot} className={styles.dropdownItem} onClick={() => { setSelTime(slot); setShowTime(false); }}>
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button type="button" className={styles.btnSubmit}>{t.submit}</button>
      </form>
    </div>
  );
}

export default function Page() {
  return <Suspense><VisitorForm /></Suspense>;
}