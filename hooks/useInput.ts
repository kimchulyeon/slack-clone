import { SetStateAction, useCallback, useState, Dispatch, ChangeEvent } from 'react';

const useInput = <T = any>(
  initialState: T,
): [T, Dispatch<SetStateAction<T>>, (e: ChangeEvent<HTMLInputElement>) => void] => {
  // useState
  const [value, setValue] = useState(initialState);

  // useCallback
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, setValue, handler];
};

export default useInput;
