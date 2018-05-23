import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Comment from './Comment'
import { Card } from '@blueprintjs/core'
import CommentForm from './CommentForm'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
  }

  static defaultProps = {
    comments: [],
  }

  state = {
    editComment: null,
  }

  handleEdit = comment => {
    this.setState(() => ({ editComment: comment }))
  }

  cancelEdit = () => {
    this.setState(() => ({ editComment: null }))
  }

  render() {
    const { comments, commentCount, postId } = this.props
    const { editComment } = this.state
    return (
      <div className="comment-list">
        <h3 className="comment-header">Comments ({commentCount})</h3>
        {comments.map(comment => (
          <Card
            key={comment.id}
            style={{
              backgroundColor: editComment ? editComment.id === comment.id && '#293742' : null,
            }}
          >
            <Comment
              comment={comment}
              handleEdit={this.handleEdit}
              editId={editComment ? editComment.id : null}
            />
          </Card>
        ))}
        <CommentForm
          postId={postId}
          editComment={editComment ? editComment : null}
          cancelEdit={this.cancelEdit}
        />
      </div>
    )
  }
}

export default CommentList
