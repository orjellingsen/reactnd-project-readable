import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Elevation } from '@blueprintjs/core'

import { fetchPostsByCategory } from '../actions/posts'

class ListPosts extends Component {
  static propTypes = {
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    category: PropTypes.string,
  }

  static defaultProps = {
    category: 'all',
    posts: [],
  }

  state = {
    posts: [],
  }

  componentDidMount() {
    this.setState(() => ({
      posts: this.props.posts.sort(({ timestamp }) => timestamp),
    }))
    const { getPostsByCategory, category } = this.props
    if (category === 'all') {
      return
    } else {
      getPostsByCategory(category)
    }
  }

  render() {
    const { posts } = this.props
    return (
      <Fragment>
        {posts.map(post => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <Card className="post" interactive={true} elevation={Elevation.ONE}>
              <p>
                Posted {moment(post.timestamp).fromNow()} by {post.author} ({
                  post.commentCount
                }{' '}
                comments, {post.voteScore} votes)
              </p>
              <div>
                <h5>{post.title}</h5>
                <p
                  style={{ width: '150px' }}
                  className="pt-text-overflow-ellipsis"
                >
                  {post.body}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </Fragment>
    )
  }
}

function mapStateToProps({ posts, byCategory }) {
  return {
    posts,
    postsByCategory: byCategory,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
