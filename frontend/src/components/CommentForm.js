import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, FormGroup } from '@blueprintjs/core'
import serializeForm from 'form-serialize'

import { ID } from '../utils/helper'
import { createComment, updateComment } from '../actions/comments'

const defaultState = {
  body: '',
  author: '',
}

const CommentForm = ({editComment, cancelEdit, postId })=> {
  const dispatch = useDispatch()
  const [state, setState] = useState(defaultState)

  useEffect(()=> {
    if (editComment) {
      setState({ body: editComment.body, author: editComment.author })
    }
  },[editComment])

  const resetForm = () => {
    setState(defaultState)
  }

  const onChange = e => {
    const { name, value } = e.target
    setState({ [name]: value })
  }

  const handleCancel = () => {
    resetForm()
    cancelEdit()
  }

  const handleSubmit = e => {
    e.preventDefault()
    const comment = serializeForm(e.target, { hash: true })
    if (editComment) {
      const updatedComment = {
        ...editComment,
        body: comment.body,
        author: comment.author,
      }
      dispatch(updateComment(updatedComment))
      resetForm()
      handleCancel()
    } else {
      comment.timestamp = Date.now()
      comment.id = ID()
      comment.parentId = postId
      comment.voteScore = 0
      dispatch(createComment(comment))
      resetForm()
    }
  }

  const { body, author } = state
  return (
    <form
      className="comment-form"
      onSubmit={handleSubmit}
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
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup label="Author" labelFor="author">
        <input
          className="pt-input pt-fill"
          id="author"
          name="author"
          value={author}
          onChange={onChange}
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
          onClick={handleCancel}
          intent="danger"
          icon="cross"
        >
          Cancel
        </Button>
      )}
    </form>
  )
}

CommentForm.propTypes = {
  editComment: PropTypes.object,
  cancelEdit: PropTypes.func.isRequired,
}



export default CommentForm
