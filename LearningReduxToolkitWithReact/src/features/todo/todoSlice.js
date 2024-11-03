import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid - used to create unique id's

const initialState = {
    todos: [{ id: 1, text: "HelloWorld" }]
}

export const todoSlice = createSlice({
    // 'name' is the inbuilt property which should be used to name these
    name: 'todo',
    initialState,
    // we put our properties and functions in 'reducers'
    reducers: {
        // syntax for declaring a function.
        // each function will have a 'state' and 'action'
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=> todo.id!==action.payload)
        }
    }

}) 

export const {addTodo,removeTodo} = todoSlice.actions

export default todoSlice.reducer