import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
// Check Readme.md
function App() {

  return (
    <>
      <h1 className="bg-white text-slate-900 font-extrabold rounded-xl mb-5">Hello User</h1>
      <Card username="GirlOne" buttonText="Click me"/>
      <Card username="GirlTwo"/>

    </>
  )
}

/* 
Two instances of the Card component are rendered:
The first instance has username="GirlOne" and a custom buttonText="Click me".
The second instance has username="GirlTwo", but since no buttonText is passed, 
the default "Contact me" is used for the button.
*/
export default App
