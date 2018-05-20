import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { Card, Elevation } from '@blueprintjs/core'

import { fetchAllPosts } from '../actions/posts'
import { fetchPostsByCategory } from '../actions/posts'
import Vote from './Vote'

const Posts = styled.div`
  width: 90%;
  margin: 0 auto;
`

const AuthorText = styled.p`
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: -10px;
  font-size: 12px;
`

class PostList extends Component {
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
      <Posts>
        {this.props.posts.map(post => (
          <Card
            key={post.id}
            className="post"
            interactive={true}
            elevation={Elevation.ONE}
          >
            <Vote type="post" id={post.id} score={post.voteScore} />
            <Link
              style={{ textDecoration: 'none' }}
              key={post.id}
              to={`/post/${post.id}`}
            >
              <div>
                <h5>{post.title}</h5>
                <AuthorText className="pt-text-muted">
                  Posted {moment(post.timestamp).fromNow()} by {post.author}{' '}
                  (comments: {post.commentCount})
                </AuthorText>
                <p className="pt-text">{post.body}</p>
              </div>
            </Link>
          </Card>
        ))}
      </Posts>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
