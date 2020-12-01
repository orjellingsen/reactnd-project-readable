import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { removePost } from '../actions/posts'
import { removeComment } from '../actions/comments'
import { Context } from './App'

const Options = ({ data, type, handleEditComment }) => {
  const [redirect, setRedirect] = useState(false)

  const handleDelete = ({ id, parentId }, type) => {
    const { deletePost, deleteComment } = this.props
    if (type === 'post') {
      deletePost(id)
      setRedirect(true)
    } else {
      deleteComment(id, parentId)
    }
  }

  if (redirect) return <Redirect to="/" />

  return (
    <Context.Consumer>
      {({ handleEditPost }) => (
        <div className="options">
          <Button
            icon="edit"
            onClick={() =>
              type === 'post' ? handleEditPost(data, type) : handleEditComment(data)
            }
          />
          <Button icon="trash" onClick={() => handleDelete(data, type)} />
        </div>
      )}
    </Context.Consumer>
  )
}

Options.propTypes = {
  type: PropTypes.oneOf(['comment', 'post']).isRequired,
  data: PropTypes.object.isRequired,
  handleEditPost: PropTypes.func,
  handleEditComment: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: id => dispatch(removePost(id)),
    deleteComment: (id, postId) => dispatch(removeComment(id, postId)),
  }
}

export default connect(null, mapDispatchToProps)(Options)
