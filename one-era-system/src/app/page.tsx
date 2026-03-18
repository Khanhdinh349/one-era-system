"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSelectionPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [role, setRole] = useState("");
  const [showLang, setShowLang] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const router = useRouter();

  const roleOptions = [
    {
      id: "visitor",
      label: lang === "vi" ? "Khách tham quan / Visitor" : "Visitor",
    },
    { id: "partner", label: lang === "vi" ? "Đối tác / Partner" : "Partner" },
    { id: "agency", label: lang === "vi" ? "Đại lý / Agency" : "Agency" },
  ];

  return (
    <div className="glass-container w-full max-w-[500px] flex flex-col items-center animate-in fade-in zoom-in duration-1000 px-10">
      <img
        src="/images/logo-one-era.png"
        alt="One Era"
        className="w-52 mb-8 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]"
      />

      <div className="mb-10 text-center px-4">
        <h2 className="flex flex-col items-center">
          <span className="text-[28px] font-medium tracking-[0.2em] text-white/90 uppercase mb-1">
            {lang === "vi" ? "Thành phố" : "The City of"}
          </span>
          <span className="text-[28px] md:text-[32px] font-black tracking-[0.15em] uppercase leading-tight bg-gradient-to-b from-white via-gold to-[#a88948] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(197,160,89,0.6)]">
            {lang === "vi" ? "VẠN TIỀM NĂNG" : "ENDLESS POSSIBILITIES"}
          </span>
        </h2>
        <div className="h-[2px] w-12 bg-gold/50 mx-auto mt-4 rounded-full"></div>
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        {/* CHỌN NGÔN NGỮ */}
        <div className="w-full max-w-[320px] relative">
          <span className="block text-center text-[10px] text-white tracking-[0.3em] uppercase mb-3">
            Ngôn ngữ / Language
          </span>
          <div
            onClick={() => {
              setShowLang(!showLang);
              setShowRole(false);
            }}
            className="role-box"
          >
            <span className="flex-1 text-center text-white font-bold text-xs tracking-[0.2em] uppercase">
              {lang === "vi" ? "Tiếng Việt" : "English"}
            </span>
            <svg
              className={`w-4 h-4 text-gold transition-transform duration-300 ${showLang ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {showLang && (
            <div className="custom-menu">
              <div
                onClick={() => {
                  setLang("vi");
                  setShowLang(false);
                }}
                className="menu-item border-b border-white/5 last:border-0"
              >
                Tiếng Việt
              </div>
              <div
                onClick={() => {
                  setLang("en");
                  setShowLang(false);
                }}
                className="menu-item"
              >
                English
              </div>
            </div>
          )}
        </div>

        {/* CHỌN VAI TRÒ */}
        <div className="w-full max-w-[320px] relative">
          <span className="block text-center text-[10px] text-white tracking-[0.3em] uppercase mb-3">
            Bạn là... / I am...
          </span>
          <div
            onClick={() => {
              setShowRole(!showRole);
              setShowLang(false);
            }}
            className="role-box"
          >
            <span className="flex-1 text-center text-white font-bold text-xs tracking-[0.15em] uppercase">
              {role
                ? roleOptions.find((r) => r.id === role)?.label
                : lang === "vi"
                  ? "-- CHỌN VAI TRÒ --"
                  : "-- SELECT ROLE --"}
            </span>
            <svg
              className={`w-4 h-4 text-gold transition-transform duration-300 ${showRole ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {showRole && (
            <div className="custom-menu">
              {roleOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setRole(opt.id);
                    setShowRole(false);
                  }}
                  className="menu-item border-b border-white/5 last:border-0 text-[10px]"
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CỤM NÚT HÀNH ĐỘNG */}
        <div className="w-full max-w-[320px] flex flex-col gap-5 mt-10">
          <button
            onClick={() =>
              role && router.push(`/register/${role}?lang=${lang}`)
            }
            className="w-full py-5 bg-gold text-black font-black text-[16px] tracking-[0.3em] uppercase rounded-full hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-[0_15px_35px_rgba(197,160,89,0.4)]"
          >
            {lang === "vi" ? "TIẾP TỤC" : "CONTINUE"}
          </button>

          <button
            onClick={() => router.push(`/check-status?lang=${lang}`)}
            className="w-full py-2 bg-transparent text-white/50 hover:text-gold font-medium text-[11px] tracking-[0.15em] uppercase transition-all"
          >
            {lang === "vi"
              ? "Kiểm tra thông tin đã đăng ký"
              : "Check registration info"}
          </button>
        </div>
      </div>
    </div>
  );
}
