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