export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export function addPost ({}) {
  return {
    type: ADD_POST,
  }
}

export function removePost ({}) {
  return {
    type: REMOVE_POST,
  }
}

export function editPost ({}) {
  return {
    type: EDIT_POST,
  }
}

export function votePost ({}) {
  return {
    type: VOTE_POST,
  }
}