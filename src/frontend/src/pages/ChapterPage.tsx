import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnswersByChapter } from "@/hooks/useQueries";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Page } from "../App";
import { type Answer, QuestionType } from "../backend";

interface ChapterPageProps {
  year: string;
  program: string;
  subjectName: string;
  chapterNumber: bigint;
  chapterTitle: string;
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
}

const PROGRAM_LABELS: Record<string, string> = {
  FA: "FA",
  ICS: "ICS",
  "ICS-PreEng": "ICS Pre-Eng",
  Biology: "Biology",
};

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.mcq]: "MCQ",
  [QuestionType.short_]: "Short Answer",
  [QuestionType.long_]: "Long Answer",
};

const QUESTION_TYPE_COLORS: Record<QuestionType, string> = {
  [QuestionType.mcq]: "bg-purple-100 text-purple-700",
  [QuestionType.short_]: "bg-blue-100 text-blue-700",
  [QuestionType.long_]: "bg-green-100 text-green-700",
};

const FALLBACK_ANSWERS: Answer[] = [
  {
    question: "Define the main concept introduced in this chapter.",
    answer:
      "The main concept of this chapter revolves around foundational principles that students need to understand before advancing to higher-level topics. This concept forms the basis for all subsequent learning in the subject area.",
    marks: BigInt(4),
    questionType: QuestionType.short_,
  },
  {
    question:
      "Which of the following best describes this topic? (A) Definition A (B) Definition B (C) Definition C (D) Definition D",
    answer:
      "(B) Definition B — This is the correct answer because it accurately captures the key characteristics of the topic as defined in the PECTAA 2026 syllabus.",
    marks: BigInt(1),
    questionType: QuestionType.mcq,
  },
  {
    question:
      "Explain in detail the significance of this chapter's core theme, providing at least three examples.",
    answer:
      "The core theme of this chapter is highly significant for Year 1 students for several reasons:\n\n1. Foundational Knowledge: It lays the groundwork for understanding more advanced concepts in later chapters and grades.\n\n2. Practical Application: Students can apply these concepts in everyday situations, making learning relevant and engaging.\n\n3. Exam Relevance: This topic regularly appears in PECTAA assessments, making mastery essential for academic success.",
    marks: BigInt(6),
    questionType: QuestionType.long_,
  },
  {
    question: "List three key facts from this chapter.",
    answer:
      "1. The first key fact establishes the basic framework of the topic.\n2. The second key fact provides context and historical background.\n3. The third key fact connects this concept to real-world applications.",
    marks: BigInt(3),
    questionType: QuestionType.short_,
  },
  {
    question:
      "What is the primary objective of this chapter according to PECTAA 2026?",
    answer:
      "(A) To introduce foundational concepts — This is correct as the chapter is designed to build a strong base for Year 1 students following the 2026 curriculum.",
    marks: BigInt(1),
    questionType: QuestionType.mcq,
  },
  {
    question: "Describe the historical background of this topic.",
    answer:
      "The historical background of this topic spans several decades of academic development.\n\nIt originated from classical theories and was later refined to meet modern educational standards.\n\nThe PECTAA 2026 curriculum incorporates the latest research findings to provide students with up-to-date knowledge.",
    marks: BigInt(5),
    questionType: QuestionType.long_,
  },
];

