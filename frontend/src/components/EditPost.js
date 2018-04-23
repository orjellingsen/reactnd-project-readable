import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'

import { capitalize, ID } from '../utils/helper'
import { createPost, updatePost } from '../actions/posts'

class EditPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    path: PropTypes.string,
    categories: PropTypes.array.isRequired,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
  }

  state = {
    redirect: false,
    redirectNew: false,
    category: 'react',
  }

  componentDidMount() {
    const { post, path } = this.props
    if (path.includes('/update')) {
      if (post) {
        this.setState({ category: post.category })
      }
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = e => {
    const { createPost, updatePost, post } = this.props
    e.preventDefault()
    const updatedPost = serializeForm(e.target, { hash: true })
    updatedPost.timestamp = Date.now()
    if (!post) {
      updatedPost.id = ID()
      createPost(updatedPost)
    } else {
      updatedPost.id = post.id
      updatePost(updatedPost)
    }
    this.setState({ redirect: true })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { categories, post } = this.props
    const { category, redirect, redirectNew } = this.state
    if (redirect) {
      return <Redirect to="/" />
    } else if (redirectNew) {
      return <Redirect to="/new" />
    }
    return (
      <div>
        <h3>{post ? 'Edit Post' : 'New Post'}</h3>
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <input
            id="title"
            name="title"
            defaultValue={post ? post.title : ''}
          />
          <input id="body" name="body" defaultValue={post ? post.body : ''} />
          <input
            id="author"
            name="author"
            defaultValue={post ? post.author : ''}
          />

          <select
            value={category}
            input={<input name="category" id="category" />}
            onChange={this.handleChange}
          >
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {capitalize(category.name)}
              </option>
            ))}
          </select>
          <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts: { post } }) {
  return {
    post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: post => dispatch(createPost(post)),
    updatePost: post => dispatch(updatePost(post)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
