import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from '../middleware/categories';
import { fetchAllPosts } from '../middleware/posts'
import _ from 'lodash'

class App extends Component {
  componentWillMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <h1>Readable</h1>
        <h2>Categories</h2>
        <ul>
          {categories.map(
              (category) => (
                  <li key={category.name} className="category">{category.name}</li>
              )
          )}
        </ul>
        <h2>Posts</h2>
          {posts.map (
            (post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <ul>
                  <li>Time: {post.timestamp}</li>
                  <li>ID: {post.id}</li>
                  <li>Author: {post.author}</li>
                  <li>Category: {post.category}</li>
                  <li>Vote Score: {post.voteScore}</li>
                  <li>Comments: {post.commentCount}</li>
                </ul>
              </div>
            )
          )}
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
      categories: _.values(categories.categoryList),
      posts: _.values(posts.allPosts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
