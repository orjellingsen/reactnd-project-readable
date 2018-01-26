import * as api from '../utils/ReadableAPI'
import {
  getPosts,
  addPost,
  deletePost,
  getPostsByCategory,
  getSinglePost,
  editPost,
} from '../actions/posts'

export const fetchAllPosts = () => dispatch => (
  api.fetchAllPosts()
    .then(posts => dispatch(getPosts(posts)))
)

export const fetchPostsByCategory = (category) => dispatch => (
  api.fetchPostsByCategory(category)
    .then(posts => dispatch(getPostsByCategory(posts)))
)

export const fetchPost = (id) => dispatch => (
  api.fetchPost(id)
    .then(post => dispatch(getSinglePost(post)))
)

export const createPost = (post) => dispatch => (
  api.addPost(post)
    .then(post => dispatch(addPost(post)))
)

export const removePost = (id) => dispatch => (
  api.deletePost(id)
    .then(data => dispatch(deletePost(id)))
)

export const updatePost = (post) => dispatch => (
  api.editPost(post)
    .then(post => dispatch(editPost(post)))
)