function AnswerCard({ qa, index }: { qa: Answer; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-white border border-border rounded-xl overflow-hidden shadow-xs"
      data-ocid={`chapter.answers.item.${index + 1}`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-section-tint text-navy text-xs font-bold flex items-center justify-center mt-0.5">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${QUESTION_TYPE_COLORS[qa.questionType]}`}
              >
                {QUESTION_TYPE_LABELS[qa.questionType]}
              </span>
              <Badge variant="outline" className="text-xs">
                {qa.marks.toString()} mark{qa.marks > 1n ? "s" : ""}
              </Badge>
            </div>
            <p className="font-medium text-navy text-sm">{qa.question}</p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-section-tint transition-colors text-muted-foreground"
            aria-expanded={expanded}
            aria-label={expanded ? "Hide answer" : "Show answer"}
            data-ocid={`chapter.answers.toggle.${index + 1}`}
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-border">
              <div className="mt-3 pl-10">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">
                  جواب — Answer
                </p>
                <div className="prose prose-sm max-w-none text-foreground">
                  {qa.answer.split("\n").map((para) =>
                    para.trim() ? (
                      <p
                        key={para.slice(0, 30)}
                        className="mb-1.5 text-sm leading-relaxed"
                      >
                        {para}
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AnswerList({ answers }: { answers: Answer[] }) {
  if (answers.length === 0) {
    return (
      <div
        className="text-center py-12 text-muted-foreground"
        data-ocid="chapter.answers.empty_state"
      >
        <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-medium">No questions available in this category.</p>
        <p className="text-sm mt-1">اس قسم میں کوئی سوال نہیں</p>
      </div>
    );
  }
  return (
    <div className="space-y-3" data-ocid="chapter.answers.list">
      {answers.map((qa, i) => (
        <AnswerCard key={qa.question.slice(0, 30)} qa={qa} index={i} />
      ))}
    </div>
  );
}

export function ChapterPage({
  year,
  program,
  subjectName,
  chapterNumber,
  chapterTitle,
  onNavigate,
}: ChapterPageProps) {
  const { data: answers, isLoading } = useAnswersByChapter(
    subjectName,
    chapterNumber,
  );

  const displayAnswers =
    answers && answers.length > 0 ? answers : isLoading ? [] : FALLBACK_ANSWERS;

  const shortAnswers = displayAnswers.filter(
    (a) => a.questionType === QuestionType.short_,
  );
  const longAnswers = displayAnswers.filter(
    (a) => a.questionType === QuestionType.long_,
  );
  const mcqAnswers = displayAnswers.filter(
    (a) => a.questionType === QuestionType.mcq,
  );

  return (
    <main className="min-h-screen bg-background" data-ocid="chapter.page">
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() =>
              onNavigate("chapters", { year, program, subjectName })
            }
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            data-ocid="chapter.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> واپس — Back to {subjectName}
          </button>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-orange" />
            </div>
            <div>
              <p className="text-white/60 text-sm">
                Year {year} · {PROGRAM_LABELS[program] ?? program} ·{" "}
                {subjectName} · Chapter {chapterNumber.toString()}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {chapterTitle}
              </h1>
              {!isLoading && (
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="text-xs bg-purple-500/20 text-purple-200 px-2.5 py-1 rounded-full">
                    {mcqAnswers.length} MCQs
                  </span>
                  <span className="text-xs bg-blue-500/20 text-blue-200 px-2.5 py-1 rounded-full">
                    {shortAnswers.length} Short
                  </span>
                  <span className="text-xs bg-green-500/20 text-green-200 px-2.5 py-1 rounded-full">
                    {longAnswers.length} Long
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-3" data-ocid="chapter.loading_state">
            {["s1", "s2", "s3", "s4", "s5"].map((id) => (
              <Skeleton key={id} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : (
          <Tabs defaultValue="short" data-ocid="chapter.resource.tab">
            <TabsList className="w-full mb-6 h-12 bg-section-tint rounded-xl p-1">
              <TabsTrigger
                value="short"
                className="flex-1 text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-xs"
                data-ocid="chapter.short.tab"
              >
                شارٹ سوالات
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full hidden sm:inline">
                  {shortAnswers.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="long"
                className="flex-1 text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-xs"
                data-ocid="chapter.long.tab"
              >
                لانگ سوالات
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full hidden sm:inline">
                  {longAnswers.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="mcq"
                className="flex-1 text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-xs"
                data-ocid="chapter.mcq.tab"
              >
                ایم سی کیوز
                <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full hidden sm:inline">
                  {mcqAnswers.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="short">
              <h2 className="font-semibold text-navy text-base mb-4">
                Short Questions — شارٹ سوالات
              </h2>
              <AnswerList answers={shortAnswers} />
            </TabsContent>

            <TabsContent value="long">
              <h2 className="font-semibold text-navy text-base mb-4">
                Long Questions — لانگ سوالات
              </h2>
              <AnswerList answers={longAnswers} />
            </TabsContent>

            <TabsContent value="mcq">
              <h2 className="font-semibold text-navy text-base mb-4">
                MCQs — ایم سی کیوز
              </h2>
              <AnswerList answers={mcqAnswers} />
            </TabsContent>
          </Tabs>
        )}
      </section>
    </main>
  );
}
