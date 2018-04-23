import {
  GET_CATEGORIES,
} from '../actions/categories'

const initialState = {
  categoryList: [],
  currentCategory: 'all',
}

export default function categories (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const { categoryList, } = action
      return {
        ...state,
          categoryList,
      }
    default:
      return state
  }
}