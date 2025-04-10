1. created vite-react project


2. installed the following
    npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form


3. made the .env file and the .env.sample file
The .env file stores environment variables like API keys, database URLs, and other sensitive information required by the application. It's kept private and is usually added to .gitignore so it doesn't get uploaded to version control, keeping sensitive data secure.
The .env.sample file, on the other hand, is a non-sensitive template of the .env file. It contains placeholder keys but no sensitive information. This allows other developers to know what variables are needed and configure their own .env files without exposing any private data.
Important points
    1. whenever we change any environment variable, we need to restart the whole app again in many cases
    2. every framework has its own way of declaring and accessing environment variables i.e. react will have a different way of declaring environment variables and vite will have its own way so read documentation for each


4. edited .env file
    VITE_APPWRITE_URL="test" and logged it to check if it works

5. checkout .env file

6. then made the conf (config) folder in which we have the conf.js file
    this is a good practice which should be followed because, sometimes problems can occur while parsing the environment variables so we make a different conf file and have all our important id's already parsed to strings before and then use them in our .env file
    checkout the file

7. made the appwrite folder to keep all the appwrite related files
(checkout good practices to avoid vendor lock-in. we'll be doing some of them here)
    made the auth.js file in it and made our authentication functions . check out the auth.js file

8. made the config.js file in the appwrite folder. check it out
read the docs and made the methods in the class which are pretty much understandable when read

9. made the store folder and made store.js in it

10. made the authSlice.js in the store folder. Could make it in a separate folder for features.

11. Made Header and Footer (just skeleton) and exported them from the index file in components

12. Edited App.jsx :
```jsx
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'



function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else { dispatch(logout()) }
      })
      .finally(setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen bg-slate-600'>
      <Header/>
      <main>Test</main>
      <Footer/>
    </div>

  ) : null
}

export default App

```

13. Wrapped the <App/> around with the redux provider
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

```

14. Made Container.jsx in the container folder to keep everything in it. so in the future if any width or aspect ratio stuff needs to be changed it can be changed easily

15. Made the Logo.jsx which is imported in the footer

16. made the LogoutButton.jsx
```jsx
import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{

        authService.logOut().then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutButton

```

17. Edited the Header component
```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      url: "/",
      active: true
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />

            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.url)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

```

18. made a reusable button component Button.jsx
```jsx
import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
```

19. Made input.jsx
```jsx
import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    placeholder,
    Classname = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className={`w-full`}>
            {label && <label
                className="text-sm font-medium text-gray-700"
                htmlFor={id} >
                {label}
            </label>
            }

            <input
                type={type}
                placeholder={placeholder}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${Classname}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})
```
Below is a detailed explanation of the code snippet, focusing on how the `useId()` hook and `ref` are used, why they are important, and their connection with `useRef()`.

---

## 1. Generating Unique IDs with `useId()`

### What is `useId()`?
- **Purpose:**  
  The `useId()` hook, introduced in React 18, is used to generate unique IDs. These IDs remain consistent across both client-side and server-side renders, making them especially useful for accessibility and avoiding conflicts.

### How It Works in the Code:
- **Usage:**  
  ```jsx
  const id = useId();
  ```
  This line creates a unique string identifier that is stored in the variable `id`.

- **Application:**  
  The generated `id` is used to link the `<label>` and `<input>` elements:
  - The `<label>` element uses `htmlFor={id}`.
  - The `<input>` element uses `id={id}`.
  
  This association is crucial for accessibility: when a user clicks the label, the focus automatically shifts to the associated input.

### Benefits:
- **Accessibility:**  
  Ensures that screen readers and assistive technologies correctly associate the label with the input field.
- **Avoiding Collisions:**  
  Prevents duplicate IDs when the component is rendered multiple times, which is important for maintaining a valid HTML structure.
- **SSR Compatibility:**  
  Guarantees that the IDs match between server-rendered and client-rendered output, preventing potential hydration issues.

---

## 2. Managing Direct DOM Access with Refs

### What is a Ref?
- **Definition:**  
  A ref in React is an object created by `useRef()` that allows you to directly reference a DOM element or React component instance.

### How the Ref is Used in the Code:
- **Forwarding the Ref:**  
  The component is wrapped with `React.forwardRef`, which allows it to accept a `ref` from its parent:
  ```jsx
  const Input = React.forwardRef(function Input({ label, type = "text", placeholder, Classname = "", ...props }, ref) {
      // ...
      <input
          // ...
          ref={ref}
          id={id}
      />
  });
  ```
  The `ref` passed to `Input` is then attached to the `<input>` element. This means that the parent component can directly interact with the DOM node of the `<input>`.

### Why Use Refs?
- **Direct DOM Interaction:**  
  Refs allow you to bypass React's declarative model when you need to interact directly with a DOM element. For example:
  - **Focusing an Input:** A parent component might call `inputRef.current.focus()` to programmatically set focus.
  - **Scrolling or Animating:** They can be used to scroll to an element or trigger animations.
- **Accessing Child Component Methods/Properties:**  
  Although less common, refs can also be used to access methods or properties on a child component if needed.

### Connection with `useRef()`:
- **Creating a Ref in a Parent Component:**  
  A parent component would typically create a ref like this:
  ```jsx
  const inputRef = useRef(null);
  ```
- **Passing the Ref:**  
  The ref is then passed to the `Input` component:
  ```jsx
  <Input ref={inputRef} label="Your Label" />
  ```
- **Using the Ref:**  
  Because `Input` is wrapped in `React.forwardRef`, the `inputRef` is forwarded to the `<input>` element. This means that after the component mounts, `inputRef.current` will point directly to the actual DOM node of the `<input>`. This setup is crucial for performing any imperative operations, such as:
  ```jsx
  inputRef.current.focus();
  ```

---

## 3. Summary of Key Points

- **`useId()`:**  
  - Generates a unique identifier.
  - Ensures that the label is properly linked to the input for accessibility.
  - Prevents ID collisions, especially when multiple instances of the component are rendered.

- **Refs (`ref` and `useRef()`):**  
  - Allow for direct manipulation of the DOM element, bypassing the typical React state and props flow.
  - Enable imperative actions like focusing an input, scrolling, or initiating animations.
  - Are created in the parent component with `useRef()`, passed to the child component via the `ref` attribute, and then forwarded to the appropriate element using `React.forwardRef`.

Together, these techniques help you create accessible, reusable components that can interact directly with the DOM when necessary, while still maintaining the benefits of React's declarative rendering model.


