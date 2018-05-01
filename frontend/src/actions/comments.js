import * as api from '../utils/ReadableAPI'

export const GET_COMMENTS = 'GET_COMMENTS' // GET /posts/:id/comments
export const ADD_COMMENT = 'ADD_COMMENT' // POST /comments
export const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT' // GET /comments/:id
export const VOTE_COMMENT = 'VOTE_COMMENT' // POST /comments/:id
export const EDIT_COMMENT = 'EDIT_COMMENT' // PUT /comments/:id
export const DELETE_COMMENT = 'DELETE_COMMENT' // DELETE /comments/:id

export function getComments(comments, postId) {
  return {
    type: GET_COMMENTS,
    comments,
    postId,
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function getSingleComment({ id }) {
  return {
    type: GET_SINGLE_COMMENT,
    id,
  }
}

export function voteComment({ id, option }) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
  }
}

export function editComment({ id, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp: Date.now(),
    body,
  }
}

export function deleteComment(id, postId) {
  return {
    type: DELETE_COMMENT,
    id,
    postId,
  }
}

export const fetchComments = postId => dispatch =>
  api
    .getComments(postId)
    .then(comments => dispatch(getComments(comments, postId)))

export const createComment = comment => dispatch =>
  api
    .addComment(comment)
    .then(_ => console.log(comment) || dispatch(addComment(comment)))

export const removeComment = (id, postId) => dispatch =>
  api.deleteComment(id).then(data => dispatch(deleteComment(id, postId)))
