import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Toaster, Toast, Position } from '@blueprintjs/core'

import { fetchCategories } from '../actions/categories'
import { fetchAllPosts } from '../actions/posts'

import Header from './Header'
import ListPosts from './ListPosts'
import NewPost from './NewPost'
import SinglePost from './SinglePost'

const Container = styled.div`
  padding: 80px 0;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${({ darkTheme }) => (darkTheme ? '#293742' : '#fff')};
`
class App extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
  }

  state = {
    darkTheme: true,
    newPostOpen: false,
    currentPost: null,
  }

  toggleTheme = () => {
    this.setState(() => ({ darkTheme: !this.state.darkTheme }))
  }

  toggleNewPost = () => {
    this.setState(() => ({
      newPostOpen: !this.state.newPostOpen,
      currentPost: null,
    }))
  }

  handleEditPost = currentPost => {
    this.setState(() => ({
      newPostOpen: true,
      currentPost,
    }))
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }

  render() {
    const { categories, post } = this.props
    const { pathname } = this.props.location
    return (
      <Container
        darkTheme={this.state.darkTheme}
        className={this.state.darkTheme ? 'pt-dark' : ''}
      >
        <Header
          darkTheme={this.state.darkTheme}
          toggleTheme={this.toggleTheme}
          toggleNewPost={this.toggleNewPost}
          path={pathname}
        />
        <Toaster position={Position.BOTTOM_RIGHT} canEscapeKeyClear={true}>
          {this.props.toasts.map((toast, index) => (
            <Toast key={index} {...toast} />
          ))}
        </Toaster>
        <NewPost
          isOpen={this.state.newPostOpen}
          toggle={this.toggleNewPost}
          darkTheme={this.state.darkTheme}
          currentPost={this.state.currentPost}
        />

        <Switch>
          <Route exact path="/" component={ListPosts} />
          {categories.map(category => (
            <Route
              key={category.path}
              exact
              path={`/${category.path}`}
              render={() => <ListPosts category={category.path} />}
            />
          ))}

          <Route
            exact
            path="/post/:postId"
            render={() => (
              <SinglePost handleEditPost={this.handleEditPost} post={post} />
            )}
          />
        </Switch>
      </Container>
    )
  }
}

function mapStateToProps({ categories, posts, toasts }, { location }) {
  return {
    categories,
    post: posts.find(post => post.id === location.pathname.substr(6)),
    toasts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
