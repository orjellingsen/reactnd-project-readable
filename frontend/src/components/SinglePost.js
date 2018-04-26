import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import moment from 'moment'
import PropTypes from 'prop-types'
import {
  Card,
  ButtonGroup,
  Button,
  Popover,
  PopoverInteractionKind,
} from '@blueprintjs/core'

import { fetchPost, removePost, registerVote } from '../actions/posts'
import Comments from './Comments'

class SinglePost extends Component {
  static propTypes = {
    post: PropTypes.object,
    singlePost: PropTypes.string,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
  }

  state = {
    redirect: false,
    edit: false,
  }

  componentDidMount() {
    const { getPost, path } = this.props
    const postId = path.substr(6)
    getPost(postId)
  }

  handleDelete = id => {
    this.props.deletePost(id)
    this.setState({ redirect: true })
  }

  handleEdit = post => {
    this.setState({ edit: true })
  }

  handleVote = (id, vote) => {
    this.props.votePost(id, vote)
  }

  render() {
    const { post } = this.props
    const { redirect, edit } = this.state

    if (redirect) {
      return <Redirect to="/" />
    }

    if (edit) {
      return <Redirect to={`/update/${post.id}`} />
    }

    return (
      <Card className="post">
        <h3>{post.title}</h3>
        <p>
          Posted {moment(post.timestamp).fromNow()} by {post.author} ({
            post.commentCount
          }{' '}
          comments, {post.voteScore} votes)
        </p>
        <div>
          <p>{post.body}</p>
        </div>

        <ButtonGroup>
          <Button
            icon="thumbs-up"
            onClick={e => this.handleVote(post.id, 'upVote')}
          />
          <Button intent="primary">{post.voteScore}</Button>
          <Button
            icon="thumbs-down"
            onClick={e => this.handleVote(post.id, 'downVote')}
          />
          <Button icon="edit" onClick={e => this.handleEdit(post, e)}>
            Edit
          </Button>
          <Popover
            interactionKind={PopoverInteractionKind.CLICK}
            popoverClassName="pt-popover-content-sizing"
          >
            <Button intent="danger" icon="trash">
              Delete
            </Button>
            <div>
              <p>Are you sure you want to delete this post?</p>
              <Button className="pt-popover-dismiss" icon="cancel">
                Cancel
              </Button>
              <Button
                className="pt-popover"
                intent="danger"
                icon="trash"
                onClick={e => this.handleDelete(post.id, e)}
              >
                Confirm delete
              </Button>
            </div>
          </Popover>
        </ButtonGroup>

        <Comments postId={post.id} />
      </Card>
    )
  }
}

function mapStateToProps({ posts: { post = {} } }) {
  return {
    post,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getPost: id => dispatch(fetchPost(id)),
    deletePost: id => dispatch(removePost(id)),
    votePost: (id, option) => dispatch(registerVote({ id, option })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)
