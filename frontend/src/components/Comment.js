import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import { removeComment } from '../actions/comments'

class Comment extends Component {
  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object,
    classes: PropTypes.object,
  }

  handleDelete = id => {
    this.props.deleteComment(id)
  }

  handleEdit = e => {}

  render() {
    const { comment } = this.props
    return (
      <div>
        {comment ? (
          <div>
            <div>
              <p>{comment.body}</p>
              <p>{`${moment(comment.timestamp).fromNow()} by ${
                comment.author
              } (Score: ${comment.voteScore})`}</p>
            </div>
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={e => this.handleDelete(comment.id)}>Delete</button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: id => dispatch(removeComment(id)),
  }
}

export default connect(mapDispatchToProps)(Comment)
