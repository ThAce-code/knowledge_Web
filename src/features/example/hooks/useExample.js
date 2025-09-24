import { useState } from 'react';

export function useExample(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = () => setCount((c) => c + 1);
  const dec = () => setCount((c) => Math.max(0, c - 1));
  return { count, inc, dec };
}