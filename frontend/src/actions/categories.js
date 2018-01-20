import {
  GET_CATEGORIES,
} from './actionTypes'

export function getCategories (categoryList) {
  return {
    type: GET_CATEGORIES,
    categoryList,
  }
}