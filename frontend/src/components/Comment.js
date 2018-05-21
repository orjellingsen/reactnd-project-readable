import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Options from './Options'
import Vote from './Vote'

const Comment = ({ comment }) => (
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
          <p className="pt-text-muted author-text">{`${moment(comment.timestamp).fromNow()} by ${
            comment.author
          }`}</p>
        </div>
        <Options type="comment" data={comment} handleEditComment={this.handleEdit} />
      </div>
    )}
  </Fragment>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
