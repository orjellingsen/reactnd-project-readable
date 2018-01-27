import * as api from '../utils/ReadableAPI'
import {
  getComments,
  addComment,
  deleteComment,
} from '../actions/comments'

export const fetchComments = (postId) => dispatch => (
  api.getComments(postId)
    .then(comments => dispatch(getComments(comments)))
)

export const createComment = (comment) => dispatch => (
  api.addComment(comment)
    .then(comment => dispatch(addComment(comment)))
)

export const removeComment = (id) => dispatch => (
  api.deleteComment(id)
    .then(data => dispatch(deleteComment(id)))
)