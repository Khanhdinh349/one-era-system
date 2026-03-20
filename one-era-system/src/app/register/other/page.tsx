'use client'
import styles from '../visitor/visitor.module.css'; 
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OtherForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'vi';

  // Nội dung song ngữ
  const t = {
    vi: {
      back: "← QUAY LẠI",
      title: "ĐĂNG KÝ KHÁC",
      name: "HỌ TÊN",
      phone: "SỐ ĐIỆN THOẠI",
      purpose: "MỤC ĐÍCH ĐẾN LÀM VIỆC",
      submit: "XÁC NHẬN ĐĂNG KÝ",
      placeholder: "Vui lòng nhập..."
    },
    en: {
      back: "← BACK",
      title: "OTHER REGISTRATION",
      name: "FULL NAME",
      phone: "PHONE NUMBER",
      purpose: "PURPOSE OF VISIT",
      submit: "CONFIRM REGISTRATION",
      placeholder: "Please enter..."
    }
  }[lang === 'en' ? 'en' : 'vi'];

  return (
    <div className={styles.glassContainer}>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div onClick={() => router.back()} className={styles.backBtn}>
          <span>{t.back}</span>
        </div>
        <img src="/images/logo-one-era.png" alt="Logo" className="w-32" />
      </div>

      <h1 className={styles.title}>{t.title}</h1>

      <form className="space-y-6">
        <div className={styles.formGrid}>
          {/* HỌ TÊN */}
          <div className="col-span-2 md:col-span-1">
            <label className={styles.label}>{t.name}</label>
            <input 
              type="text" 
              className={styles.regInput} 
              placeholder={t.placeholder} 
            />
          </div>

          {/* SỐ ĐIỆN THOẠI */}
          <div className="col-span-2 md:col-span-1">
            <label className={styles.label}>{t.phone}</label>
            <input 
              type="tel" 
              className={styles.regInput} 
              placeholder={t.placeholder} 
            />
          </div>

          {/* MỤC ĐÍCH (ĐỂ TRỐNG ĐỂ KHÁNH TỰ ĐIỀN THÊM NẾU CẦN) */}
          <div className="col-span-2">
            <label className={styles.label}>{t.purpose}</label>
            <textarea 
              rows={3}
              className={styles.regInput} 
              style={{ borderRadius: '1.25rem', resize: 'none' }}
              placeholder="..."
            ></textarea>
          </div>
        </div>

        <button type="button" className={styles.btnSubmit}>
          {t.submit}
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
      <OtherForm />
    </Suspense>
  );
}