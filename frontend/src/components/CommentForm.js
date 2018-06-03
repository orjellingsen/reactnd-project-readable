import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, FormGroup } from '@blueprintjs/core'
import serializeForm from 'form-serialize'

import { ID } from '../utils/helper'
import { createComment, updateComment } from '../actions/comments'

const defaultState = {
  body: '',
  author: '',
}
class CommentForm extends Component {
  static propTypes = {
    editComment: PropTypes.object,
    cancelEdit: PropTypes.func.isRequired,
  }

  state = defaultState

  static getDerivedStateFromProps({ editComment }) {
    if (editComment) {
      return { body: editComment.body, author: editComment.author }
    }
    return null
  }

  resetForm = () => {
    this.setState(defaultState)
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleCancel = () => {
    this.resetForm()
    this.props.cancelEdit()
  }

  handleSubmit = e => {
    const { addComment, postId, editComment, updateComment } = this.props
    e.preventDefault()
    const comment = serializeForm(e.target, { hash: true })
    if (editComment) {
      const updatedComment = {
        ...editComment,
        body: comment.body,
        author: comment.author,
      }
      updateComment(updatedComment)
      this.resetForm()
      this.handleCancel()
    } else {
      comment.timestamp = Date.now()
      comment.id = ID()
      comment.parentId = postId
      comment.voteScore = 0
      addComment(comment)
      this.resetForm()
    }
  }

  render() {
    const { editComment } = this.props
    const { body, author } = this.state
    return (
      <form
        className="comment-form"
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <h4 className="comment-form-header">
          {editComment ? 'Edit comment' : 'Add new comment'}
        </h4>
        <FormGroup label="Comment" labelFor="body">
          <textarea
            className="pt-input pt-fill"
            id="body"
            name="body"
            value={body}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup label="Author" labelFor="author">
          <input
            className="pt-input pt-fill"
            id="author"
            name="author"
            value={author}
            onChange={this.onChange}
          />
        </FormGroup>
        <Button
          className="wide-button"
          type="submit"
          intent="primary"
          icon={editComment ? 'edit' : 'plus'}
        >
          {editComment ? 'Update' : 'Add comment'}
        </Button>
        {editComment && (
          <Button
            className="wide-button"
            onClick={this.handleCancel}
            intent="danger"
            icon="cross"
          >
            Cancel
          </Button>
        )}
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(createComment(comment)),
    updateComment: comment => dispatch(updateComment(comment)),
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
