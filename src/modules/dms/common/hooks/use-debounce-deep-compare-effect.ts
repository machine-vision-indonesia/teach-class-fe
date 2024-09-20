// https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts

import { DependencyList, useCallback, useEffect, useRef } from 'react';
import useDeepCompareEffect from "@/modules/dms/common/hooks/use-deep-compare-effect";

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}

export type UseDebounceReturn = [() => boolean | null, () => void];

export function useDebounceDeepCompareEffect(
  fn: Function,
  ms: number = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useDeepCompareEffect(reset, deps);

  return [isReady, cancel];
}
