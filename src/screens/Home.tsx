import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/state';
import '../styles.css';

export default function Home() {
  const { user } = useApp();
  const nav = useNavigate();

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="grid two" style={{ alignItems: 'start' }}>
        <div className="card" style={{ padding: 36 }}>
          <h1 className="h1" style={{ marginBottom: 12 }}>Автоматическая генерация уроков с презентациями и заданиями</h1>
          <p className="p" style={{ marginBottom: 16 }}>Привет, {user?.username || 'гость'}! 👋</p>
          <p className="p" style={{ marginBottom: 20 }}>
            Сервис создаёт готовые уроки, презентации, задания и ДЗ по школьным предметам. <br/>
            Идеально для Zoom, Skype и всех онлайн-занятий.
          </p>
          <div className="grid two" style={{ marginTop: 10, marginBottom: 24 }}>
            <div className="card"><div className="h2" style={{ marginBottom: 8 }}>3 бесплатные генерации</div><div className="p">Для старта</div></div>
            <div className="card"><div className="h2" style={{ marginBottom: 8 }}>Презентации Google Slides</div><div className="p">Готовые к показу</div></div>
            <div className="card"><div className="h2" style={{ marginBottom: 8 }}>Задания, ДЗ и тесты</div><div className="p">Полный комплект</div></div>
            <div className="card"><div className="h2" style={{ marginBottom: 8 }}>Поддержка ЕГЭ/ОГЭ</div><div className="p">Государственные форматы</div></div>
          </div>
          <button className="btn" onClick={() => nav('/settings')}>Создать урок</button>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <img src="/hero-placeholder.png" alt="Preview" style={{ width: '100%', display: 'block', borderRadius: '14px' }} />
        </div>
      </div>
    </div>
  );
}
