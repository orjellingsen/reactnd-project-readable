import * as api from '../utils/ReadableAPI'
import { getPosts } from '../actions/posts'

export const fetchAllPosts = () => dispatch => (
  api.fetchAllPosts()
    .then(posts => dispatch(getPosts(posts)))
)