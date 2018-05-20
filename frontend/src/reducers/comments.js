import {
  GET_COMMENTS,
  ADD_COMMENT,
  GET_SINGLE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/comments'

export default function comments(state = {}, action) {
  const { comments, postId, comment, id, option } = action
  switch (action.type) {
    // TODO: give id as index key
    case GET_COMMENTS:
      return {
        ...state,
        [postId]: [...comments],
      }
    case ADD_COMMENT:
      const { parentId } = comment
      return parentId
        ? {
            ...state,
            [parentId]: state[parentId].concat(comment),
          }
        : {
            ...state,
            comment,
          }
    case GET_SINGLE_COMMENT:
    case VOTE_COMMENT:
      return {
        ...state,
        [postId]: state[postId].map(comment => {
          if (comment.id === id) {
            return {
              ...comment,
              voteScore:
                option === 'upVote'
                  ? comment.voteScore + 1
                  : comment.voteScore - 1,
            }
          }
          return comment
        }),
      }
    case EDIT_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        [postId]: state[postId].filter(c => c.id !== id),
      }
    default:
      return state
  }
}
