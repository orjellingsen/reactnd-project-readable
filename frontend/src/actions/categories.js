export const GET_CATEGORIES = 'GET_CATEGORIES' // GET /categories
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS' // GET /:category/posts

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