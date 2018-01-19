import {
  GET_CATEGORIES,
  GET_CATEGORY_POSTS,
} from './actionTypes'

export function getCategories (categoryList) {
  return {
    type: GET_CATEGORIES,
    categoryList,
  }
}

export function getCategoryPosts ({ category }) {
  return {
    type: GET_CATEGORY_POSTS,
    category,
  }
}