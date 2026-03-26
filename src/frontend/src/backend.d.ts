import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Answer {
    marks: bigint;
    question: string;
    answer: string;
    questionType: QuestionType;
}
export interface Subject {
    icon: string;
    name: string;
    description: string;
}
export interface Chapter {
    title: string;
    chapterNumber: bigint;
    subjectName: string;
}
export enum QuestionType {
    mcq = "mcq",
    long_ = "long",
    short_ = "short"
}
export interface backendInterface {
    getAnswersByChapter(subjectName: string, chapterNumber: bigint): Promise<Array<Answer>>;
    getChaptersBySubject(subjectName: string): Promise<Array<Chapter>>;
    getSubjects(): Promise<Array<Subject>>;
    searchAnswers(keyword: string): Promise<Array<Answer>>;
}
