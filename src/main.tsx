
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

if (import.meta.env.DEV && !window.Telegram) {
  // Явно инициализируем mockBackButton как null
  window.mockBackButton = null;
  
  window.Telegram = {
    WebApp: {
      BackButton: {
        show: () => console.log('BackButton shown'),
        hide: () => console.log('BackButton hidden'),
        onClick: (cb) => { window.mockBackButton = cb; },
        offClick: () => { window.mockBackButton = null; }
      },
      close: () => console.log('App closed'),
      expand: () => console.log('App expanded')
    }
  };
}

createRoot(document.getElementById('root')!).render(<App />)
