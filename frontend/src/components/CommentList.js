import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import { ID } from '../utils/helper'
import { createComment, removeComment } from '../actions/comments'
import Comment from './Comment'
import { Button, FormGroup, Card } from '@blueprintjs/core'

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
      <div className="comment-list">
        <h3 className="comment-header">Comments ({commentCount})</h3>
        {comments.map(comment => (
          <Card key={comment.id}>
            <Comment comment={comment} />
          </Card>
        ))}
        <form className="comment-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <h4 className="comment-form-header">Add new comment:</h4>
          <FormGroup label="Comment" labelFor="body">
            <textarea className="pt-input pt-fill" id="body" name="body" />
          </FormGroup>
          <FormGroup label="Author" labelFor="author">
            <input className="pt-input pt-fill" id="author" name="author" />
          </FormGroup>
          <Button style={{ gridColumn: 'span 2' }} type="submit">
            Add comment
          </Button>
        </form>
      </div>
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
