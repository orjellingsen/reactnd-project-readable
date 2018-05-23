import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Options from './Options'
import Vote from './Vote'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  }

  render() {
    const { comment, handleEdit } = this.props
    return (
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
              <p className="pt-text-muted author-text">{`${moment(
                comment.timestamp
              ).fromNow()} by ${comment.author}`}</p>
            </div>
            <Options type="comment" data={comment} handleEditComment={handleEdit} />
          </div>
        )}
      </Fragment>
    )
  }
}

export default Comment
