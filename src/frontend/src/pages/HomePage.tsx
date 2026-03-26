import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, GraduationCap, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Page } from "../App";

interface HomePageProps {
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
  onSearch: (query: string) => void;
}

export function HomePage({ onNavigate, onSearch }: HomePageProps) {
  const [heroSearch, setHeroSearch] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) onSearch(heroSearch.trim());
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[460px] flex flex-col items-center justify-center text-center px-4 py-16"
        style={{
          backgroundImage: `url('/assets/generated/hero-library.dim_1920x1080.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Hero section"
      >
        <div
          className="absolute inset-0 bg-[oklch(0.12_0.04_230/0.80)]"
          aria-hidden
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 bg-orange text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
              PECTAA 2026 Curriculum
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
              Solved Questions 2026
            </h1>
            <p className="text-white/80 text-lg mb-2">
              پہلے اور دوسرے سال کے طلباء کے لیے مکمل حل شدہ سوالات
            </p>
            <p className="text-white/60 text-sm mb-8">
              Complete solved questions for 1st &amp; 2nd Year students
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-hero px-5 py-4 max-w-xl mx-auto"
          >
            <form onSubmit={handleHeroSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="سوال تلاش کریں... Search questions..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="pl-9 h-11 text-sm"
                  data-ocid="hero.search_input"
                />
              </div>
              <Button
                type="submit"
                className="bg-orange hover:bg-orange-dark text-white border-none h-11 px-5 font-semibold"
                data-ocid="hero.search.button"
              >
                Search
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Year Selection */}
      <section
        className="py-16 px-4 bg-background"
        aria-labelledby="year-heading"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              id="year-heading"
              className="font-display text-3xl font-bold text-navy mb-2"
            >
              اپنا سال منتخب کریں
            </h2>
            <p className="text-muted-foreground">Select Your Year</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Year Card */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("program", { year: "1" })}
              className="group relative overflow-hidden bg-navy text-white rounded-2xl p-8 text-left shadow-card hover:shadow-hero transition-all min-h-[220px] flex flex-col justify-between"
              data-ocid="year.first_year.button"
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 bg-orange/10 rounded-full translate-x-12 -translate-y-12"
                aria-hidden
              />
              <div
                className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-8 translate-y-8"
                aria-hidden
              />
              <div className="relative">
                <div className="w-14 h-14 bg-orange/20 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-orange" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  پہلا سال
                </h3>
                <p className="text-white/70 text-base font-medium">
                  First Year
                </p>
                <p className="text-white/50 text-sm mt-2">
                  FA, ICS, ICS Pre-Eng, Biology
                </p>
              </div>
              <div className="relative flex items-center gap-2 mt-4">
                <span className="text-orange font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                  شروع کریں ← Start →
                </span>
              </div>
            </motion.button>

            {/* Second Year Card */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("program", { year: "2" })}
              className="group relative overflow-hidden bg-white border-2 border-navy/10 text-navy rounded-2xl p-8 text-left shadow-card hover:shadow-hero hover:border-navy/30 transition-all min-h-[220px] flex flex-col justify-between"
              data-ocid="year.second_year.button"
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 bg-section-tint rounded-full translate-x-12 -translate-y-12"
                aria-hidden
              />
              <div>
                <div className="w-14 h-14 bg-section-tint rounded-2xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-display text-2xl font-bold text-navy mb-1">
                  دوسرا سال
                </h3>
                <p className="text-navy/70 text-base font-medium">
                  Second Year
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  FA, ICS, ICS Pre-Eng, Biology
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-navy font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                  شروع کریں ← Start →
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-10 px-4 bg-section-tint">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { emoji: "✅", en: "Fully Solved", ur: "مکمل حل شدہ" },
              { emoji: "📚", en: "PECTAA 2026", ur: "پیکٹا نصاب" },
              { emoji: "⚡", en: "Instant Search", ur: "فوری تلاش" },
              { emoji: "📱", en: "Mobile Friendly", ur: "موبائل سازگار" },
            ].map((f, i) => (
              <motion.div
                key={f.en}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl p-4 shadow-xs"
              >
                <span className="text-2xl block mb-1">{f.emoji}</span>
                <p className="text-navy font-semibold text-sm">{f.en}</p>
                <p className="text-muted-foreground text-xs">{f.ur}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
