const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

// Categories
export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const fetchPostsByCategory = ( category ) =>
  fetch(`${api}/${category}/posts`, { headers, })
    .then(res => res.json())

// Posts
export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers, })
    .then(res => res.json())

export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers, })
    .then(res => res.json())

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post),
   })
    .then(res => res.json())
    .then(data => data.post)

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res.json())
    .then(data => data.post)

export const votePost = ({id, option}) => {
  const body = {'option': option,}
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}

export const editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(post),
  })
    .then(res => res.json())
    .then(data => data.post)


// Comments
export const getCommentsByParent = () =>
  fetch()

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())

export const editComment = () =>
  fetch()

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment),
  })
    .then(res=> res.json())
    .then(data => data.comment)

export const voteComment = () =>
  fetch()

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res.json())
    .then(data => data.comment)

/*
  export const GET_COMMENTS = 'GET_COMMENTS' // GET /posts/:id/comments
export const ADD_COMMENT = 'ADD_COMMENT' // POST /comments
export const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT' // GET /comments/:id
export const VOTE_COMMENT = 'VOTE_COMMENT' // POST /comments/:id
export const EDIT_COMMENT = 'EDIT_COMMENT' // PUT /comments/:id
export const DELETE_COMMENT = 'DELETE_COMMENT' // DELETE /comments/:id*/