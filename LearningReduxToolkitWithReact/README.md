1. made Store.js in the app folder
```jsx
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({})
```
2.features/todo/todoSlice.js
redux naming conventions is used hence the name todoSlice
slice is just a name used for features
a slice should atleast have name,initialState,reducers
```jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid - used to create unique id's

const initialState = {
    todos: [{ id: 1, text: "HelloWorld" }]
    // making todos as our default state
}

// slice is a reducer
// what is a reducer?
export const todoSlice = createSlice({
    // 'name' is the inbuilt property which should be used to name these
    name: 'todo',
    initialState,
    // we put our properties and functions in 'reducers'
    reducers: {
        // syntax for declaring functions.
        // each function will have a 'state' and 'action'
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload // or action.payload.text
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            // when an action is performed related to todo, it will come through this 'action' from the function and we will use this todo's id to filter out the todo which should be removed
            state.todos=state.todos.filter((todo)=> todo.id!==action.payload)
        }
    }

}) 
// this is how wew export all the needed functions
export const {addTodo,removeTodo} = todoSlice.actions
// exporting all the reducers here to import them in our store and make them aware of the reducers
// 
export default todoSlice.reducer
```
3. Store.js
```jsx
import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer // 'reducer:' is the key
    // now we have only one reducer so we are using only one todoReducer or else we can use a list of reducers
})
```

4. AddTodo.jsx
```jsx
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../features/todo/todoSlice' 

function AddTodo() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch() // dispatch should be used this way
    // useDispatch is a hook provided by the Redux library, specifically for use with 
    // the react-redux package, to interact with the Redux store in a functional component. 
    // This hook returns a reference to the dispatch function from the Redux store, which 
    // allows you to send actions to modify the global state.

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
    }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo
```

5. Todos.jsx
```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeTodo} from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)  // or useSelector((state) => state.todos)
    const dispatch = useDispatch()

  return (
    <>
    <div>Todos</div>
    <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className='text-white'>{todo.text}</div>
            <button
             onClick={() => dispatch(removeTodo(todo.id))} // should not use like this "onClick={dispatch(removeTodo(todo.id))}" . why?
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
```

6. App.jsx
```jsx
import { useState } from 'react'
import './App.css'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {

  return (
    <Provider store={store}>
    <AddTodo/>
    <Todos/>
    </Provider>
  )
}

export default App

```
```jsx
```
```jsx
```
```jsx
```
```jsx
```
```jsx
```
