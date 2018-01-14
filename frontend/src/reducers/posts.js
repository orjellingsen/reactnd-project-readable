import {
  GET_POSTS, GET_SINGLE_POST, ADD_POST, VOTE_POST, EDIT_POST, DELETE_POST,
} from '../actions/posts'

function postsReducer ( state = {}, action ) {
  const { id, title, body, author, category, option, } = action
  switch (action.type) {
    case GET_POSTS:
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