import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import Spline from '@splinetool/react-spline';

export default function Onboarding() {
  const nav = useNavigate();
  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="grid two" style={{ alignItems: 'center' }}>
        <div>
          <div className="card" style={{ padding: 36 }}>
            <div className="badge" style={{ marginBottom: 16 }}>LessonBot</div>
            <h1 className="h1" style={{ marginBottom: 12 }}>Генератор уроков и презентаций для репетиторов</h1>
            <p className="p" style={{ marginBottom: 20 }}>Готовые уроки под ЕГЭ/ОГЭ за 1 минуту</p>
            <ul className="p" style={{ marginBottom: 24 }}>
              <li>• Презентации Google Slides</li>
              <li>• Задания, ДЗ и тесты</li>
              <li>• Обществознание • История • Английский • Русский</li>
              <li>• Разработано специально для онлайн-преподавателей</li>
            </ul>
            <button className="btn" onClick={() => nav('/home')}>Начать</button>
          </div>
        </div>
        <div>
          <div className="hero-spline">
            <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
