import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function Result() {
  const nav = useNavigate();
  const dataRaw = sessionStorage.getItem('lessonResult');
  const data = dataRaw ? JSON.parse(dataRaw) as any : {};

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="grid two" style={{ alignItems: 'start' }}>
        <div className="card" style={{ padding: 32 }}>
          <h1 className="h1" style={{ marginBottom: 12 }}>Результат генерации</h1>
          <div className="grid two">
            <div className="card">
              <div className="h2" style={{ marginBottom: 8 }}>Презентация Google Slides</div>
              <button className="btn" onClick={() => window.open(data.slidesUrl, '_blank')}>Открыть</button>
            </div>
            <div className="card">
              <div className="h2" style={{ marginBottom: 8 }}>Скачать PDF</div>
              <button className="btn" onClick={() => window.open(data.pdfUrl, '_blank')}>Скачать</button>
            </div>
            <div className="card">
              <div className="h2" style={{ marginBottom: 8 }}>Задания</div>
              <details>
                <summary className="p">Показать</summary>
                <pre className="p" style={{ whiteSpace: 'pre-wrap' }}>{data.tasks || '—'}</pre>
              </details>
            </div>
            <div className="card">
              <div className="h2" style={{ marginBottom: 8 }}>Домашнее задание</div>
              <pre className="p" style={{ whiteSpace: 'pre-wrap' }}>{data.homework || '—'}</pre>
            </div>
            <div className="card">
              <div className="h2" style={{ marginBottom: 8 }}>Мини-тест</div>
              <pre className="p" style={{ whiteSpace: 'pre-wrap' }}>{data.test || '—'}</pre>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <button className="btn secondary" onClick={() => nav('/loading')}>Сделать ещё один урок по этой теме</button>
            <button className="btn" onClick={() => nav('/settings')}>Новый урок</button>
          </div>
        </div>
      </div>
    </div>
  );
}
