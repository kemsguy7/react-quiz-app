import { useState } from 'react';
import Quiz from './components/Home/Quiz';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Quiz />
    </>
  );
}

export default App;
