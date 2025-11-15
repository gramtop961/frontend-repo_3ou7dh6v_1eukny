import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelegram } from '@/lib/telegram';
import '../styles.css';

export default function Pricing() {
  const nav = useNavigate();

  function pay() {
    const invoice = import.meta.env.VITE_INVOICE_LINK as string;
    const tg = getTelegram();
    if (tg && invoice) {
      tg.openInvoice(invoice);
    } else if (invoice) {
      window.open(invoice, '_blank');
    }
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="card" style={{ padding: 36 }}>
        <h1 className="h1" style={{ marginBottom: 12 }}>Полный доступ к LessonBot</h1>
        <div className="h2" style={{ marginBottom: 20 }}>990 ₽ / месяц</div>
        <ul className="p" style={{ marginBottom: 16 }}>
          <li>• безлимитные уроки</li>
          <li>• презентации Google Slides</li>
          <li>• задания, ДЗ, тесты</li>
          <li>• поддержка ЕГЭ/ОГЭ</li>
          <li>• 4 предмета</li>
        </ul>
        <div className="grid two" style={{ marginBottom: 20 }}>
          <div className="card">Отзыв 1: Очень удобно!</div>
          <div className="card">Отзыв 2: Экономит время</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn" onClick={pay}>Оплатить подписку</button>
          <button className="btn secondary" onClick={() => nav('/settings')}>Вернуться</button>
        </div>
      </div>
    </div>
  );
}
