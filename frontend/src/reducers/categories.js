import {
  GET_CATEGORIES,
} from '../actions/actionTypes'

const initialState = {
  categoryList: '',
  currentCategory: 'all',
}

function categoriesReducer (state = initialState, action) {
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

export default categoriesReducer