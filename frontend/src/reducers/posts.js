import {
  ADD_POST, REMOVE_POST, EDIT_POST, VOTE_POST,
} from '../actions/posts'

function posts ( state = {}, action ) {
  switch (action.type) {
    case ADD_POST:
      return state
    case REMOVE_POST:
      return state
    case EDIT_POST:
    case VOTE_POST:
    default:
      return state
  }
}

export default posts