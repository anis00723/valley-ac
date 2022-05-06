import { useCallback, useState } from 'react';
import { useInfiniteCourses } from './useInfiniteCourses';
import { useCourseInputForm } from './useCourseInputForm';
import useDebounce from './useDebounce';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useTimeout from './useTimeout';

export const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export {
  useInfiniteCourses,
  useCourseInputForm,
  useDebounce,
  useIsomorphicLayoutEffect,
  useTimeout,
};
