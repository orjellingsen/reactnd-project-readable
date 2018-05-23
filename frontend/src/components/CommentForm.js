import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, FormGroup } from '@blueprintjs/core'
import serializeForm from 'form-serialize'

import { ID } from '../utils/helper'
import { createComment, updateComment } from '../actions/comments'

class CommentForm extends Component {
  static propTypes = {
    editComment: PropTypes.object,
    cancelEdit: PropTypes.func.isRequired,
  }

  state = {
    body: '',
    author: '',
  }

  static getDerivedStateFromProps({ editComment }) {
    if (editComment) {
      return { body: editComment.body, author: editComment.author }
    }
    return null
  }

  resetForm = () => {
    this.setState({ body: '', author: '' })
  }

  onChangeBody = e => {
    this.setState({ body: e.target.value })
  }

  onChangeAuthor = e => {
    this.setState({ author: e.target.value })
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
      <form className="comment-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <h4 className="comment-form-header">{editComment ? 'Edit comment' : 'Add new comment'}</h4>
        <FormGroup label="Comment" labelFor="body">
          <textarea
            className="pt-input pt-fill"
            id="body"
            name="body"
            value={body}
            onChange={this.onChangeBody}
          />
        </FormGroup>
        <FormGroup label="Author" labelFor="author">
          <input
            className="pt-input pt-fill"
            id="author"
            name="author"
            value={author}
            onChange={this.onChangeAuthor}
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
          <Button className="wide-button" onClick={this.handleCancel} intent="danger" icon="cross">
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
