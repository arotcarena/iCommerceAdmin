import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlertContextProvider } from 'Components/Contexts/AlertContext';
import { ThemeProvider } from 'Components/Contexts/Theme/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
