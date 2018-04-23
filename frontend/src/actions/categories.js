import * as api from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES' // GET /categories

export function getCategories (categoryList) {
  return {
    type: GET_CATEGORIES,
    categoryList,
  }
}

export const fetchCategories = () => dispatch => (
  api.fetchCategories()
    .then(categories => dispatch(getCategories(categories)))
)