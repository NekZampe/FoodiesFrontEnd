import { useState } from 'react';
import LoginPage from '../pages/loginPage';

function App() {
  const [count, setCount] = useState(0);

  return (
<LoginPage/>
  );
}

export default App;
