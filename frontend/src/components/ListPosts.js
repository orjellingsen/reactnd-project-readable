import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Elevation } from '@blueprintjs/core'

import { fetchPostsByCategory } from '../actions/posts'

class ListPosts extends Component {
  static propTypes = {
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array,
    category: PropTypes.string,
  }

  static defaultProps = {
    category: 'all',
  }

  state = {
    posts: [],
  }

  componentDidMount() {
    const { getPostsByCategory, category } = this.props
    if (category === 'all') {
      return
    } else {
      console.log(category)
      getPostsByCategory(category)
    }
  }

  render() {
    const { postsByCategory, category } = this.props
    postsByCategory && console.log(postsByCategory[category])
    return (
      <div>
        {this.props.posts.map(post => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <Card className="post" interactive={true} elevation={Elevation.ONE}>
              <h5>{post.title}</h5>
              <p>
                Posted {moment(post.timestamp).fromNow()} by {post.author} ({
                  post.commentCount
                }{' '}
                comments, {post.voteScore} votes)
              </p>
            </Card>
          </Link>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts: { allPosts = [], byCategory } }) {
  return {
    // TODO: move sorting into the class with state
    posts: allPosts.sort(({ timestamp }) => timestamp),
    postsByCategory: byCategory,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
