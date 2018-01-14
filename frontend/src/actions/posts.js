export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export function addPost ({ title, body }) {
  return {
    type: ADD_POST,
    title,
    body,
  }
}

export function removePost ({ id }) {
  return {
    type: REMOVE_POST,
    id,
  }
}

export function editPost ({ id, author }) {
  return {
    type: EDIT_POST,
    id,
    author,
  }
}

export function votePost ({ id, voteScore }) {
  return {
    type: VOTE_POST,
    id,
    voteScore,
  }
}