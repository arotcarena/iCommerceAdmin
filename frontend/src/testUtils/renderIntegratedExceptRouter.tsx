import React, { PropsWithChildren, ReactNode } from 'react'
import {RenderResult, render} from '@testing-library/react'
import { AlertContextProvider } from '../Components/Contexts/AlertContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'Components/Contexts/Theme/ThemeContext';
import { LanguageConfig } from './renderIntegrated';


const AllTheProvidersExceptRouter = ({children, browserHistory}: PropsWithChildren<{browserHistory?: string[]}>) => {
  
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <AlertContextProvider>
            {children}
        </AlertContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
  )
};

export const renderIntegratedExceptRouter = (ui: ReactNode, browserHistory?: string[], lang?: string): RenderResult => {
  return render(
    <AllTheProvidersExceptRouter browserHistory={browserHistory}>
      <LanguageConfig lang={lang} />
        {ui}
    </AllTheProvidersExceptRouter>
  );
};
