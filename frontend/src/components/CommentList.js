import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Comment from './Comment'
import { Card } from '@blueprintjs/core'
import CommentForm from './CommentForm'

const CommentList = ({ comments = [], commentCount, postId })=> {
  const [editComment, setEditComment] = useState(null)

  const handleEdit = comment => {
    setEditComment(comment)
  }

  const cancelEdit = () => {
    setEditComment(null)
  }

  return (
    <div className="comment-list">
      <CommentForm
        postId={postId}
        editComment={editComment ? editComment : null}
        cancelEdit={cancelEdit}
      />
      <h3 className="comment-header">Comments ({commentCount})</h3>
      {comments.map(comment => (
        <Card
          key={comment.id}
          style={{
            backgroundColor: editComment
              ? editComment.id === comment.id && '#293742'
              : null,
          }}
        >
          <Comment
            comment={comment}
            handleEdit={handleEdit}
            editId={editComment ? editComment.id : null}
          />
        </Card>
      ))}
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  commentCount: PropTypes.number,
}

export default CommentList
