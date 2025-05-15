import { useEffect, useState } from 'react';

import type { UseDebounce } from './types';

const useDebounce: UseDebounce = (value, milliSeconds = 700) => {
  const [debouncedValue, setDebouncedValue] = useState<typeof value>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};

export default useDebounce;
