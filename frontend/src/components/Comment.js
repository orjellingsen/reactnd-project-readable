import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import { removeComment } from '../actions/comments'

class Comment extends Component {
  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object,
  }

  handleDelete = (id, postId) => {
    this.props.deleteComment(id, postId)
  }

  handleEdit = e => {}

  render() {
    const { comment } = this.props
    return (
      <Fragment>
        {comment && (
          <div>
            <div>
              <p>{comment.body}</p>
              <p>{`${moment(comment.timestamp).fromNow()} by ${
                comment.author
              } (Score: ${comment.voteScore})`}</p>
            </div>
            <button onClick={this.handleEdit}>Edit</button>
            <button
              onClick={e => this.handleDelete(comment.id, comment.parentId)}
            >
              Delete
            </button>
          </div>
        )}
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (id, postId) => dispatch(removeComment(id, postId)),
  }
}

export default connect(null, mapDispatchToProps)(Comment)
