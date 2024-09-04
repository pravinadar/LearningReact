import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  /***********Learning useState********************/

  //Classic Javascript
  
  // let num=0;

  // let addByOne=()=>{
  //   let h2=document.querySelector('h2')
  //   h2.innerHTML=`Count : ${num++}`
  // }

  // let subtractByOne=()=>{
  //   let h2=document.querySelector('h2')
  //   h2.innerHTML=`Count : ${num--}`
  // }

  // useState
  let [num, nameOfWork ]=useState(0)
  let addByOne=()=>{
    nameOfWork(num+1)
  }
  let subtractByOne=()=>{
    num=num-1
    nameOfWork(num)
  }

  return (
    <>
     <h1>Hello User</h1>
     <h2>Count : {num}</h2>
     <button onClick={addByOne}>Add 1</button>
     <button onClick={subtractByOne}>Subtract 1</button>

    </>
  )
}

export default App

/*
The useState hook in React is a fundamental feature that 
allows you to add state management to functional components.

Syntax:
const [state, setState] = useState(initialState);

In this case :
When the component first renders, num is set to 0.
The addByOne function calls nameOfWork(num + 1), which increments 
the num state by 1. React then re-renders the component, displaying 
the updated value of num.
The subtractByOne function decreases the num state by 1 and then 
calls nameOfWork(num) to update it. React re-renders the component 
with the new value.

**Basic Explanation**
In classic JavaScript, updating the content of an HTML element typically involves several steps:

Element Selection: You first select the target element using methods like document.querySelector, 
getElementById, or getElementsByClassName.
Logic Implementation: After selecting the element, you write the necessary logic to update the data
or perform any operations.
Manual Content Update: You then manually update the content of the selected element, often using properties 
like innerHTML or textContent, to reflect the new value in the UI.
This approach requires manual re-rendering of the content, which can become cumbersome as the 
application grows in complexity.

React with useState :
React simplifies this process through the useState hook:
State Management: In React, you manage dynamic data using state variables initialized with useState. 
These variables hold the current value of your data and can be easily updated.
Automatic Re-rendering: When the state changes, React automatically re-renders the component, 
updating the UI to reflect the new state without the need for manual DOM manipulation.
Declarative UI: React components declare how the UI should look for any given state. When you update 
the state using the setState function, React efficiently updates the DOM, ensuring the UI stays in sync with the state.

This abstraction provided by React allows you to focus on your application's logic rather than the intricacies of 
DOM manipulation, leading to cleaner, more maintainable code.


*/ 