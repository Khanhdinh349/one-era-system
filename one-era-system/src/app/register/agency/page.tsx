'use client'
import styles from './agency.module.css';
import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AgencyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  const agencies = [
    "THE ONE REAL ESTATE", "REVER", "REALPLUS", "QS LAND", "INDOCHINE", 
    "ERA VIỆT NAM", "LỘC PHÁT HƯNG & STHOME", "BÁCH NHƯ", "DOUBLE LAND", 
    "GENIE PROPERTY", "KZEN HOLDINGS", "THẾ GIỚI ĐẤT VIỆT", "VẠN XUÂN SERVICE", 
    "SGROUP", "KIM OANH REALTY", "KHÁC (VUI LÒNG NHẬP)"
  ];

  const timeSlots = ["09:00", "10:30", "13:30", "15:00"];

  const [selAgency, setSelAgency] = useState("");
  const [customAgency, setCustomAgency] = useState("");
  const [showAgency, setShowAgency] = useState(false);
  const [selTime, setSelTime] = useState("");
  const [showTime, setShowTime] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 2);

  // Logic tự động chọn khung giờ gần nhất
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;

    const nextSlot = timeSlots.find(slot => {
      const [slotHour, slotMinutes] = slot.split(':').map(Number);
      return (slotHour * 60 + slotMinutes) > currentTimeInMinutes;
    });

    // Nếu đã hết giờ trong ngày (sau 15:00), mặc định chọn slot đầu tiên của ngày mai
    setSelTime(nextSlot || timeSlots[0]);
  }, []);

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-10">
        <div onClick={() => router.back()} className={styles.backBtn}>
          <span>← QUAY LẠI</span>
        </div>
        <img src="/images/logo-one-era.png" alt="Logo" className="w-32" />
      </div>

      <h1 className={styles.title}>ĐĂNG KÝ TIẾP ĐÓN ĐẠI LÝ</h1>

      <form className="space-y-6">
        {/* CHỌN ĐẠI LÝ */}
        <div className="relative mb-8">
          <label className={styles.label}>ĐƠN VỊ ĐẠI LÝ</label>
          <div className={styles.customSelectHeader} onClick={() => setShowAgency(!showAgency)}>
            <span style={{ color: selAgency ? '#fff' : '#B3ABC4' }}>
              {selAgency || "-- Chọn Đại lý từ danh sách --"}
            </span>
            <span style={{ transition: '0.3s', transform: showAgency ? 'rotate(180deg)' : 'none' }}>▼</span>
          </div>
          
          {showAgency && (
            <div className={styles.dropdownList}>
              <div className={styles.scrollArea}>
                {agencies.map(a => (
                  <div key={a} className={styles.dropdownItem} 
                    onClick={() => { 
                      setSelAgency(a); 
                      setShowAgency(false);
                      if (a !== "KHÁC (VUI LÒNG NHẬP)") setCustomAgency(""); 
                    }}>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selAgency === "KHÁC (VUI LÒNG NHẬP)" && (
            <div className={styles.extraInputContainer}>
              <input 
                type="text" 
                className={styles.regInputExtra} 
                placeholder="Vui lòng nhập tên đại lý của bạn..."
                value={customAgency}
                onChange={(e) => setCustomAgency(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* THÔNG TIN NGƯỜI ĐĂNG KÝ */}
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>HỌ TÊN NGƯỜI ĐĂNG KÝ</label>
            <input type="text" className={styles.regInput} placeholder="Nhập tên..." />
          </div>
          <div>
            <label className={styles.label}>CCCD NGƯỜI ĐĂNG KÝ</label>
            <input type="text" className={styles.regInput} placeholder="..." />
          </div>
          <div className="col-span-2">
            <label className={styles.label}>SĐT NGƯỜI ĐĂNG KÝ</label>
            <input type="tel" className={styles.regInput} placeholder="..." />
          </div>
        </div>

        {/* THÔNG TIN KHÁCH HÀNG */}
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>TÊN KHÁCH HÀNG</label>
            <input type="text" className={styles.regInput} placeholder="..." />
          </div>
          <div>
            <label className={styles.label}>4 SỐ CUỐI SĐT KHÁCH HÀNG</label>
            <input type="text" maxLength={4} className={styles.regInput} placeholder="Ví dụ: 8888" />
          </div>
        </div>

        {/* THÔNG SỐ THAM QUAN */}
        <div className={styles.subSelectionArea}>
          <div>
            <label className={styles.label}>SL KHÁCH (MAX 10)</label>
            <input type="number" defaultValue={1} min={1} max={10} className={styles.regInput} />
          </div>
          <div>
            <label className={styles.label}>NGÀY THAM QUAN</label>
            <input type="date" min={today} max={maxDate.toISOString().split('T')[0]} defaultValue={today} className={styles.regInput} />
          </div>
          <div className="relative">
            <label className={styles.label}>KHUNG GIỜ</label>
            <div className={styles.customSelectHeader} onClick={() => setShowTime(!showTime)}>
              {selTime || "--:--"}
            </div>
            {showTime && (
              <div className={styles.dropdownList}>
                <div className={styles.scrollArea}>
                  {timeSlots.map(t => (
                    <div key={t} className={styles.dropdownItem} onClick={() => { setSelTime(t); setShowTime(false); }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button type="button" className={styles.btnSubmit}>XÁC NHẬN ĐĂNG KÝ</button>
      </form>
    </div>
  );
}

export default function Page() { return <Suspense><AgencyForm /></Suspense>; }