import React from 'react';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MainView from './views/MainView';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <div className="App h-screen bg-vest-background">
      <QueryClientProvider client={queryClient}>
        <MainView/>
      </QueryClientProvider>
    </div>
  );
};

export default App;
