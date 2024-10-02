1. TodoContext.js
```js
import React, { createContext, useContext } from 'react'

export const TodoContext = createContext({
    // array which will contain all the todo
    // todo will have id, TodoName, completed (boolean value)
    todos: [
        {
            id: 1,
            todoName: "todo msg",
            completed: false
            // just for reference
        }
    ],
    addTodo: (todoName) => { },
    updateTodo: (id, todoName) => { },
    deleteTodo: (id) => { },
    toggleComplete: () => { }
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider


```
2. Index.js

```js
export {TodoContext,useTodo,TodoProvider} from "./TodoContext"
```

3. App.jsx
```jsx
import { useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'

function App() {

  const [todos, setTodos] = useState([])

  return (
    <TodoProvider values={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
```

4. App.jsx
Added this function
```jsx
const addTodo = (todoName) => {
    setTodos((previous) => [{ id: Date.now(), ...todoName }, ...previous])
  }
```

5. App.jsx
Added this function
```jsx
const updateTodo = (id, todoName) => {
    setTodos((previous) => { previous.map((previousTodo) => { previousTodo.id === id ? todoName : previousTodo }) })

  }
```

6. App.jsx
Added this function
```jsx
const deleteTodo = (id) => {
    setTodos((previous)=>{previous.filter((todo) => todo.id !== id)})
  }
```

7. App.jsx
Added this function
```jsx
const toggleComplete = (id) => {
    setTodos((previous) => previous.map((previousTodo) => previousTodo === id ? { ...previousTodo, completed: !previousTodo.completed } : previousTodo))
  }
```

8. App.jsx
Added this function - working with localstorage
this is not server side so this works only in browser direct
```jsx
useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
```

9. then made the TodoForm
```jsx
import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {

    const [todo, setTodo] = useState("")

    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo) return;
        addTodo({ todoName: todo, completed: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
```

final App.jsx
```jsx
import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todoName) => {
    setTodos((previous) => [{ id: Date.now(), ...todoName }, ...previous])
    // if we directly did 'setTodos(todoName)' then all the previous values will get deleted and only the new one will be added
  }

  const updateTodo = (id, todoName) => {
    setTodos((previous) => { previous.map((previousTodo) => { previousTodo.id === id ? todoName : previousTodo }) })

  }

  const deleteTodo = (id) => {
    setTodos((previous) => { previous.filter((todo) => todo.id !== id) })
    // making a new array which will not have the deleted one
    // filter function holds the value that is true and leaves the ones which are false
    // .filter(id !== previous.id) means if it is true then it will not take the value (in our case it is the id to be deleted) and take all the rest values

  }

  const toggleComplete = (id) => {
    setTodos((previous) => previous.map((previousTodo) => previousTodo === id ? { ...previousTodo, completed: !previousTodo.completed } : previousTodo))

  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

```