import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center gap-4 mt-8">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mt-8">Vite + React</h1>
      <div className="flex flex-col items-center mt-8 p-6 border border-gray-200 rounded-lg shadow-md">
        <button 
          onClick={() => setCount(count + 1)} 
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-700">
          Edit <code className="font-mono bg-gray-200 p-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-center text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
