import * as api from '../utils/ReadableAPI'
import {
  getComments,
  addComment,
} from '../actions/comments'

export const fetchComments = (postId) => dispatch => (
  api.getComments(postId)
    .then(comments => dispatch(getComments(comments)))
)

export const createComment = (comment) => dispatch => (
  api.addComment(comment)
    .then(comment => dispatch(addComment(comment)))
)