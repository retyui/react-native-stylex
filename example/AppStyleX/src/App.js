import React from 'react';
import {ThemeProvider} from 'react-native-stylex';
import {useState} from 'react';
import {darkTheme, lightTheme} from './style/theme';

import Root from './Root';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <ThemeProvider value={theme}>
      <Root
        toggleTheme={() =>
          setTheme(currentTheme =>
            currentTheme === darkTheme ? lightTheme : darkTheme,
          )
        }
      />
    </ThemeProvider>
  );
};

export default App;
