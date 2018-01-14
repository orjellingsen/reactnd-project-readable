import {
  GET_CATEGORIES, GET_CATEGORY_POSTS,
} from '../actions/categories'

function categoriesReducer (state = {}, action) {
  const { category, } = action
  switch (action.type) {
    case GET_CATEGORIES:
    case GET_CATEGORY_POSTS:
    default:
      return state
  }
}

export default categoriesReducer