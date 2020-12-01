import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Elevation, Button } from '@blueprintjs/core'

import { fetchAllPosts } from '../actions/posts'
import { fetchPostsByCategory } from '../actions/posts'
import Vote from './Vote'
import Options from './Options'

const PostList = ({ posts, getAllPosts, getPostsByCategory, match }) => {
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  useEffect(()=> {
    if (category === 'all') getAllPosts()
  }, [])

  useEffect(()=>{
    console.log(match.params)
    const { category: newCategory } = match.params
    if (newCategory && newCategory !== 'all') {
      getPostsByCategory(newCategory)
      setCategory(newCategory)
    } else {
      getAllPosts()
      setCategory('all')
    }
  }, [match])

  const sortPosts = newSortBy => {
    if (sortBy !== newSortBy) {
      setSortBy(newSortBy)
    }
  }

  return (
    <div className="posts">
      <div className="sort">
        <h4 className="sort-text">Sort:</h4>
        <Button
          disabled={sortBy === 'date' ? true : false}
          onClick={() => sortPosts('date')}
        >
          Date
        </Button>
        <Button
          disabled={sortBy === 'score' ? true : false}
          onClick={() => sortPosts('score')}
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

PostList.propTypes = {
  getPostsByCategory: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
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
