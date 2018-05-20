import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router'
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
import { fetchComments } from '../actions/comments'
import Comments from './Comments'

class SinglePost extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.object.isRequired,
    handleEditPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
  }

  state = {
    redirect: false,
    postId: null,
  }

  componentDidMount() {
    const { getPost, getComments, match: { params: { postId } } } = this.props
    getPost(postId)
    getComments(postId)
  }

  handleDelete = id => {
    this.props.deletePost(id)
    this.setState({ redirect: true })
  }

  handleVote = (id, vote) => {
    this.props.votePost(id, vote)
  }

  render() {
    const { post, comments } = this.props
    const { redirect, postId } = this.state
    if (redirect) {
      return <Redirect to="/" />
    }
    return (
      <Card>
        {post ? (
          <Fragment>
            <h3>{post.title}</h3>
            <p className="pt-text-muted">
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
              <Button>{post.voteScore}</Button>
              <Button
                icon="thumbs-down"
                onClick={e => this.handleVote(post.id, 'downVote')}
              />
              <Button
                icon="edit"
                onClick={e => this.props.handleEditPost(post, e)}
              >
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

            {comments && (
              <Comments
                postId={postId}
                comments={this.props.comments[postId]}
              />
            )}
          </Fragment>
        ) : (
          ''
        )}
      </Card>
    )
  }
}

function mapStateToProps(
  { comments, posts },
  { match: { params: { postId } } }
) {
  console.log(posts)
  return {
    comments,
    post: posts.find(post => post.id === postId),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getComments: postId => dispatch(fetchComments(postId)),
    getPost: id => dispatch(fetchPost(id)),
    deletePost: id => dispatch(removePost(id)),
    votePost: (id, option) => dispatch(registerVote({ id, option })),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SinglePost)
)
