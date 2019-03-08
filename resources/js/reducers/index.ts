import { combineReducers } from 'redux'
import todos from './todos/todos'
import visibilityFilter from './todos/visibilityFilter'
import queryManager from './queryManager'

export default combineReducers({
  queries: queryManager,
  todos: todos,
  visibilityFilter: visibilityFilter
})
