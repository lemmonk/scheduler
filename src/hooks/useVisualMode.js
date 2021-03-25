import { useState } from "react";

// determines current mode and next transition of the app
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  const transition = (newMode, replace = false) => {
    setHistory(replace ? (prev) => prev : (prev) => [...prev, newMode]);
    setMode(newMode);
  };

  const back = () => {
    
    setMode(history.length > 1 ? history[history.length - 2] : initial);
    setHistory(history.length > 1 ? (prev) => [...prev].slice(0, -1) : initial);
  };

  return { mode, transition, back };
}