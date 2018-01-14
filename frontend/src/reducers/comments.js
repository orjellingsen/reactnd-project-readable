import {
  ADD_COMMENT, REMOVE_COMMENT, EDIT_COMMENT, VOTE_COMMENT,
} from '../actions/comments'
import { REMOVE_POST } from '../actions/posts';

function comments (state, action) {
  switch (action.type) {
    case ADD_COMMENT:
    case REMOVE_COMMENT:
    case EDIT_COMMENT:
    case VOTE_COMMENT:
    default:
      return state
  }
}

export default comments