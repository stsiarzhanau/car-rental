import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="my-12 text-5xl font-bold">Vite + React</h1>

      <button
        onClick={() => setCount((count) => count + 1)}
        className="min-w-40 cursor-pointer rounded-md border border-transparent bg-[#1a1a1a] px-5 py-2 text-base font-medium text-white transition-colors duration-300 hover:border-blue-500"
      >
        count is {count}
      </button>

      <p className="my-4">
        Edit <code className="font-mono text-xs">src/App.tsx</code> and save to test HMR
      </p>
    </>
  );
}

export default App;
