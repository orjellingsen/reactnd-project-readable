import { combineReducers } from 'redux'

import categories from './categories'
import comments from './comments'
import posts from './posts'
import toasts from './toasts'

export default combineReducers({
  categories,
  comments,
  posts,
  toasts,
})
