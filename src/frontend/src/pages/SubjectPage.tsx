import { ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface SubjectPageProps {
  year: string;
  program: string;
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
}

const PROGRAM_SUBJECTS: Record<
  string,
  Array<{ name: string; ur: string; emoji: string }>
> = {
  FA: [
    { name: "Urdu", ur: "اردو", emoji: "✒️" },
    { name: "English", ur: "انگریزی", emoji: "📖" },
    { name: "Islamic Studies", ur: "اسلامیات", emoji: "☪️" },
    { name: "Pakistan Studies", ur: "پاکستان سٹڈیز", emoji: "🇵🇰" },
    { name: "Mathematics", ur: "ریاضی", emoji: "📐" },
    { name: "Economics", ur: "معاشیات", emoji: "📊" },
    { name: "General Science", ur: "جنرل سائنس", emoji: "🔬" },
    { name: "History", ur: "تاریخ", emoji: "🏛️" },
    { name: "Education", ur: "تعلیم", emoji: "🎓" },
    { name: "Statistics", ur: "شماریات", emoji: "📈" },
    { name: "Civics", ur: "سیویکس", emoji: "⚖️" },
    { name: "Geography", ur: "جغرافیہ", emoji: "🗺️" },
  ],
  ICS: [
    { name: "Urdu", ur: "اردو", emoji: "✒️" },
    { name: "English", ur: "انگریزی", emoji: "📖" },
    { name: "Islamic Studies", ur: "اسلامیات", emoji: "☪️" },
    { name: "Pakistan Studies", ur: "پاکستان سٹڈیز", emoji: "🇵🇰" },
    { name: "Mathematics", ur: "ریاضی", emoji: "📐" },
    { name: "Physics", ur: "فزکس", emoji: "⚛️" },
    { name: "Computer Science", ur: "کمپیوٹر سائنس", emoji: "💻" },
  ],
  "ICS-PreEng": [
    { name: "Urdu", ur: "اردو", emoji: "✒️" },
    { name: "English", ur: "انگریزی", emoji: "📖" },
    { name: "Islamic Studies", ur: "اسلامیات", emoji: "☪️" },
    { name: "Pakistan Studies", ur: "پاکستان سٹڈیز", emoji: "🇵🇰" },
    { name: "Mathematics", ur: "ریاضی", emoji: "📐" },
    { name: "Physics", ur: "فزکس", emoji: "⚛️" },
    { name: "Chemistry", ur: "کیمسٹری", emoji: "🧪" },
  ],
  Biology: [
    { name: "Urdu", ur: "اردو", emoji: "✒️" },
    { name: "English", ur: "انگریزی", emoji: "📖" },
    { name: "Islamic Studies", ur: "اسلامیات", emoji: "☪️" },
    { name: "Pakistan Studies", ur: "پاکستان سٹڈیز", emoji: "🇵🇰" },
    { name: "Mathematics", ur: "ریاضی", emoji: "📐" },
    { name: "Biology", ur: "بائیولوجی", emoji: "🧬" },
    { name: "Chemistry", ur: "کیمسٹری", emoji: "🧪" },
  ],
  FIIT: [
    { name: "Urdu", ur: "اردو", emoji: "✒️" },
    { name: "English", ur: "انگریزی", emoji: "📖" },
    { name: "Islamic Studies", ur: "اسلامیات", emoji: "☪️" },
    { name: "Pakistan Studies", ur: "پاکستان سٹڈیز", emoji: "🇵🇰" },
    { name: "Mathematics", ur: "ریاضی", emoji: "📐" },
    { name: "Computer Science", ur: "کمپیوٹر سائنس", emoji: "💻" },
    { name: "IT Fundamentals", ur: "آئی ٹی بنیادیات", emoji: "🖥️" },
    { name: "Physics", ur: "فزکس", emoji: "⚛️" },
  ],
};

const PROGRAM_LABELS: Record<string, { en: string; ur: string }> = {
  FA: { en: "FA", ur: "فا" },
  ICS: { en: "ICS", ur: "آئی سی ایس" },
  "ICS-PreEng": { en: "ICS Pre-Engineering", ur: "آئی سی ایس پری انجینئرنگ" },
  Biology: { en: "Biology", ur: "بائیو" },
  FIIT: { en: "FIIT", ur: "ایف آئی آئی ٹی" },
};

const CARD_COLORS = [
  "hover:border-blue-300 hover:bg-blue-50/50",
  "hover:border-orange-300 hover:bg-orange-50/50",
  "hover:border-green-300 hover:bg-green-50/50",
  "hover:border-purple-300 hover:bg-purple-50/50",
  "hover:border-rose-300 hover:bg-rose-50/50",
  "hover:border-teal-300 hover:bg-teal-50/50",
  "hover:border-amber-300 hover:bg-amber-50/50",
];

export function SubjectPage({ year, program, onNavigate }: SubjectPageProps) {
  const subjects = PROGRAM_SUBJECTS[program] ?? PROGRAM_SUBJECTS.FA;
  const programLabel = PROGRAM_LABELS[program] ?? { en: program, ur: program };

  return (
    <main className="min-h-screen bg-background" data-ocid="subject.page">
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => onNavigate("program", { year })}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            data-ocid="subject.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> پروگرامز — Back to Programs
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-orange" />
            </div>
            <div>
              <p className="text-white/60 text-sm">
                Year {year} · {programLabel.en} · PECTAA 2026
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {programLabel.ur} — {programLabel.en}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-navy text-lg">
            سبجیکٹس منتخب کریں — Select Subject
          </h2>
          <span className="text-xs text-muted-foreground bg-section-tint px-3 py-1 rounded-full font-medium">
            {subjects.length} Subjects
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, i) => (
            <motion.button
              type="button"
              key={subject.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onNavigate("chapters", {
                  year,
                  program,
                  subjectName: subject.name,
                })
              }
              className={`group bg-white border-2 border-border rounded-2xl p-5 text-left transition-all shadow-xs hover:shadow-card ${CARD_COLORS[i % CARD_COLORS.length]}`}
              data-ocid={`subject.item.${i + 1}`}
            >
              <span className="text-3xl block mb-3">{subject.emoji}</span>
              <h3 className="font-bold text-navy text-base mb-0.5">
                {subject.ur}
              </h3>
              <p className="text-muted-foreground text-sm">{subject.name}</p>
              <p className="text-xs text-muted-foreground mt-3 font-medium group-hover:text-navy transition-colors">
                چپٹرز دیکھیں — View Chapters →
              </p>
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  );
}
