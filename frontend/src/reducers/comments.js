import {
  GET_COMMENTS, ADD_COMMENT, GET_SINGLE_COMMENT, VOTE_COMMENT, EDIT_COMMENT, DELETE_COMMENT,
} from '../actions/comments'

function commentsReducer (state = {}, action) {

  switch (action.type) {
    case GET_COMMENTS:
    case ADD_COMMENT:
    case GET_SINGLE_COMMENT:
    case VOTE_COMMENT:
    case EDIT_COMMENT:
    case DELETE_COMMENT:
    default:
      return state
  }
}

export default commentsReducer