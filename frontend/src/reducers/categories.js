import { GET_CATEGORIES } from '../actions/actionTypes'

export default function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...action.categoryList]
    default:
      return state
  }
}
