import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function NoCredits() {
  const nav = useNavigate();
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div className="card" style={{ padding: 36, textAlign: 'center' }}>
        <h1 className="h1" style={{ marginBottom: 12 }}>Бесплатные генерации закончились</h1>
        <p className="p" style={{ marginBottom: 20 }}>Вы использовали 3 бесплатных урока. Чтобы продолжить — оформите подписку.</p>
        <button className="btn" onClick={() => nav('/pricing')}>Оформить подписку</button>
      </div>
    </div>
  );
}
