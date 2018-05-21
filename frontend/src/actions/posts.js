import * as api from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS' // GET /posts
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY' // GET /:category/posts
export const GET_SINGLE_POST = 'GET_SINGLE_POST' // GET /posts/:id
export const ADD_POST = 'ADD_POST' // POST /posts
export const VOTE_POST = 'VOTE_POST' // POST /posts/:id
export const EDIT_POST = 'EDIT_POST' // PUT /posts/:id
export const DELETE_POST = 'REMOVE_POST' // DELETE /posts/:id

export function getPosts(allPosts) {
  return {
    type: GET_POSTS,
    allPosts,
  }
}

export function getPostsByCategory(postsByCategory, category) {
  return {
    type: GET_POSTS_BY_CATEGORY,
    postsByCategory,
    category,
  }
}

export function getSinglePost(post) {
  return {
    type: GET_SINGLE_POST,
    post,
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  }
}

export const fetchAllPosts = () => dispatch =>
  api.fetchAllPosts().then(posts => dispatch(getPosts(posts)))

export const fetchPostsByCategory = category => dispatch =>
  api.fetchPostsByCategory(category).then(posts => dispatch(getPostsByCategory(posts, category)))

export const fetchPost = id => dispatch =>
  api.fetchPost(id).then(post => dispatch(getSinglePost(post)))

export const createPost = post => dispatch =>
  api.addPost(post).then(post => dispatch(addPost(post)))

export const removePost = id => dispatch =>
  api.deletePost(id).then(data => dispatch(deletePost(id)))

export const updatePost = post => dispatch =>
  api.editPost(post).then(post => dispatch(editPost(post)))

export const registerVote = (id, option) => dispatch =>
  api.votePost({ id, option }).then(post => dispatch(votePost(post)))
