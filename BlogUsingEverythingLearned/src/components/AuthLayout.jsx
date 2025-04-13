import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        //let authValue = authStatus === true ? true : false

        if (authentication && (authStatus !== authentication)) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

// The AuthLayout.jsx component, also referred to as Protected, is a React functional component 
// designed to act as a route guard. It ensures that only authenticated or unauthenticated users 
// can access specific routes/pages in the application. This is similar to private routes in applications 
// like Gmail or Instagram, where access to certain pages is restricted based on the user's authentication status.

// Component Purpose
// 1. Protects Routes:
//      - Ensures that only authenticated users can access certain routes (e.g., dashboard, profile).
//      - Redirects unauthenticated users to the login page.
//      - Optionally, it can also restrict authenticated users from accessing routes meant for unauthenticated users (e.g., signup or login pages).
// 2. Handles Loading State:
//      - Displays a loading indicator (<h1>Loading...</h1>) while determining the user's authentication status.
// 3. Redirects Users:
//      - Redirects users to appropriate routes (/login or /) based on their authentication status and the authentication prop.