import React from 'react';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import KlineChart from './components/KlineChart';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <KlineChart symbol1="ETH" symbol2="PERP"/>
      </QueryClientProvider>
    </div>
  );
};

export default App;
