import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import CarMap from './components/CarMap';
import CarTable from './components/CarTable';
import ControlPanel from './components/ControlPanel';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="grid h-screen w-screen grid-cols-2">
          <CarMap />
          <div>
            <div className="overflow-x-auto bg-gray-900 text-gray-100 shadow-lg">
              <CarTable />
            </div>

            <ControlPanel />
          </div>
        </div>
      </QueryClientProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
