// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'



const ReactElement = React.createElement(
  'a',
  { href: 'http://google.com', target: '_blank' },
  'Click here to visit google'
)

const anotherElement = (
  <a href="https://google.com" target='_blank'>Visit google</a>
)

createRoot(document.getElementById('root')).render(
  // <StrictMode> 
  // ReactElement
  <App />,
  // anotherElement
  // ReactElement,
  /* </StrictMode>, */
)
