import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useChaptersBySubject } from "@/hooks/useQueries";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";
import type { Chapter } from "../backend";

interface ChaptersPageProps {
  year: string;
  program: string;
  subjectName: string;
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
}

const PROGRAM_LABELS: Record<string, string> = {
  FA: "FA",
  ICS: "ICS",
  "ICS-PreEng": "ICS Pre-Eng",
  Biology: "Biology",
  FIIT: "FIIT",
};

const SUBJECT_CHAPTERS: Record<
  string,
  Array<{ title: string; urTitle: string }>
> = {
  Urdu: [
    { title: "حمد و نعت", urTitle: "Hamd o Naat" },
    { title: "افسانہ — مختصر کہانی", urTitle: "Short Story / Afsana" },
    { title: "نظم — شاعری", urTitle: "Poetry / Nazm" },
    { title: "غزل", urTitle: "Ghazal" },
    { title: "خاکہ نویسی", urTitle: "Character Sketch" },
    { title: "انشائیہ", urTitle: "Essay" },
    { title: "قواعد — گرامر", urTitle: "Grammar / Qawaid" },
    { title: "مکتوب نویسی", urTitle: "Letter Writing" },
    { title: "خلاصہ نویسی", urTitle: "Summary Writing" },
    { title: "مضمون نویسی", urTitle: "Essay Writing" },
  ],
  English: [
    { title: "Comprehension Skills", urTitle: "تفہیم" },
    { title: "Grammar Fundamentals", urTitle: "گرامر بنیادیات" },
    { title: "Reading & Vocabulary", urTitle: "مطالعہ و الفاظ" },
    { title: "Prose — Short Stories", urTitle: "نثر — کہانیاں" },
    { title: "Poetry Analysis", urTitle: "شاعری تجزیہ" },
    { title: "Letter Writing", urTitle: "خط نویسی" },
    { title: "Essay Writing", urTitle: "مضمون نویسی" },
    { title: "Pair of Words", urTitle: "الفاظ کے جوڑے" },
    { title: "Idioms & Phrases", urTitle: "محاورے و فقرے" },
  ],
  "Islamic Studies": [
    { title: "قرآن مجید — تفسیر", urTitle: "Quran Majeed — Tafseer" },
    { title: "حدیث مبارکہ", urTitle: "Hadith Mubarak" },
    { title: "سیرت النبی ﷺ", urTitle: "Seerat un Nabi" },
    { title: "اسلامی عقائد", urTitle: "Islamic Beliefs" },
    { title: "اسلامی عبادات", urTitle: "Islamic Worship / Ibadat" },
    { title: "اسلامی اخلاق", urTitle: "Islamic Ethics" },
    { title: "اسلامی معاشرت", urTitle: "Islamic Social Life" },
    { title: "اسلامی سیاست", urTitle: "Islamic Politics" },
  ],
  "Pakistan Studies": [
    { title: "پاکستان کی جغرافیائی حالت", urTitle: "Geography of Pakistan" },
    { title: "تحریک پاکستان", urTitle: "Pakistan Movement" },
    { title: "قیام پاکستان", urTitle: "Establishment of Pakistan" },
    { title: "آئین پاکستان", urTitle: "Constitution of Pakistan" },
    { title: "پاکستانی معیشت", urTitle: "Pakistan Economy" },
    { title: "پاکستانی ثقافت", urTitle: "Pakistani Culture" },
    { title: "پاکستان کے وسائل", urTitle: "Resources of Pakistan" },
    { title: "پاکستان کی خارجہ پالیسی", urTitle: "Foreign Policy of Pakistan" },
  ],
  Mathematics: [
    { title: "اعداد کا نظام", urTitle: "Number System" },
    { title: "سیٹ تھیوری", urTitle: "Set Theory" },
    { title: "لوگارتھم", urTitle: "Logarithms" },
    { title: "میٹرکس و ڈیٹرمیننٹ", urTitle: "Matrices & Determinants" },
    { title: "قواعد خطی", urTitle: "Linear Equations" },
    { title: "مثلثات", urTitle: "Trigonometry" },
    { title: "تناسب اور تعلق", urTitle: "Ratio and Proportion" },
    { title: "ارتقائی ریاضی", urTitle: "Sequences & Series" },
    { title: "مربع معادلات", urTitle: "Quadratic Equations" },
    { title: "بنیادی حساب", urTitle: "Basic Calculus" },
  ],
  Physics: [
    { title: "طبیعیات کا تعارف", urTitle: "Introduction to Physics" },
    { title: "قوت اور حرکت", urTitle: "Force and Motion" },
    { title: "کام اور توانائی", urTitle: "Work and Energy" },
    { title: "حرارت", urTitle: "Heat and Thermodynamics" },
    { title: "لہریں اور آواز", urTitle: "Waves and Sound" },
    { title: "روشنی", urTitle: "Light / Optics" },
    { title: "بجلی", urTitle: "Electricity" },
    { title: "مقناطیسیت", urTitle: "Magnetism" },
    { title: "جدید طبیعیات", urTitle: "Modern Physics" },
  ],
  Chemistry: [
    { title: "کیمسٹری کا تعارف", urTitle: "Introduction to Chemistry" },
    { title: "ایٹم کی ساخت", urTitle: "Atomic Structure" },
    { title: "کیمیائی بندھن", urTitle: "Chemical Bonding" },
    { title: "مادے کی حالتیں", urTitle: "States of Matter" },
    { title: "محلول", urTitle: "Solutions" },
    { title: "تیزاب اور الکلی", urTitle: "Acids and Bases" },
    { title: "آکسیڈیشن ریڈکشن", urTitle: "Oxidation-Reduction" },
    { title: "نامیاتی کیمسٹری", urTitle: "Organic Chemistry" },
  ],
  Biology: [
    { title: "حیاتیات کا تعارف", urTitle: "Introduction to Biology" },
    { title: "خلیہ — سیل", urTitle: "Cell Biology" },
    { title: "بایو مالیکیولز", urTitle: "Biomolecules" },
    { title: "خامرے — انزائم", urTitle: "Enzymes" },
    { title: "وائرس اور بیکٹیریا", urTitle: "Viruses and Bacteria" },
    { title: "فنجائی", urTitle: "Fungi" },
    { title: "پودوں کی ساخت", urTitle: "Plant Structure" },
    { title: "جانوروں کی ساخت", urTitle: "Animal Structure" },
    { title: "ہاضمہ", urTitle: "Digestion" },
    { title: "سانس لینا", urTitle: "Respiration" },
  ],
  "Computer Science": [
    { title: "کمپیوٹر کا تعارف", urTitle: "Introduction to Computer" },
    { title: "ہارڈویئر و سافٹ ویئر", urTitle: "Hardware and Software" },
    { title: "آپریٹنگ سسٹم", urTitle: "Operating System" },
    { title: "پروگرامنگ بنیادیات", urTitle: "Programming Fundamentals" },
    { title: "الگورتھم و فلو چارٹ", urTitle: "Algorithm and Flowchart" },
    { title: "ڈیٹا بیس", urTitle: "Database" },
    { title: "نیٹ ورکنگ", urTitle: "Networking" },
    { title: "سائبر سیکیورٹی", urTitle: "Cyber Security" },
  ],
  "IT Fundamentals": [
    { title: "آئی ٹی کا تعارف", urTitle: "Introduction to IT" },
    { title: "انٹرنیٹ بنیادیات", urTitle: "Internet Basics" },
    { title: "ویب ڈیزائن", urTitle: "Web Design" },
    { title: "ڈیجیٹل مواصلات", urTitle: "Digital Communication" },
    { title: "ڈیٹا مینجمنٹ", urTitle: "Data Management" },
    { title: "آفس ایپلیکیشنز", urTitle: "Office Applications" },
  ],
  Economics: [
    { title: "معاشیات کا تعارف", urTitle: "Introduction to Economics" },
    { title: "طلب و رسد", urTitle: "Demand and Supply" },
    { title: "قیمتوں کا تعین", urTitle: "Price Determination" },
    { title: "قومی آمدنی", urTitle: "National Income" },
    { title: "پیسہ اور بینکنگ", urTitle: "Money and Banking" },
    { title: "پاکستانی معیشت", urTitle: "Pakistani Economy" },
    { title: "تجارت", urTitle: "Trade" },
  ],
  default: [
    {
      title: "تعارف اور بنیادی تصورات",
      urTitle: "Introduction and Basic Concepts",
    },
    {
      title: "اہم تعریفیں اور اصطلاحات",
      urTitle: "Core Definitions and Terminology",
    },
    { title: "بنیادی عملیات", urTitle: "Fundamental Operations" },
    { title: "مسائل اور مثالیں", urTitle: "Applied Problems and Examples" },
    { title: "اعلی موضوعات", urTitle: "Advanced Topics" },
    { title: "جائزہ اور مشق", urTitle: "Review and Practice Questions" },
    { title: "حقیقی زندگی میں استعمال", urTitle: "Real-World Applications" },
    { title: "امتحانی تیاری", urTitle: "Assessment Preparation" },
  ],
};

