export type Subject = 'Обществознание' | 'История' | 'Английский' | 'Русский язык';
export type ExamType = 'ЕГЭ' | 'ОГЭ' | 'Школьная программа';
export type StudentLevel = 'Слабый' | 'Средний' | 'Сильный';
export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface UserState {
  telegramUserId: number;
  username: string;
  isPaid: boolean;
  freeCredits: number;
}

export interface GenerateRequest {
  telegramUserId: number;
  subject: Subject;
  examType: ExamType;
  levelOrClass?: EnglishLevel | string;
  topic: string;
  studentLevel: StudentLevel;
  includeSlides: boolean;
  includeTasks: boolean;
  includeHomework: boolean;
  includeTest: boolean;
}

export interface GenerateResponse {
  status: 'ok' | 'error';
  slidesUrl?: string;
  pdfUrl?: string;
  tasks?: string;
  homework?: string;
  test?: string;
  newFreeCredits?: number;
  message?: string;
}
