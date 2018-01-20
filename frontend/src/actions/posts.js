import {
  GET_POSTS,
  GET_SINGLE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from './actionTypes'

export function getPosts ( allPosts ) {
  return {
    type: GET_POSTS,
    allPosts,
  }
}

export function getSinglePost ({ id }) {
  return {
    type: GET_SINGLE_POST,
    id,
  }
}

export function addPost ( post ) {
  return {
    type: ADD_POST,
    post,
  }
}

export function votePost ({ id, option }) {
  return {
    type: VOTE_POST,
    id,
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

export function deletePost ( id ) {
  return {
    type: DELETE_POST,
    id,
  }
}