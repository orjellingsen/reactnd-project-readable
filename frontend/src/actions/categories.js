import * as api from '../utils/ReadableAPI'
import { GET_CATEGORIES } from './actionTypes'

export function getCategories(categoryList) {
  return {
    type: GET_CATEGORIES,
    categoryList,
  }
}

export const fetchCategories = () => dispatch =>
  api.fetchCategories().then(categories => dispatch(getCategories(categories)))
