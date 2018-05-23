import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Elevation, Button } from '@blueprintjs/core'

import { fetchAllPosts } from '../actions/posts'
import { fetchPostsByCategory } from '../actions/posts'
import Vote from './Vote'
import Options from './Options'

class PostList extends Component {
  static propTypes = {
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
  }

  state = {
    category: 'all',
    sortBy: 'date',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getAllPosts, getPostsByCategory, match: { params: { category = 'all' } } } = nextProps
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

  sortPosts = sortBy => {
    if (sortBy !== this.state.sortBy) {
      this.setState(() => ({ sortBy }))
    }
  }

  componentDidMount() {
    if (this.state.category === 'all') {
      this.props.getAllPosts()
    }
  }

  render() {
    const { posts } = this.props
    const { sortBy } = this.state
    return (
      <div className="posts">
        <div className="sort">
          <h4 className="sort-text">Sort:</h4>
          <Button
            disabled={sortBy === 'date' ? true : false}
            onClick={() => this.sortPosts('date')}
          >
            Date
          </Button>
          <Button
            disabled={sortBy === 'score' ? true : false}
            onClick={() => this.sortPosts('score')}
          >
            Score
          </Button>
        </div>
        {posts
          .sort(
            (a, b) =>
              sortBy === 'date'
                ? b.timestamp - a.timestamp
                : sortBy === 'score' ? b.voteScore - a.voteScore : null
          )
          .map(post => (
            <Card key={post.id} className="post" interactive={true} elevation={Elevation.ONE}>
              <Vote type="post" id={post.id} score={post.voteScore} />
              <Link style={{ textDecoration: 'none' }} key={post.id} to={`/post/${post.id}`}>
                <div>
                  <h5>{post.title}</h5>
                  <p className="pt-text-muted author-text">
                    Posted {moment(post.timestamp).fromNow()} by {post.author} (comments:{' '}
                    {post.commentCount})
                  </p>
                  <p className="pt-text">{post.body}</p>
                </div>
              </Link>
              <Options type="post" data={post} />
            </Card>
          ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
