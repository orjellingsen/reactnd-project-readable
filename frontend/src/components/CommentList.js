import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import styled from 'styled-components'

import { ID } from '../utils/helper'
import { createComment, removeComment } from '../actions/comments'
import Comment from './Comment'
import { Button, FormGroup, Card } from '@blueprintjs/core'

const StyledComments = styled.div`
  grid-column: span 2;
`
const CommentHeader = styled.h3`
  margin-top: 20px;
  font-size: 18px;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`
const FormHeader = styled.h3`
  margin-top: 20px;
  grid-column: span 2;
  font-size: 16px;
`

class CommentList extends Component {
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
    comment.voteScore = 0
    addComment(comment)
  }

  render() {
    const { comments, commentCount } = this.props
    return (
      <StyledComments>
        <CommentHeader>Comments ({commentCount})</CommentHeader>
        {comments.map(comment => (
          <Card key={comment.id}>
            <Comment comment={comment} />
          </Card>
        ))}
        <Form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <FormHeader>Add new comment:</FormHeader>
          <FormGroup label="Comment" labelFor="body">
            <textarea className="pt-input pt-fill" id="body" name="body" />
          </FormGroup>
          <FormGroup label="Author" labelFor="author">
            <input className="pt-input pt-fill" id="author" name="author" />
          </FormGroup>
          <Button style={{ gridColumn: 'span 2' }} type="submit">
            Add comment
          </Button>
        </Form>
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

export default connect(null, mapDispatchToProps)(CommentList)
