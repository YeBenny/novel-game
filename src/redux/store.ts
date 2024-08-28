import { configureStore } from "@reduxjs/toolkit"

// Add Slice Reducers to the Store
import counterReducer from './reducer/counterSlice'

// Create a Redux Store with `configureStore`
export default configureStore({
  // `configureStore` accepts a reducer function as a named argument
  reducer: {
    counter: counterReducer,
  },
})
