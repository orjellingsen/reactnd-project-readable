import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_SINGLE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/actionTypes'

export default function posts(state = [], action) {
  const { type, post, id } = action
  switch (type) {
    case GET_POSTS:
      return [...action.allPosts]
    case GET_POSTS_BY_CATEGORY:
      return [...action.postsByCategory]
    case GET_SINGLE_POST:
      if (state.length === 0) {
        return state.concat(post)
      }
      return state.map(oldPost => (oldPost.id === post.id ? post : oldPost))
    case ADD_POST:
      return state.concat(post)
    case VOTE_POST:
      return state.map(oldPost => (oldPost.id === post.id ? post : oldPost))
    case EDIT_POST:
      return state.map(oldPost => (oldPost.id === post.id ? post : oldPost))
    case DELETE_POST:
      return state.filter(post => post.id !== id)
    case ADD_COMMENT:
      return state.map(post => {
        if (post.id === action.comment.parentId) {
          return {
            ...post,
            commentCount: post.commentCount + 1,
          }
        }
        return post
      })
    case DELETE_COMMENT:
      return state.map(post => {
        if (post.id === action.postId) {
          return {
            ...post,
            commentCount: post.commentCount - 1,
          }
        }
        return post
      })
    default:
      return state
  }
}
