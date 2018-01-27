import {
  GET_COMMENTS,
  ADD_COMMENT,
  GET_SINGLE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/actionTypes'

function commentsReducer (state = {}, action) {
  const { allComments, comment } = action
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
          allComments,
      }
    case ADD_COMMENT:
      return {
        ...state,
          comment,
      }
    case GET_SINGLE_COMMENT:
    case VOTE_COMMENT:
    case EDIT_COMMENT:
    case DELETE_COMMENT:
    default:
      return state
  }
}

export default commentsReducer