
# Explanation of Hooks in the Password Generator Project

This document explains how various React hooks ( `useCallback`, `useRef`, `useEffect`) are used in the password generator project.

##  `useCallback`
`useCallback` is used to memoize the `passwordGenerator` and `copyPasswordToClipboard` functions to prevent them from being recreated on every render. It ensures that these functions are only regenerated when their dependencies change.

### Example from the code:
- **Password generation**: The `passwordGenerator` function is recalculated only when `length`, `numberAllowed`, or `charAllowed` changes.
- **Copying to clipboard**: The `copyPasswordToClipboard` function is recalculated when the `password` changes.

```jsx
const passwordGenerator = useCallback(() => {
    let password_now = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length);
        password_now += str.charAt(char);
    }

    setPassword(password_now);
}, [length, numberAllowed, charAllowed]);

const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
}, [password]);
```

##  `useRef`
`useRef` is used to create a reference to the password input field, so we can interact with the DOM element directly. This is used to select the password text programmatically when copying it to the clipboard.

### Example from the code:
```jsx
const passwordRef = useRef(null);
```

Here, `passwordRef.current` refers to the DOM element for the password input, which is selected when the user clicks the "Copy" button.

##  `useEffect`
`useEffect` is used to trigger the `passwordGenerator` function whenever the `length`, `numberAllowed`, or `charAllowed` state changes. This ensures the password is updated as soon as the user adjusts these settings.

### Example from the code:
```jsx
useEffect(() => {
    passwordGenerator();
}, [length, numberAllowed, charAllowed, passwordGenerator]);
```

In this case, the `useEffect` hook runs the `passwordGenerator` function after the initial render and every time any of its dependencies (`length`, `numberAllowed`, `charAllowed`) change.

## Summary of Hooks:
- **`useState`**: Manages the state of variables like `length`, `numberAllowed`, and `password`.
- **`useCallback`**: Memoizes functions to prevent unnecessary recalculations.
- **`useRef`**: Creates a reference to the password input element for DOM manipulation.
- **`useEffect`**: Runs the `passwordGenerator` whenever the relevant states change, ensuring the password is updated dynamically.

These hooks collectively manage state, optimize performance, and interact with the DOM to create a dynamic password generator.
