import { useCallback, useState } from 'react';

function useToggle(initialState = false): [boolean, () => void] {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(preState => !preState), []);

  return [state, toggle];
}

export default useToggle;
