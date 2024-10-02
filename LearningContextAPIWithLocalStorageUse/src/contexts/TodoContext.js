import React, { createContext, useContext } from 'react'

export const TodoContext = createContext({
    // array which will contain all the todo
    // todo will have id, TodoName, completed (boolean value)
    todos: [
        {
            id: 1,
            todoName: "msg",
            completed: false,

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

