import React, { useState } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Button, FormGroup, Dialog } from '@blueprintjs/core'

import { capitalize, ID } from '../utils/helper'
import { createPost, updatePost } from '../actions/posts'
import { Context } from './App'

const PostForm = ({categories, currentPost, updatePost, createPost, toggleForm, history }) => {
  const [category, setCategory] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    if (currentPost) {
      post.id = currentPost.id
      updatePost(post)
      toggleForm()
    } else {
      post.timestamp = Date.now()
      post.id = ID()
      createPost(post)
      toggleForm()
      history.push('/')
    }
  }

  const handleChange = e => {
    setCategory(e.target.value)
  }

  return (
    <Context.Consumer>
      {({ postFormOpen, toggleForm, darkTheme, currentPost }) => (
        <Dialog
          className={darkTheme ? 'pt-dark' : ''}
          isOpen={postFormOpen}
          title={currentPost ? 'Edit post' : 'New Post'}
          icon={currentPost ? 'edit' : 'plus'}
          onClose={toggleForm}
        >
          <form
            className="form-container"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <FormGroup label="Title" labelFor="title">
              <input
                className="pt-input pt-fill"
                id="title"
                name="title"
                defaultValue={currentPost && currentPost.title}
              />
            </FormGroup>
            <FormGroup label="Content" labelFor="body">
              <textarea
                className="pt-input pt-fill"
                id="body"
                name="body"
                defaultValue={currentPost && currentPost.body}
              />
            </FormGroup>
            <FormGroup label="Author" labelFor="author">
              <input
                className="pt-input pt-fill"
                id="author"
                name="author"
                defaultValue={currentPost && currentPost.author}
              />
            </FormGroup>
            <FormGroup label="Category" labelFor="category">
              <div className="pt-select pt-fill">
                <select
                  value={
                    currentPost ? currentPost.category : category
                  }
                  name="category"
                  onChange={handleChange}
                >
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {capitalize(category.name)}
                    </option>
                  ))}
                </select>
              </div>
            </FormGroup>
            <Button
              className="pt-fill"
              intent={currentPost ? 'warning' : 'primary'}
              icon={currentPost ? 'edit' : 'plus'}
              type="submit"
            >
              {currentPost ? 'Update Post' : 'Create Post'}
            </Button>
          </form>
        </Dialog>
      )}
    </Context.Consumer>
  )
}

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
}


function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: post => dispatch(createPost(post)),
    updatePost: post => dispatch(updatePost(post)),
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
)
