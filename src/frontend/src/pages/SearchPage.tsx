import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchAnswers } from "@/hooks/useQueries";
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Page } from "../App";
import { type Answer, QuestionType } from "../backend";

interface SearchPageProps {
  initialQuery: string;
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
}

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.mcq]: "MCQ",
  [QuestionType.short_]: "Short Answer",
  [QuestionType.long_]: "Long Answer",
};

function ResultCard({ qa, index }: { qa: Answer; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white border border-border rounded-xl overflow-hidden shadow-xs"
      data-ocid={`search.results.item.${index + 1}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {QUESTION_TYPE_LABELS[qa.questionType]}
              </Badge>
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
            data-ocid={`search.results.toggle.${index + 1}`}
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
            <div className="px-5 pb-5 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2 mt-3">
                جواب — Answer
              </p>
              <div className="text-sm leading-relaxed text-foreground">
                {qa.answer.split("\n").map((para) =>
                  para.trim() ? (
                    <p key={para.slice(0, 30)} className="mb-1.5">
                      {para}
                    </p>
                  ) : null,
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SearchPage({ initialQuery, onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const { data: results, isLoading } = useSearchAnswers(activeQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setActiveQuery(query.trim());
  };

  return (
    <main className="min-h-screen bg-background" data-ocid="search.page">
      <div className="bg-navy text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => onNavigate("year")}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            data-ocid="search.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> واپس — Back to Home
          </button>
          <h1 className="font-display text-2xl font-bold text-white mb-4">
            تلاش نتائج — Search Results
          </h1>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="search"
                placeholder="سوالات، موضوعات، چپٹرز تلاش کریں..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-orange"
                data-ocid="search.search_input"
              />
            </div>
            <Button
              type="submit"
              className="bg-orange hover:bg-orange-dark text-white border-none"
              data-ocid="search.submit.button"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-8">
        {activeQuery && (
          <p className="text-sm text-muted-foreground mb-5">
            {isLoading
              ? "Searching…"
              : `${results?.length ?? 0} result${(results?.length ?? 0) !== 1 ? "s" : ""} for "`}
            {!isLoading && <strong className="text-navy">{activeQuery}</strong>}
            {!isLoading && ""}
          </p>
        )}

        {isLoading ? (
          <div className="space-y-3" data-ocid="search.loading_state">
            {["s1", "s2", "s3", "s4"].map((id) => (
              <Skeleton key={id} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : results && results.length > 0 ? (
          <div className="space-y-3" data-ocid="search.results.list">
            {results.map((qa, i) => (
              <ResultCard key={qa.question.slice(0, 30)} qa={qa} index={i} />
            ))}
          </div>
        ) : activeQuery ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="search.results.empty_state"
          >
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-1">No results found.</p>
            <p className="text-sm">
              کوئی نتیجہ نہیں ملا۔ مختلف کلیدی لفظ آزمائیں۔
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => onNavigate("year")}
              data-ocid="search.browse_subjects.button"
            >
              Browse Subjects
            </Button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
