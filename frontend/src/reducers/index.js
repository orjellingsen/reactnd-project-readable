import { combineReducers } from 'redux'

import categoriesReducer from './categories'
import commentsReducer from './comments'
import postsReducer from './posts'

export default combineReducers({
  categories: categoriesReducer,
  comments: commentsReducer,
  posts: postsReducer,
})