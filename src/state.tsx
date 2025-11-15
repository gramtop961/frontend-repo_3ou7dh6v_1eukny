import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { UserState, Subject, ExamType, StudentLevel, EnglishLevel } from './types';
import { checkUser } from './lib/api';
import { getTelegram, getUserFromTelegram } from './lib/telegram';

export interface LessonSettings {
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

interface AppContextValue {
  user: UserState | null;
  setUser: React.Dispatch<React.SetStateAction<UserState | null>>;
  settings: LessonSettings;
  setSettings: React.Dispatch<React.SetStateAction<LessonSettings>>;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultSettings: LessonSettings = {
  subject: 'Обществознание',
  examType: 'ЕГЭ',
  levelOrClass: '',
  topic: '',
  studentLevel: 'Средний',
  includeSlides: true,
  includeTasks: true,
  includeHomework: true,
  includeTest: true,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState | null>(null);
  const [settings, setSettings] = useState<LessonSettings>(defaultSettings);

  useEffect(() => {
    const tg = getTelegram();
    tg?.ready();
    tg?.expand();

    const fromTg = getUserFromTelegram();
    if (fromTg) {
      checkUser(fromTg.id).then((data) => {
        setUser({ telegramUserId: fromTg.id, username: fromTg.username, ...data });
      }).catch(() => {
        setUser({ telegramUserId: fromTg.id, username: fromTg.username, isPaid: false, freeCredits: 3 });
      });
    } else {
      // Fallback for local preview
      setUser({ telegramUserId: 123, username: 'Гость', isPaid: false, freeCredits: 3 });
    }
  }, []);

  const value = useMemo(() => ({ user, setUser, settings, setSettings }), [user, settings]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
