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
  setTodos((previous) => previous.map((previousTodo) =>
    previousTodo.id === id ? { ...previousTodo, ...todoName } : previousTodo
  ));
};


  const deleteTodo = (id) => {
    setTodos((previous) => {return previous.filter((todo) => todo.id !== id) })
    // making a new array which will not have the deleted one
    // filter function holds the value that is true and leaves the ones which are false
    // .filter(id !== previous.id) means if it is true then it will not take the value (in our case it is the id to be deleted) and take all the rest values

  }

  const toggleComplete = (id) => {
    setTodos((previous) => previous.map((previousTodo) => previousTodo.id === id ? { ...previousTodo, completed: !previousTodo.completed } : previousTodo))

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
            {console.log(todos)}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
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
