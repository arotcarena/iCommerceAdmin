import React, { PropsWithChildren, ReactNode } from 'react'
import {RenderResult, render} from '@testing-library/react'
import { AlertContextProvider } from '../Components/Contexts/AlertContext';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'Components/Contexts/Theme/ThemeContext';


const AllTheProviders = ({children, browserHistory}: PropsWithChildren<{browserHistory?: string[]}>) => {
  
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter basename="/" initialEntries={browserHistory || ['/']}>
          <ThemeProvider>
            <AlertContextProvider>
              {children}
            </AlertContextProvider>
          </ThemeProvider>
        </MemoryRouter>
      </QueryClientProvider>
  )
};

export const LocationDisplay = () => {
  const location = useLocation();
  return (
      <div data-testid="location-display">{location.pathname}</div>
  )
};

export const LanguageConfig = ({lang}: {lang?: string}) => {
  const {i18n} = useTranslation();
  i18n.changeLanguage(lang || 'en');
  return '';
};

export const renderIntegrated = (ui: ReactNode, browserHistory?: string[], lang?: string): RenderResult => {
  return render(
    <AllTheProviders browserHistory={browserHistory}>
      <LanguageConfig lang={lang} />
      <LocationDisplay />
        {ui}
    </AllTheProviders>
  );
};




