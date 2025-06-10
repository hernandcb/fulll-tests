import { useEffect, useMemo, useRef } from 'react';

/**
 * A custom hook that returns a debounced version of the provided function.
 *  inspiration from: https://www.developerway.com/posts/debouncing-in-react
 *
 * @param func - The function to debounce.
 * @param waitFor - The number of milliseconds to wait before invoking the function.
 * @returns
 */
export function useDebounce<
  F extends (...args: Parameters<F>) => ReturnType<F>,
>(func: F, waitFor: number) {
  const ref = useRef(func);

  useEffect(() => {
    ref.current = func;
  }, [func]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<F>) => {
      ref.current?.(...args);
    };

    return debounce(func, waitFor);
  }, [waitFor]);

  return debouncedCallback;
}

/**
 * A simple debounce function that delays the execution of a function
 * until after a specified wait time has elapsed since the last time
 * it was invoked.
 *
 * Types inspired from: https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 *
 * @param func - The function to debounce.
 * @param waitFor - The number of milliseconds to wait before invoking the function.
 * @returns A debounced version of the provided function.
 */
const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};
