# Building a Redux Todo App

This guide walks through creating a Todo application using Redux Toolkit and React. We'll cover everything from setting up the store to implementing the UI components.

## Table of Contents
- [Store Setup](#store-setup)
- [Creating the Todo Slice](#creating-the-todo-slice)
- [Configuring the Store](#configuring-the-store)
- [UI Components](#ui-components)
  - [AddTodo Component](#addtodo-component)
  - [Todos Component](#todos-component)
  - [App Component](#app-component)

## Store Setup

First, create a new file `Store.js` in the app folder with a basic Redux store configuration:

```jsx
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({})
```

## Creating the Todo Slice

Create `features/todo/todoSlice.js` to define the Todo functionality. In Redux Toolkit, a "slice" is a collection of Redux reducer logic and actions for a single feature.

```jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "HelloWorld" }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
}) 

export const {addTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer
```

### Key Concepts:
- `nanoid`: Used to generate unique IDs for todos
- `initialState`: Defines the default state
- `reducers`: Contains methods to modify the state
- Actions are automatically generated from the reducer methods

## Configuring the Store

Update `Store.js` to include the todo reducer:

```jsx
import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer
})
```

## UI Components

### AddTodo Component

This component handles the creation of new todos:

```jsx
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../features/todo/todoSlice' 

function AddTodo() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

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

### Todos Component

This component displays the list of todos and handles deletion:

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeTodo} from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
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
                            onClick={() => dispatch(removeTodo(todo.id))}
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

### App Component

The root component that brings everything together:

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

## Important Notes

1. When using `dispatch` with event handlers, always use an arrow function:
   ```jsx
   // Correct
   onClick={() => dispatch(removeTodo(todo.id))}
   
   // Incorrect - will dispatch immediately on render
   onClick={dispatch(removeTodo(todo.id))}
   ```

2. The `useDispatch` hook is used to dispatch actions to the Redux store.
3. The `useSelector` hook is used to read data from the Redux store.
4. The `Provider` component makes the Redux store available to the entire app.