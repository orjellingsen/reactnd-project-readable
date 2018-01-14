export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function addComment ({ parentId, body, author }) {
  return {
    type: ADD_COMMENT,
    parentId,
    body,
    author,
  }
}

export function removeComment ({ id }) {
  return {
    type: REMOVE_COMMENT,
    id,
    deleted: true,
  }
}

export function editComment ({ id, author }) {
  return {
    type: EDIT_COMMENT,
    id,
    author,
  }
}

export function voteComment ({ id, voteScore }) {
  return {
    type: VOTE_COMMENT,
    id,
    voteScore,
  }
}