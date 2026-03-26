import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ChapterPage } from "./pages/ChapterPage";
import { ChaptersPage } from "./pages/ChaptersPage";
import { HomePage } from "./pages/HomePage";
import { ProgramPage } from "./pages/ProgramPage";
import { SearchPage } from "./pages/SearchPage";
import { SubjectPage } from "./pages/SubjectPage";

export type Page =
  | "year"
  | "program"
  | "subject"
  | "chapters"
  | "chapter"
  | "search";

export interface NavState {
  page: Page;
  year?: string;
  program?: string;
  subjectName?: string;
  chapterNumber?: bigint;
  chapterTitle?: string;
  searchQuery?: string;
}

const queryClient = new QueryClient();

function AppContent() {
  const [navState, setNavState] = useState<NavState>({ page: "year" });

  const handleNavigate = useCallback(
    (page: Page, params?: Record<string, unknown>) => {
      setNavState({
        page,
        year: params?.year as string | undefined,
        program: params?.program as string | undefined,
        subjectName: params?.subjectName as string | undefined,
        chapterNumber: params?.chapterNumber as bigint | undefined,
        chapterTitle: params?.chapterTitle as string | undefined,
        searchQuery: params?.searchQuery as string | undefined,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [],
  );

  const handleSearch = useCallback((query: string) => {
    setNavState({ page: "search", searchQuery: query });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderPage = () => {
    switch (navState.page) {
      case "program":
        return (
          <ProgramPage
            year={navState.year ?? "1"}
            onNavigate={handleNavigate}
          />
        );
      case "subject":
        return (
          <SubjectPage
            year={navState.year ?? "1"}
            program={navState.program ?? "FA"}
            onNavigate={handleNavigate}
          />
        );
      case "chapters":
        return (
          <ChaptersPage
            year={navState.year ?? "1"}
            program={navState.program ?? "FA"}
            subjectName={navState.subjectName ?? ""}
            onNavigate={handleNavigate}
          />
        );
      case "chapter":
        return (
          <ChapterPage
            year={navState.year ?? "1"}
            program={navState.program ?? "FA"}
            subjectName={navState.subjectName ?? ""}
            chapterNumber={navState.chapterNumber ?? 1n}
            chapterTitle={navState.chapterTitle ?? ""}
            onNavigate={handleNavigate}
          />
        );
      case "search":
        return (
          <SearchPage
            initialQuery={navState.searchQuery ?? ""}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} onSearch={handleSearch} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} onSearch={handleSearch} />
      <div className="flex-1">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
