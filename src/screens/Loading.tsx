import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/state';
import { generateLesson } from '@/lib/api';
import type { GenerateRequest } from '@/types';
import '../styles.css';

const phrases = [
  'Формируем урок…',
  'Готовим презентацию…',
  'Подбираем задания…',
];

export default function Loading() {
  const { user, settings, setUser } = useApp();
  const nav = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % phrases.length), 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function run() {
      if (!user) return;
      const payload: GenerateRequest = {
        telegramUserId: user.telegramUserId,
        subject: settings.subject,
        examType: settings.examType,
        levelOrClass: settings.levelOrClass,
        topic: settings.topic,
        studentLevel: settings.studentLevel,
        includeSlides: settings.includeSlides,
        includeTasks: settings.includeTasks,
        includeHomework: settings.includeHomework,
        includeTest: settings.includeTest,
      };
      try {
        const res = await generateLesson(payload);
        if (res.newFreeCredits !== undefined) {
          setUser((prev) => (prev ? { ...prev, freeCredits: res.newFreeCredits! } : prev));
        }
        sessionStorage.setItem('lessonResult', JSON.stringify(res));
        nav('/result');
      } catch (e) {
        nav('/home');
      }
    }
    run();
  }, [user]);

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <div className="h2" style={{ marginBottom: 12 }}>{phrases[step]}</div>
        <div className="p">Подождите, займёт около минуты</div>
        <div style={{ height: 8, background: '#f3f4f6', borderRadius: 999, marginTop: 20 }}>
          <div style={{ height: 8, width: `${((step+1)/phrases.length)*100}%`, background: '#111', borderRadius: 999, transition: 'width 0.6s ease' }} />
        </div>
      </div>
    </div>
  );
}
