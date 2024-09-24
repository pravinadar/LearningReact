## Overview

This project allows users to toggle between light and dark modes globally across the application using the React **Context API**. The theme state is shared across components and managed using context, making the theme-switching functionality scalable and efficient.

## Component Overview

### Theme Context

File: **`contexts/Theme/theme.js`**

```js
import { createContext, useContext } from "react";

// Initializing the ThemeContext with default values
// themeMode, darkTheme, lightTheme are default variables and methods
export const ThemeContext = createContext({
    themeMode: "light",       // Default theme mode
    darkTheme: () => {},      // Placeholder method to activate dark theme
    lightTheme: () => {},     // Placeholder method to activate light theme
});

// Creating a custom hook to simplify access to ThemeContext
export default function useTheme() {
    return useContext(ThemeContext);
}

export const ThemeProvider = ThemeContext.Provider;
```

**Explanation**:
- **`ThemeContext`**: A context that holds the global state for the current theme (`themeMode`) and two methods, `darkTheme` and `lightTheme`, which will toggle the theme.
- **`useTheme()`**: A custom hook that makes it easier for any component to access the context values.
- **`ThemeProvider`**: The context provider that will be used to wrap the entire component tree, allowing all child components to access the theme state.

### ThemeButton Component

File: **`components/ThemeButton.jsx`**

```jsx
import React from 'react';
import useTheme from '../contexts/Theme/theme';

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme();
        } else {
            lightTheme();
        }
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode === "dark"}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 rounded-full peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">Toggle Theme</span>
        </label>
    );
}
```

**Explanation**:
- **`ThemeBtn`**: This component renders a toggle switch (styled with Tailwind CSS) that switches between light and dark themes.
- It uses `useTheme()` to access the current theme and methods (`lightTheme`, `darkTheme`) from the `ThemeContext`.
- When the user toggles the button, the `onChangeBtn` function calls either `darkTheme()` or `lightTheme()`, which updates the global theme state.

### Card Component

File: **`components/Card.jsx`**

```jsx
import React from 'react';

export default function Card() {
    return (
        <div className="p-6 max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Themed Card</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
                This card changes its appearance based on the selected theme.
            </p>
        </div>
    );
}
```

**Explanation**:
- **`Card`**: A simple card component that displays different styles depending on whether the `dark` or `light` theme is active. The Tailwind CSS `dark:` prefix automatically applies dark mode styling when the dark theme is active.

### App Component

File: **`App.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/Theme/theme';
import ThemeBtn from './components/ThemeButton';
import Card from './components/Card';

function App() {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark");
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

// This Project shows a second method of using contextAPI

// lightTheme and darkTheme are empty methods which were created while creating ThemeContext in the theme.js file

// Since they are empty, they can be defined here by using their same names, and their functionality will directly go to the context


```

**Explanation**:
- **`App`**: The main application component that manages the theme state using `useState` and passes the state and theme change functions (`lightTheme`, `darkTheme`) to the `ThemeProvider`.
- **`useEffect`**: Whenever the `themeMode` changes, the `useEffect` hook ensures that the correct class (`light` or `dark`) is applied to the root HTML element. This change affects the global styling of the app.
### Don't forget to add this in the tailwind.config.js file
```js
darkMode: "class",
```