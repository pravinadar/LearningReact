# React Context API Example - User Authentication

This project demonstrates how to use React's Context API to manage user authentication across components, including login functionality ( just basic implementation and no security and stuff ) and displaying user profiles. The application consists of a Login component where users can input credentials, and a Profile component that displays the logged-in user's information. All user-related data is managed globally using the Context API, ensuring efficient state management across the application.

## Project Structure

### 1. Context Setup - UserContext.js

We begin by creating a UserContext using React's createContext() function. This context is responsible for holding and distributing user data throughout the component tree.

```javascript
// UserContext.js
import { createContext } from "react";
const UserContext = createContext();
export default UserContext;
```

In this file, UserContext is exported so that it can be used in other components, including a Provider to manage state and a Consumer to access the state.

### 2. UserContextProvider - UserContextProvider.jsx

The UserContextProvider component is responsible for maintaining the global user state using useState() and providing it to child components via UserContext.Provider.

```jsx
// UserContextProvider.jsx
import UserContext from "./UserContext";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
```

The UserContextProvider wraps the entire application (or specific components) to provide access to the User state and the setUser function across the app.

### 3. Main Application - App.jsx

In the main App.jsx file, the UserContextProvider component wraps both the Login and Profile components, allowing them to share the same user state.

```jsx
// App.jsx
import Login from './Components/Login';
import Profile from './Components/Profile';
import UserContextProvider from './Context/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <Login />   {/* Handles user input for login */}
      <Profile /> {/* Displays logged-in user information */}
    </UserContextProvider>
  );
}

export default App;
```

### 4. Login Component - Login.jsx

The Login component allows users to input their username and password. When the form is submitted, the setUser function from the context is called to update the global user state.

```jsx
// Login.jsx
import React, { useContext, useState } from 'react';
import UserContext from '../Context/UserContext';

function Login() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ Username, Password });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;
```

### 5. Profile Component - Profile.jsx

The Profile component retrieves the user data from the context and displays it. If no user is logged in, it shows a message indicating that.

```jsx
// Profile.jsx
import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';

function Profile() {
  const { User } = useContext(UserContext);

  return (
    <div>
      <h1>Profile</h1>
      {User ? (
        <>
          <p>Username: {User.Username}</p>
          <p>Password: {User.Password}</p>
        </>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}

export default Profile;
```

## How It Works

1. **Login**: Users enter their username and password in the Login component. Upon submission, the setUser function from the context updates the global state with the user's credentials.
2. **Profile**: The Profile component fetches the current User state from the context. If a user is logged in, their details are displayed; otherwise, a message is shown.


## Data Flow: From Login to Application-wide State

This section explains how data flows from the login page throughout the application using the Context API.

1. **Initial Setup**:
   - The `UserContextProvider` initializes the `User` state as `null` and creates a `setUser` function.
   - These are wrapped in the `UserContext.Provider` value prop:
     ```jsx
     <UserContext.Provider value={{ User, setUser }}>
     ```
   - Any component within this provider can access `User` (null) and `setUser`.

2. **Login Component**:
   - Accesses the `setUser` function from the context:
     ```jsx
     const { setUser } = useContext(UserContext);
     ```
   - Sets up local state for `Username` and `Password` using `useState`.

3. **User Enters Credentials**:
   - As the user types in the login form, the local `Username` and `Password` states are updated.

4. **Form Submission**:
   - When the user clicks "Submit", the `handleSubmit` function is called.
   - This function creates a user object and calls `setUser`:
     ```jsx
     setUser({ Username, Password });
     ```

5. **Context Update**:
   - The `setUser` call updates the `User` state in the `UserContextProvider`.
   - The data moves from the local state of the Login component to the global context.

6. **Re-render Triggered**:
   - React detects the context value change and re-renders all components that consume this context.

7. **Other Components Update**:
   - Any component using the `UserContext` will now have access to the updated user data.
   - For example, the Profile component:
     ```jsx
     const { User } = useContext(UserContext);
     ```
   - It will re-render with the new user data, displaying the username.

8. **Application-wide Availability**:
   - The user data is now available anywhere in the app that uses the `UserContext`.
   - Components can check if a user is logged in, display user-specific content, etc.

9. **Persistent State**:
   - As long as the app is running, this user state persists in the context.
   - Any new components that mount and use the context will immediately have access to this data.

10. **Logout (if implemented)**:
    - A logout function would typically call `setUser(null)`.
    - This would clear the user data from the context, and all components would update to reflect the logged-out state.

This flow demonstrates how the Context API allows data to move from a specific component (Login) to a global state that's accessible throughout the application. It's a powerful way to manage user authentication state, as it ensures all parts of your app can easily check if a user is logged in and access their details when needed.
