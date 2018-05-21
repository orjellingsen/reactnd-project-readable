import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

import { fetchPost } from '../actions/posts'
import { fetchComments } from '../actions/comments'
import CommentList from './CommentList'
import styled from 'styled-components'
import Vote from './Vote'
import Options from './Options'

const StyledPost = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr auto;
  grid-gap: 20px;
`
class PostSingle extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.object.isRequired,
    handleEditPost: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
  }

  state = {
    redirect: false,
  }

  componentDidMount() {
    const { getPost, getComments, match: { params: { postId } } } = this.props
    getPost(postId)
    getComments(postId)
  }

  render() {
    const { handleEditPost, post, comments, match: { params: { postId } } } = this.props
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <Card className="post">
        {post ? (
          <Fragment>
            <Vote type="post" id={post.id} score={post.voteScore} />
            <div>
              <h3>{post.title} </h3>
              <p className="pt-text-muted author-text">
                Posted {moment(post.timestamp).fromNow()} by {post.author}
              </p>
              <div>
                <p>{post.body}</p>
              </div>
            </div>
            <Options type="post" data={post} handleEditPost={handleEditPost} />

            {comments && (
              <CommentList
                postId={postId}
                comments={comments[postId]}
                commentCount={post.commentCount}
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

function mapStateToProps({ comments, posts }, { match: { params: { postId } } }) {
  return {
    comments,
    post: posts.find(post => post.id === postId),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getComments: postId => dispatch(fetchComments(postId)),
    getPost: id => dispatch(fetchPost(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSingle))
