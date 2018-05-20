import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Elevation } from '@blueprintjs/core'

import { fetchAllPosts } from '../actions/posts'
import { fetchPostsByCategory } from '../actions/posts'

class ListPosts extends Component {
  static propTypes = {
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
  }

  state = {
    category: 'all',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getAllPosts,
      getPostsByCategory,
      match: { params: { category = 'all' } },
    } = nextProps
    if (category === prevState.category) {
      return null
    }
    if (category !== 'all') {
      getPostsByCategory(category)
      return {
        category,
      }
    } else {
      getAllPosts()
      return { category: 'all' }
    }
  }

  componentDidMount() {
    if (this.state.category === 'all') {
      this.props.getAllPosts()
    }
  }
  render() {
    return (
      <Fragment>
        {this.props.posts.map(post => (
          <Link
            style={{ textDecoration: 'none' }}
            key={post.id}
            to={`/post/${post.id}`}
          >
            <Card className="post" interactive={true} elevation={Elevation.ONE}>
              <p>
                Posted {moment(post.timestamp).fromNow()} by {post.author} ({
                  post.commentCount
                }{' '}
                comments, {post.voteScore} votes)
              </p>
              <div>
                <h5>{post.title}</h5>
                <p className="pt-text">{post.body}</p>
              </div>
            </Card>
          </Link>
        ))}
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.sort(({ timestamp }) => timestamp),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
