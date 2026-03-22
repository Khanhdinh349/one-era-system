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

  // State Form
  const [formData, setFormData] = useState({
    fullName: '',
    cccd: '',
    phoneNumber: '',
    customerName: '',
    customerPhoneSuffix: '',
    guests: 1,
    date: new Date().toISOString().split('T')[0]
  });

  const [selAgency, setSelAgency] = useState("");
  const [customAgency, setCustomAgency] = useState("");
  const [showAgency, setShowAgency] = useState(false);
  const [selTime, setSelTime] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 2);

  useEffect(() => {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    const nextSlot = timeSlots.find(slot => {
      const [h, m] = slot.split(':').map(Number);
      return (h * 60 + m) > currentTimeInMinutes;
    });
    setSelTime(nextSlot || timeSlots[0]);
  }, []);

  const handleSubmit = async () => {
    // Validate cơ bản
    const finalAgency = selAgency === "KHÁC (VUI LÒNG NHẬP)" ? customAgency : selAgency;
    if (!finalAgency || !formData.fullName || !formData.phoneNumber) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      agencyName: finalAgency,
      timeSlot: selTime,
      type: 'AGENCY'
    };

    try {
      const res = await fetch('http://localhost:3001/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Đăng ký đại lý thành công!");
        router.push(`/?lang=${lang}`); // Quay về trang chủ
      } else {
        const err = await res.json();
        alert(err.message || "Lỗi đăng ký");
      }
    } catch (error) {
      alert("Không thể kết nối tới Server Backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.glassContainer}>
      <div className="flex justify-between items-center mb-10">
        <div onClick={() => router.back()} className="cursor-pointer text-[#B3ABC4] hover:text-white">
          <span>← QUAY LẠI</span>
        </div>
        <img src="/images/logo-one-era.png" alt="Logo" className="w-32" />
      </div>

      <h1 className={styles.title}>ĐĂNG KÝ TIẾP ĐÓN ĐẠI LÝ</h1>

      <form className="space-y-6">
        {/* CHỌN ĐẠI LÝ */}
        <div className="relative">
          <label className={styles.label}>ĐƠN VỊ ĐẠI LÝ *</label>
          <div className={styles.customSelectHeader} onClick={() => setShowAgency(!showAgency)}>
            <span style={{ color: selAgency ? '#fff' : '#B3ABC4' }}>
              {selAgency || "-- Chọn Đại lý --"}
            </span>
          </div>
          {showAgency && (
            <div className={styles.dropdownList}>
              <div className={styles.scrollArea}>
                {agencies.map(a => (
                  <div key={a} className={styles.dropdownItem} onClick={() => { setSelAgency(a); setShowAgency(false); }}>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}
          {selAgency === "KHÁC (VUI LÒNG NHẬP)" && (
            <input 
              type="text" className={`${styles.regInput} mt-2`} 
              placeholder="Tên đại lý khác..."
              value={customAgency} onChange={(e) => setCustomAgency(e.target.value)}
            />
          )}
        </div>

        {/* THÔNG TIN NGƯỜI ĐĂNG KÝ */}
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>HỌ TÊN NHÂN VIÊN *</label>
            <input type="text" className={styles.regInput} value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div>
            <label className={styles.label}>CCCD NHÂN VIÊN</label>
            <input type="text" className={styles.regInput} value={formData.cccd} onChange={e => setFormData({...formData, cccd: e.target.value})} />
          </div>
          <div className="col-span-2">
            <label className={styles.label}>SĐT NHÂN VIÊN *</label>
            <input type="tel" className={styles.regInput} value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
          </div>
        </div>

        {/* THÔNG TIN KHÁCH HÀNG */}
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>TÊN KHÁCH HÀNG</label>
            <input type="text" className={styles.regInput} value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
          </div>
          <div>
            <label className={styles.label}>4 SỐ CUỐI SĐT KHÁCH</label>
            <input type="text" maxLength={4} className={styles.regInput} value={formData.customerPhoneSuffix} onChange={e => setFormData({...formData, customerPhoneSuffix: e.target.value})} />
          </div>
        </div>

        {/* THAM QUAN */}
        <div className={styles.subSelectionArea}>
          <div>
            <label className={styles.label}>SL KHÁCH</label>
            <input type="number" className={styles.regInput} value={formData.guests} onChange={e => setFormData({...formData, guests: Number(e.target.value)})} />
          </div>
          <div>
            <label className={styles.label}>NGÀY</label>
            <input type="date" min={today} max={maxDate.toISOString().split('T')[0]} className={styles.regInput} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div className="relative">
            <label className={styles.label}>KHUNG GIỜ</label>
            <div className={styles.customSelectHeader} onClick={() => setShowTime(!showTime)}>{selTime}</div>
            {showTime && (
              <div className={styles.dropdownList}>
                {timeSlots.map(t => (
                  <div key={t} className={styles.dropdownItem} onClick={() => { setSelTime(t); setShowTime(false); }}>{t}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          type="button" 
          onClick={handleSubmit} 
          disabled={loading}
          className={styles.btnSubmit}
        >
          {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐĂNG KÝ"}
        </button>
      </form>
    </div>
  );
}

export default function Page() { return <Suspense><AgencyForm /></Suspense>; }