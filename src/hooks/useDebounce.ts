import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // this cleanup runs before the *next* effect —
    // i.e. every new keystroke cancels the previous pending timeout
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}
