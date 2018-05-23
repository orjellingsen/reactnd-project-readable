import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { removePost } from '../actions/posts'
import { removeComment } from '../actions/comments'
import { Context } from './App'

class Options extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['comment', 'post']).isRequired,
    data: PropTypes.object.isRequired,
    handleEditPost: PropTypes.func,
    handleEditComment: PropTypes.func,
  }

  state = {
    redirect: false,
  }

  handleDelete = ({ id, parentId }, type) => {
    const { deletePost, deleteComment } = this.props
    if (type === 'post') {
      deletePost(id)
      this.setState({ redirect: true })
    } else {
      deleteComment(id, parentId)
    }
  }

  render() {
    const { data, type, handleEditComment } = this.props
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
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
            <Button icon="trash" onClick={() => this.handleDelete(data, type)} />
          </div>
        )}
      </Context.Consumer>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: id => dispatch(removePost(id)),
    deleteComment: (id, postId) => dispatch(removeComment(id, postId)),
  }
}

export default connect(null, mapDispatchToProps)(Options)
