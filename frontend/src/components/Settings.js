import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { removePost } from '../actions/posts'
import { removeComment } from '../actions/comments'

const PostSettings = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 10px;
`

class Settings extends Component {
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
    if (type === 'post') {
      this.props.deletePost(id)
      this.setState({ redirect: true })
    } else {
      this.props.deleteComment(id, parentId)
    }
  }

  handleEdit = (data, type) => {
    console.log('edit')
  }

  render() {
    const { type, data, handleEditPost, handleEditComment } = this.props
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <PostSettings>
        <Button icon="edit" onClick={() => this.handleEdit(data, type)} />
        <Button icon="trash" onClick={() => this.handleDelete(data, type)} />
      </PostSettings>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: id => dispatch(removePost(id)),
    deleteComment: (id, postId) => dispatch(removeComment(id, postId)),
  }
}

export default connect(null, mapDispatchToProps)(Settings)
