import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice';

const store = configureStore({
    reducer: todoReducer
})
// configureStore({}) takes only objects inside it hence {} inside ()

export default store