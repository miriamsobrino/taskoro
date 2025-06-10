import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './context/AppContext.tsx';
import { AuthContextProvider } from './context/AuthContex.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AppContextProvider>
  </StrictMode>
);
