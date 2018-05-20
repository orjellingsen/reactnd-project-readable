import React, { Component } from 'react'
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
import Settings from './Settings'

const StyledPost = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr auto;
  grid-gap: 20px;
`

const AuthorText = styled.p`
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: -10px;
  font-size: 12px;
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
    const {
      handleEditPost,
      post,
      comments,
      match: { params: { postId } },
    } = this.props
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <Card style={{ width: '90%', margin: '0px auto' }}>
        {post ? (
          <StyledPost>
            <Vote type="post" id={post.id} score={post.voteScore} />
            <div>
              <h3>{post.title} </h3>
              <AuthorText className="pt-text-muted">
                Posted {moment(post.timestamp).fromNow()} by {post.author}
              </AuthorText>
              <div>
                <p>{post.body}</p>
              </div>
            </div>
            <Settings type="post" data={post} handleEditPost={handleEditPost} />

            {comments && (
              <CommentList
                postId={postId}
                comments={comments[postId]}
                commentCount={post.commentCount}
              />
            )}
          </StyledPost>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostSingle)
)
