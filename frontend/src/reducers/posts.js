import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_SINGLE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/actionTypes'

function postsReducer ( state = {}, action ) {
  const { allPosts, post, id } = action
  switch (action.type) {
    case GET_POSTS:
      return {
        allPosts,
      }
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
          allPosts,
      }
    case GET_SINGLE_POST:
      return {
        ...state,
          post,
      }
    case ADD_POST:
      return {
        ...state,
          post,
      }
    case VOTE_POST:
      return {
        ...state,
          post,
      }
    case EDIT_POST:
      return {
        ...state,
      }
    case DELETE_POST:
      const newPosts = state.allPosts.filter((oldPost) => ( oldPost.id !== id ))
      return {
          ...state,
            allPosts: newPosts,
      }
    default:
      return state
  }
}

export default postsReducer