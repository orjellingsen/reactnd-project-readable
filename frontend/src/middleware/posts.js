import * as api from '../utils/ReadableAPI'
import { getPosts, addPost, deletePost } from '../actions/posts'

export const fetchAllPosts = () => dispatch => (
  api.fetchAllPosts()
    .then(posts => dispatch(getPosts(posts)))
)

export const createPost = (post) => dispatch => (
  api.addPost(post)
    .then(post => dispatch(addPost(post)))
)

export const removePost = (id) => dispatch => (
  api.deletePost(id)
    .then(data => dispatch(deletePost(id)))
)