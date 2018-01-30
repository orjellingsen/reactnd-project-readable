import {
  GET_COMMENTS,
  ADD_COMMENT,
  GET_SINGLE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/actionTypes'

function commentsReducer (state = {}, action) {
  const { allComments, comment, id, } = action
  switch (action.type) {
    // TODO: give id as index key
    case GET_COMMENTS:
      return {
        ...state,
          allComments,
      }
    case ADD_COMMENT:
      return {
        ...state,
          allComments: state.allComments.concat(comment)
      }
    case GET_SINGLE_COMMENT:
    case VOTE_COMMENT:
    case EDIT_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
          allComments: state.allComments.filter((c) => c.id !== id),
      }
    default:
      return state
  }
}

export default commentsReducer