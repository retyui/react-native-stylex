import React, {useState} from 'react';
import {ThemeProvider} from 'react-native-stylex';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StylexSaveAreaConsumer} from 'react-native-stylex/safe-area';

import {darkTheme, lightTheme} from './style/theme';

import Root from './Root';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(currentTheme =>
      currentTheme === darkTheme ? lightTheme : darkTheme,
    );

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <Root toggleTheme={toggleTheme} />
      </ThemeProvider>
      <StylexSaveAreaConsumer />
    </SafeAreaProvider>
  );
};

export default App;
