// Minimal Telegram WebApp SDK typings and helpers
export interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface TelegramWebApp {
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  openInvoice: (link: string) => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp };
  }
}

export function getTelegram() {
  return window.Telegram?.WebApp;
}

export function getUserFromTelegram(): { id: number; username: string } | null {
  const tg = getTelegram();
  const user = tg?.initDataUnsafe?.user;
  if (user?.id) {
    return { id: user.id, username: user.username || user.first_name || 'Пользователь' };
  }
  return null;
}
