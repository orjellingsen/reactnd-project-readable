import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import styled from 'styled-components'

import { ID } from '../utils/helper'
import { createComment, removeComment } from '../actions/comments'
import Comment from './Comment'

const StyledComments = styled.div`
  width: 80%;
`
class Comments extends Component {
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
    addComment(comment)
  }

  render() {
    return (
      <StyledComments>
        <h3>Comments</h3>
        {this.props.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <input id="body" name="body" />
          <input id="author" name="author" />
          <button type="submit">Add comment</button>
        </form>
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

export default connect(null, mapDispatchToProps)(Comments)
