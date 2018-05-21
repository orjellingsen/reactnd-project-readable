import * as api from '../utils/ReadableAPI'

export const GET_COMMENTS = 'GET_COMMENTS' // GET /posts/:id/comments
export const ADD_COMMENT = 'ADD_COMMENT' // POST /comments
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

export function voteComment(id, option, postId) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
    postId,
  }
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
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
  api.getComments(postId).then(comments => dispatch(getComments(comments, postId)))

export const createComment = comment => dispatch =>
  api.addComment(comment).then(_ => dispatch(addComment(comment)))

export const removeComment = (id, postId) => dispatch =>
  api.deleteComment(id).then(data => dispatch(deleteComment(id, postId)))

export const registerVoteComment = (id, option, postId) => dispatch =>
  api.voteComment({ id, option }).then(_ => dispatch(voteComment(id, option, postId)))
