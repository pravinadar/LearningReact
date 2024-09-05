import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("grey")


  return (
    <div className="w-screen h-screen flex justify-center flex-wrap bottom-12" style={{ backgroundColor: color }}>
      
      <div className="fixed bottom-12 flex gap-2 w-fit h-fit p-2 rounded-lg bg-black justify-center">

        <button className="w-16 h-5 bg-violet-600 rounded-md" onClick={() => setColor("violet")}></button>
        <button className="w-16 h-5 bg-indigo-600 rounded-md" onClick={() => setColor("indigo")}></button>
        <button className="w-16 h-5 bg-blue-600 rounded-md" onClick={() => setColor("blue")}></button>
        <button className="w-16 h-5 bg-green-600 rounded-md" onClick={() => setColor("green")}></button>
        <button className="w-16 h-5 bg-yellow-600 rounded-md" onClick={() => setColor("yellow")}></button>
        <button className="w-16 h-5 bg-orange-600 rounded-md" onClick={() => setColor("orange")}></button>
        <button className="w-16 h-5 bg-red-600 rounded-md" onClick={() => setColor("red")}></button>


      </div>
    </div>
  )
}
// onClick={() => setColor("violet")}
// The arrow function syntax is used in the onClick event handler to change the background color by updating the state.

// style={{ backgroundColor: color }}
// Inline styling is used here, where the value of the color state variable dynamically sets the background color.
// The curly braces inside the style prop denote an object, and color is already a variable, so it doesn't require
// additional curly braces.

export default App
