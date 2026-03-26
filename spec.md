# 1st Year PECTAA Solved Questions 2026

## Current State
- Programs: FA, ICS, ICS-PreEng, Biology
- FA has 6 subjects
- All subjects share the same generic fallback chapters
- FIIT program is missing

## Requested Changes (Diff)

### Add
- FIIT program (Foundation of Information & IT)
- More subjects for FA program (8-10 subjects to be complete)
- Subject-specific fallback chapters so each subject shows relevant chapter titles

### Modify
- ProgramPage: Add FIIT to the programs list
- SubjectPage: Expand FA subjects list, add FIIT subjects
- ChaptersPage: Replace single generic FALLBACK_CHAPTERS with a per-subject map of relevant chapter titles

### Remove
- Nothing

## Implementation Plan
1. Add FIIT program card in ProgramPage.tsx
2. Add FIIT subjects in SubjectPage.tsx PROGRAM_SUBJECTS
3. Expand FA subjects (add History, General Science, Education, Statistics, Civics etc.)
4. Add SUBJECT_CHAPTERS map in ChaptersPage.tsx with Urdu, English, Islamiat, Pakistan Studies, Maths, Physics, Chemistry, Biology, Computer Science, Economics chapters (PECTAA 2026 style titles)
5. Use subject-specific fallback chapters in ChaptersPage display logic
