import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import moment from 'moment'
import { Card } from '@blueprintjs/core'

import { fetchPost } from '../actions/posts'
import { fetchComments } from '../actions/comments'
import CommentList from './CommentList'
import Vote from './Vote'
import Options from './Options'

const PostSingle = ({ handleEditPost, match: { params: { postId }} }) => {
  const post = useSelector(({ posts }) => posts.find(({ id }) => id === postId))
  const comments = useSelector(({ comments }) => comments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPost(postId))
    dispatch(fetchComments(postId))
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

export default withRouter(PostSingle)