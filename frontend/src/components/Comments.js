import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import { ID } from '../utils/helper'
import {
  fetchComments,
  createComment,
  removeComment,
} from '../actions/comments'
import Comment from './Comment'

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
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

  componentWillMount() {
    const { getComments, postId } = this.props
    getComments(postId)
  }

  render() {
    const { comments } = this.props
    return (
      <div>
        <h3>Comments</h3>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <input id="body" name="body" />
          <input id="author" name="author" />
          <button type="submit">Add comment</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ comments: { allComments = [] } }) {
  return {
    comments: allComments.sort(({ timestamp }) => timestamp),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getComments: postId => dispatch(fetchComments(postId)),
    addComment: comment => dispatch(createComment(comment)),
    deleteComment: id => dispatch(removeComment(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
