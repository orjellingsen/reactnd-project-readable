import {
  GET_CATEGORIES, GET_CATEGORY_POSTS,
} from '../actions/categories'

const initialState = {
  categoryList: '',
  currentCategory: 'all',
}

function categoriesReducer (state = initialState, action) {
  const { categoryList, } = action
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
          categoryList,
      }
    case GET_CATEGORY_POSTS:
      return {

      }
    default:
      return state
  }
}

export default categoriesReducer