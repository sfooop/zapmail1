import { Router, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { Premium } from './pages/Premium';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        <Route path="/premium" component={Premium} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
