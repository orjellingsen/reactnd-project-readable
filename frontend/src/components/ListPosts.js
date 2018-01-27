import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchAllPosts, fetchPostsByCategory, fetchPost } from '../middleware/posts'
import Post from './Post'

import Button from 'material-ui/Button'

class ListPosts extends Component {
  state = {
    sort: 'timestamp',
  }
  componentWillMount() {
    const { category, getAllPosts, getPost, path, getPostsByCategory, } = this.props
    if(category === 'all') {
      getAllPosts()
    } else if (category === 'singlePost'){
      const postId = path.substr(6)
      getPost(postId)
    } else {
      getPostsByCategory(category)
    }
  }

  render() {
    const { posts, post, category, path, } = this.props
    return (
      <div>
        {(category !== 'singlePost')?
          posts.map (
              (post) => (
                <Link key={post.id} to={`/post/${post.id}`}>
                  <Post post={post} />
                </Link>
            ))
        :
          <div>
            <Link to='/'>
              <Button className='all-categories'>View all categories</Button>
            </Link>
            <Post singlePost='true' post={post} path={path} />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ posts, }) {
  return {
    posts: _.values(_.orderBy(posts.allPosts, 'timestamp', 'desc')),
    post: posts.post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(fetchAllPosts()),
    getPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    getPost: (id) => dispatch(fetchPost(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)