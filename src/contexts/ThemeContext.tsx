import { Dispatch, createContext, useReducer } from 'react';

type ThemeAction = {
  payload: string;
};
type ThemeState = {
  theme: string;
};

type ThemeContextType = {
  themeState: ThemeState;
  dispatch: Dispatch<ThemeAction>;
};

const initialTheme = localStorage.getItem('theme')
  ? { theme: localStorage.getItem('theme')! }
  : {
      theme: 'light',
    };

export const ThemeContext = createContext<ThemeContextType>({
  themeState: initialTheme,
  dispatch: () => null,
});

const themeReducer = (themeState: ThemeState, action: ThemeAction) => {
  console.log({ themeState });
  switch (action.payload) {
    case 'light':
      localStorage.setItem('theme', 'light');
      return { theme: 'light' };
    case 'dark':
      localStorage.setItem('theme', 'dark');
      return { theme: 'dark' };
    default:
      throw new Error(`Unhandled action payload: ${action.payload}`);
  }
};

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [themeState, dispatch] = useReducer(themeReducer, initialTheme);
  const value = { themeState, dispatch };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