export function ChaptersPage({
  year,
  program,
  subjectName,
  onNavigate,
}: ChaptersPageProps) {
  const { data: chapters, isLoading } = useChaptersBySubject(subjectName);

  const subjectChapters =
    SUBJECT_CHAPTERS[subjectName] ?? SUBJECT_CHAPTERS.default;
  const FALLBACK_CHAPTERS: Chapter[] = subjectChapters.map((ch, i) => ({
    chapterNumber: BigInt(i + 1),
    title: ch.title,
    subjectName: subjectName,
  }));

  const displayChapters =
    chapters && chapters.length > 0
      ? chapters
      : isLoading
        ? []
        : FALLBACK_CHAPTERS;

  return (
    <main className="min-h-screen bg-background" data-ocid="chapters.page">
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => onNavigate("subject", { year, program })}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            data-ocid="chapters.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> واپس — Back to Subjects
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-orange" />
            </div>
            <div>
              <p className="text-white/60 text-sm">
                Year {year} · {PROGRAM_LABELS[program] ?? program} · PECTAA 2026
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {subjectName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-navy text-lg">
            تمام چپٹرز — All Chapters
          </h2>
          {!isLoading && (
            <Badge variant="secondary" className="text-xs">
              {displayChapters.length} chapters
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3" data-ocid="chapters.loading_state">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
              <Skeleton key={id} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3" data-ocid="chapters.list">
            {displayChapters.map((chapter, i) => (
              <motion.button
                type="button"
                key={chapter.chapterNumber.toString()}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() =>
                  onNavigate("chapter", {
                    year,
                    program,
                    subjectName,
                    chapterNumber: chapter.chapterNumber,
                    chapterTitle: chapter.title,
                  })
                }
                className="w-full flex items-center gap-4 bg-white border border-border rounded-xl px-5 py-4 text-left hover:shadow-card hover:border-blue-link/30 transition-all group"
                data-ocid={`chapters.item.${i + 1}`}
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-section-tint text-navy font-bold text-sm flex items-center justify-center">
                  {chapter.chapterNumber.toString()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    چپٹر {chapter.chapterNumber.toString()} — Chapter{" "}
                    {chapter.chapterNumber.toString()}
                  </p>
                  <p className="font-semibold text-navy text-sm group-hover:text-blue-link transition-colors truncate">
                    {chapter.title}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-link flex-shrink-0 transition-colors" />
              </motion.button>
            ))}
          </div>
        )}

        {!isLoading && displayChapters.length === 0 && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="chapters.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No chapters found for this subject.</p>
          </div>
        )}
      </section>
    </main>
  );
}
