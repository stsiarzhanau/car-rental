import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';

import CarMap from './components/CarMap';
import CarTable from './components/CarTable';
import ControlPanel from './components/ControlPanel';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Something went wrong: ${error.message}`),
  }),
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="grid h-screen w-screen lg:grid-cols-2">
          <div className="min-h-[40vh]">
            <CarMap />
          </div>
          <div className="flex max-h-[60vh] flex-col bg-gray-800 lg:min-h-screen">
            <div className="w-screen grow overflow-auto text-gray-100 lg:w-full">
              <CarTable />
            </div>
            <ControlPanel />
          </div>
        </div>
      </QueryClientProvider>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
