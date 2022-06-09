import React, { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { darkTheme, lightTheme } from './theme';

// object to store the theme.
const themeColors = { dark: darkTheme, light: lightTheme };

// context to save state and share to all children
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  /** check more on.
   * https://javascript.works-hub.com/learn/building-dark-mode-in-react-the-fun-way-424f6
   */
  // state for the theme.
  const [themeName, setThemeName] = useState('dark');

  // set theme by changing all css parameters.
  const setTheme = name => {
    // get key names for all keys in the theme
    const keys = Object.keys(themeColors[name]);

    // for each key, modify the css parameters.
    keys.map(key => {
      const constructVar = `--${key}`;
      document.body.style.setProperty(constructVar, themeColors[name][key]);
      return true;
    });
    // modify the theme name state.
    setThemeName(name);
  };

  // set default theme based on browser.
  useEffect(() => {
    const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(darkOS ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
