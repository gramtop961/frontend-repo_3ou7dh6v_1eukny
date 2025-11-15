import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/state';
import type { Subject, ExamType, EnglishLevel, StudentLevel } from '@/types';
import '../styles.css';

const subjects: Subject[] = ['Обществознание', 'История', 'Английский', 'Русский язык'];
const examTypes: ExamType[] = ['ЕГЭ', 'ОГЭ', 'Школьная программа'];
const englishLevels: EnglishLevel[] = ['A1', 'A2', 'B1', 'B2'];
const studentLevels: StudentLevel[] = ['Слабый', 'Средний', 'Сильный'];

export default function Settings() {
  const { user, settings, setSettings } = useApp();
  const nav = useNavigate();
  const isEnglish = settings.subject === 'Английский';

  const freeInfo = useMemo(() => {
    if (!user) return '';
    return user.freeCredits > 0 ? `Осталось ${user.freeCredits} бесплатных генераций` : 'Бесплатные генерации закончились';
  }, [user]);

  function handleGenerate() {
    if (!user) return;
    if (user.freeCredits <= 0 && !user.isPaid) {
      nav('/no-credits');
      return;
    }
    nav('/loading');
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="card" style={{ padding: 32 }}>
        <h1 className="h1" style={{ marginBottom: 12 }}>Настройки урока</h1>
        <p className="p" style={{ marginBottom: 20 }}>Сформируйте урок под свои задачи</p>

        <div className="grid two" style={{ marginBottom: 16 }}>
          <div>
            <label className="label">Предмет</label>
            <div className="grid two">
              {subjects.map(s => (
                <button key={s} className="btn secondary" style={{ borderColor: settings.subject === s ? '#111' : undefined }} onClick={() => setSettings(prev => ({ ...prev, subject: s }))}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Формат</label>
            <div className="grid three">
              {examTypes.map(s => (
                <button key={s} className="btn secondary" style={{ borderColor: settings.examType === s ? '#111' : undefined }} onClick={() => setSettings(prev => ({ ...prev, examType: s }))}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {isEnglish && (
          <div style={{ marginBottom: 16 }}>
            <label className="label">Уровень (английский)</label>
            <div className="grid four">
              {englishLevels.map(l => (
                <button key={l} className="btn secondary" style={{ borderColor: settings.levelOrClass === l ? '#111' : undefined }} onClick={() => setSettings(prev => ({ ...prev, levelOrClass: l }))}>{l}</button>
              ))}
            </div>
          </div>
        )}

        <div className="grid two" style={{ marginBottom: 16 }}>
          <div>
            <label className="label">Тема</label>
            <input className="input" placeholder="Например: Политические режимы" value={settings.topic} onChange={e => setSettings(prev => ({ ...prev, topic: e.target.value }))} />
          </div>
          <div>
            <label className="label">Уровень ученика</label>
            <div className="grid three">
              {studentLevels.map(l => (
                <button key={l} className="btn secondary" style={{ borderColor: settings.studentLevel === l ? '#111' : undefined }} onClick={() => setSettings(prev => ({ ...prev, studentLevel: l }))}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="label">Материалы</label>
          <div className="grid two">
            <label className="btn secondary" style={{ justifyContent: 'flex-start', gap: 8 }}>
              <input type="checkbox" checked={settings.includeSlides} onChange={e => setSettings(prev => ({ ...prev, includeSlides: e.target.checked }))} /> Презентация Google Slides
            </label>
            <label className="btn secondary" style={{ justifyContent: 'flex-start', gap: 8 }}>
              <input type="checkbox" checked={settings.includeTasks} onChange={e => setSettings(prev => ({ ...prev, includeTasks: e.target.checked }))} /> Задания
            </label>
            <label className="btn secondary" style={{ justifyContent: 'flex-start', gap: 8 }}>
              <input type="checkbox" checked={settings.includeHomework} onChange={e => setSettings(prev => ({ ...prev, includeHomework: e.target.checked }))} /> Домашнее задание
            </label>
            <label className="btn secondary" style={{ justifyContent: 'flex-start', gap: 8 }}>
              <input type="checkbox" checked={settings.includeTest} onChange={e => setSettings(prev => ({ ...prev, includeTest: e.target.checked }))} /> Мини-тест
            </label>
          </div>
        </div>

        <div className="divider" />
        <div className="small" style={{ marginBottom: 16 }}>{freeInfo}</div>
        <button className="btn" onClick={handleGenerate}>Сгенерировать урок</button>
      </div>
    </div>
  );
}
