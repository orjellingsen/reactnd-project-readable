import {
  GET_COMMENTS,
  ADD_COMMENT,
  GET_SINGLE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from './actionTypes'

export function getComments ({ postId }) {
  return {
    type: GET_COMMENTS,
    postId,
  }
}

export function addComment ({ id, body, author, parentId }) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp: Date.now(),
    body,
    author,
    parentId,
  }
}

export function getSingleComment ({ id }) {
  return {
    type: GET_SINGLE_COMMENT,
    id,
  }
}

export function voteComment ({ id , option }) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
  }
}

export function editComment ({ id, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp: Date.now(),
    body,
  }
}

export function deleteComment ({ id }) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}