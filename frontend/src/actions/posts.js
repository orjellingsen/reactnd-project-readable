export const GET_POSTS = 'GET_POSTS' // GET /posts
export const GET_SINGLE_POST = 'GET_SINGLE_POST' // GET /posts/:id
export const ADD_POST = 'ADD_POST' // POST /posts
export const VOTE_POST = 'VOTE_POST' // POST /posts/:id
export const EDIT_POST = 'EDIT_POST' // PUT /posts/:id
export const DELETE_POST = 'REMOVE_POST' // DELETE /posts/:id

export function getPosts () {
  return {
    type: GET_POSTS,
  }
}

export function getSinglePost ({}) {
  return {
    type: GET_SINGLE_POST,
  }
}

export function addPost ({ id, title, body, author, category }) {
  return {
    type: ADD_POST,
    id,
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }
}

export function votePost ({ option }) {
  return {
    type: VOTE_POST,
    option,
  }
}

export function editPost ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body,
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id,
  }
}