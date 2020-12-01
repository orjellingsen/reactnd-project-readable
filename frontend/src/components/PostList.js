import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Card, Elevation, Button } from '@blueprintjs/core'

import { fetchAllPosts } from '../actions/posts'
import { fetchPostsByCategory } from '../actions/posts'
import Vote from './Vote'
import Options from './Options'

const PostList = ({ match }) => {
  const posts = useSelector(({ posts }) => posts)
  const dispatch = useDispatch()

  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  useEffect(()=> {
    if (category === 'all') dispatch(fetchAllPosts())
  }, [])

  useEffect(()=>{
    console.log(match.params)
    const { category: newCategory } = match.params
    if (newCategory && newCategory !== 'all') {
      dispatch(fetchPostsByCategory(newCategory))
      setCategory(newCategory)
    } else {
      dispatch(fetchAllPosts())
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

export default PostList
