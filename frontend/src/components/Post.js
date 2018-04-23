import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import moment from 'moment'
import PropTypes from 'prop-types'

import { fetchPost, removePost, registerVote } from '../actions/posts'
import Comments from './Comments'

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
  }

  state = {
    redirect: false,
    edit: false,
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
      <div>
        {post ? (
          <div>
            <h3>{post.title}</h3>
            <p>
              Posted ${moment(post.timestamp).fromNow()} by ${post.author} (${
                post.commentCount
              }{' '}
              comments, ${post.voteScore} votes)
            </p>

            {singlePost ? (
              <div>
                <p>{post.body}</p>
              </div>
            ) : (
              ''
            )}

            {singlePost ? (
              <div>
                <div>
                  <button
                    onClick={e => this.handleVote(post.id, 'upVote')}
                    aria-label="Like"
                  >
                    Upvote
                  </button>
                  <p>{post.voteScore}</p>
                  <button
                    onClick={e => this.handleVote(post.id, 'downVote')}
                    aria-label="Dislike"
                  >
                    Downvote
                  </button>
                  <button onClick={e => this.handleEdit(post, e)}>Edit</button>
                  <button onClick={e => this.handleDelete(post.id, e)}>
                    Delete
                  </button>
                </div>

                <Comments postId={post.id} />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts: { post } }) {
  return {
    currentPost: post,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getPost: id => dispatch(fetchPost(id)),
    deletePost: id => dispatch(removePost(id)),
    votePost: (id, option) => dispatch(registerVote({ id, option })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
