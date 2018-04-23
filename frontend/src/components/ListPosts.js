import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'

import { fetchPostsByCategory } from '../actions/posts'

class ListPosts extends Component {
  static propTypes = {
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array,
  }

  state = {
    sort: 'timestamp',
  }

  render() {
    return (
      <div>
        {this.props.posts.map(post => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <div>
              <h3>{post.title}</h3>
              <p>
                Posted {moment(post.timestamp).fromNow()} by {post.author} ({
                  post.commentCount
                }{' '}
                comments, {post.voteScore} votes)
              </p>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: _.values(_.orderBy(posts.allPosts, 'timestamp', 'desc')),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
