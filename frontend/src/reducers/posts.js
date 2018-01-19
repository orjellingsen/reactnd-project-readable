import {
  GET_POSTS,
  GET_SINGLE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/actionTypes'

function postsReducer ( state = {}, action ) {
  const { allPosts } = action
  switch (action.type) {
    case GET_POSTS:
      return {
          allPosts,
      }
    case GET_SINGLE_POST:
    case ADD_POST:
    case VOTE_POST:
    case EDIT_POST:
    case DELETE_POST:
    default:
      return state
  }
}

export default postsReducer