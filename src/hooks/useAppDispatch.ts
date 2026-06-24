import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <T,>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};

export const useLocalStorage = (key: string) => {
  const getItem = useCallback((defaultValue?: string) => {
    // Implement AsyncStorage for React Native
    return defaultValue;
  }, [key]);

  const setItem = useCallback((value: string) => {
    // Implement AsyncStorage for React Native
  }, [key]);

  return { getItem, setItem };
};
