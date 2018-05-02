import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import styled from 'styled-components'

import { ID } from '../utils/helper'
import { createComment, removeComment } from '../actions/comments'
import Comment from './Comment'
import { Button, FormGroup } from '@blueprintjs/core'

const StyledComments = styled.div`
  width: 80%;
`
const CommentHeader = styled.h3`
  margin-top: 20px;
`
class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  }

  static defaultProps = {
    comments: [],
  }

  handleSubmit = e => {
    const { addComment, postId } = this.props
    e.preventDefault()
    const comment = serializeForm(e.target, { hash: true })
    comment.timestamp = Date.now()
    comment.id = ID()
    comment.parentId = postId
    addComment(comment)
  }

  render() {
    return (
      <StyledComments>
        <CommentHeader>Comments</CommentHeader>
        {this.props.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <FormGroup label="Comment" labelFor="body">
            <textarea className="pt-input" id="body" name="body" />
          </FormGroup>
          <FormGroup label="Author" labelFor="author">
            <input className="pt-input" id="author" name="author" />
          </FormGroup>
          <Button type="submit">Add comment</Button>
        </form>
      </StyledComments>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(createComment(comment)),
    deleteComment: id => dispatch(removeComment(id)),
  }
}

export default connect(null, mapDispatchToProps)(Comments)
