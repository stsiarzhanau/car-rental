import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CarMap from './components/CarMap';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen w-screen">
          <CarMap />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
