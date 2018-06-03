import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Options from './Options'
import Vote from './Vote'
import { dateFormat } from '../utils/helper'

const Comment = ({ comment, handleEdit }) => (
  <Fragment>
    {comment && (
      <div className="comment">
        <Vote
          type="comment"
          id={comment.id}
          score={comment.voteScore}
          parentId={comment.parentId}
        />
        <div>
          <p>{comment.body}</p>
          <p className="pt-text-muted author-text">
            {dateFormat(comment.timestamp)} by {comment.author}
          </p>
        </div>
        <Options type="comment" data={comment} handleEditComment={handleEdit} />
      </div>
    )}
  </Fragment>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

export default Comment
