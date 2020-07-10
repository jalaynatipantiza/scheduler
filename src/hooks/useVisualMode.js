import { useState } from 'react';
import { create } from 'react-test-renderer';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace= false) => {
    setMode(newMode)

    setHistory(prev => replace ? [...prev.slice(0, prev.length -1), newMode]: [...prev, newMode])
  }
  
  const back = () => {
    if(history.length > 1) {
      history.pop();
    }
    setMode(history[history.length-1])
  }
  return {mode, transition, back};
};
