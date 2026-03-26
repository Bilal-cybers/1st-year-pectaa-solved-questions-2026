import { useQuery } from "@tanstack/react-query";
import type { Answer, Chapter, Subject } from "../backend";
import { useActor } from "./useActor";

export function useSubjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useChaptersBySubject(subjectName: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Chapter[]>({
    queryKey: ["chapters", subjectName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChaptersBySubject(subjectName);
    },
    enabled: !!actor && !isFetching && !!subjectName,
  });
}

export function useAnswersByChapter(
  subjectName: string,
  chapterNumber: bigint,
) {
  const { actor, isFetching } = useActor();
  return useQuery<Answer[]>({
    queryKey: ["answers", subjectName, chapterNumber.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAnswersByChapter(subjectName, chapterNumber);
    },
    enabled: !!actor && !isFetching && !!subjectName,
  });
}

export function useSearchAnswers(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Answer[]>({
    queryKey: ["search", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return [];
      return actor.searchAnswers(keyword);
    },
    enabled: !!actor && !isFetching && !!keyword.trim(),
  });
}
