import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

import { fetchPost } from '../actions/posts'
import { fetchComments } from '../actions/comments'
import CommentList from './CommentList'
import Vote from './Vote'
import Options from './Options'

const PostSingle = ({ post, handleEditPost, comments = [], getPost, getComments, match: { params: { postId }} }) => {
  useEffect(() => {
    getPost(postId)
    getComments(postId)
  }, [postId])

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
        <Fragment>
          <span />
          <h3>404: Post not found</h3>
        </Fragment>
      )}
    </Card>
  )
}

PostSingle.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.object,
  getPost: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
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
