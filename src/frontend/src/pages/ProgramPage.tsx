import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface ProgramPageProps {
  year: string;
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
}

const PROGRAMS = [
  {
    id: "FA",
    en: "FA",
    ur: "فا",
    fullEn: "Faculty of Arts",
    fullUr: "آرٹس",
    emoji: "📖",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    badge: "text-blue-700 bg-blue-100",
  },
  {
    id: "ICS",
    en: "ICS",
    ur: "آئی سی ایس",
    fullEn: "ICS (Computer Science)",
    fullUr: "انفارمیشن & کمپیوٹر سائنس",
    emoji: "💻",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    badge: "text-green-700 bg-green-100",
  },
  {
    id: "ICS-PreEng",
    en: "ICS Pre-Engineering",
    ur: "آئی سی ایس پری انجینئرنگ",
    fullEn: "ICS (Pre-Engineering)",
    fullUr: "پری انجینئرنگ",
    emoji: "⚙️",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    badge: "text-orange-700 bg-orange-100",
  },
  {
    id: "Biology",
    en: "Biology",
    ur: "بائیو",
    fullEn: "Pre-Medical (Biology)",
    fullUr: "پری میڈیکل",
    emoji: "🧬",
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    badge: "text-purple-700 bg-purple-100",
  },
  {
    id: "FIIT",
    en: "FIIT",
    ur: "ایف آئی آئی ٹی",
    fullEn: "Foundation of Information & IT",
    fullUr: "انفارمیشن ٹیکنالوجی",
    emoji: "🖥️",
    color: "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
    badge: "text-cyan-700 bg-cyan-100",
  },
];

export function ProgramPage({ year, onNavigate }: ProgramPageProps) {
  const yearLabel =
    year === "1" ? "پہلا سال — First Year" : "دوسرا سال — Second Year";

  return (
    <main className="min-h-screen bg-background" data-ocid="program.page">
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => onNavigate("year")}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            data-ocid="program.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> واپس جائیں — Back
          </button>
          <div>
            <p className="text-white/60 text-sm mb-1">
              Year {year} · PECTAA 2026
            </p>
            <h1 className="font-display text-3xl font-bold text-white">
              {yearLabel}
            </h1>
            <p className="text-white/70 mt-1 text-base">
              اپنا پروگرام منتخب کریں — Select Your Program
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROGRAMS.map((program, i) => (
            <motion.button
              type="button"
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onNavigate("subject", { year, program: program.id })
              }
              className={`group border-2 rounded-2xl p-6 text-left transition-all shadow-xs hover:shadow-card ${program.color}`}
              data-ocid={`program.item.${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{program.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${program.badge}`}
                    >
                      {program.en}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy mb-0.5">
                    {program.ur}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {program.fullEn}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-3 font-medium group-hover:text-navy transition-colors">
                سبجیکٹس دیکھیں — View Subjects →
              </p>
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  );
}
