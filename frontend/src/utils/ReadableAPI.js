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

export const fetchPost = ( id ) =>
  fetch(`${api}/posts/${id}`, { headers, })
    .then(res => res.json())

export const addPost = ( post ) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post),
   })
    .then(res => res.json())
    .then(data => data.post)

export const deletePost = ( id ) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res.json())
    .then(data => data.post)

export const votePost = ( post, option ) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers,
  })
    .then(res => res.json())
    .then(data => data.vote)

export const editPost = ( post ) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers,
  })
    .then(res => res.json())
    .then(data => data.post)

    /*
// Comments
export const getCommentsByParent = () =>

export const getComments = () =>

export const editComment = () =>

export const addComment = () =>

export const voteComment = () =>

export const deleteComment = () =>*/