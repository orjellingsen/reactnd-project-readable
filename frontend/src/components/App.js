import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchCategories } from '../actions/categories'
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
  }

  render() {
    const { pathname } = this.props.location
    const { darkTheme, newPostOpen, currentPost } = this.state
    return (
      <Container darkTheme={darkTheme} className={darkTheme ? 'pt-dark' : ''}>
        <Header
          darkTheme={darkTheme}
          toggleTheme={this.toggleTheme}
          toggleNewPost={this.toggleNewPost}
          path={pathname}
        />
        <NewPost
          isOpen={newPostOpen}
          toggle={this.toggleNewPost}
          darkTheme={darkTheme}
          currentPost={currentPost}
        />

        <Switch>
          <Route exact path="/" component={ListPosts} />
          <Route exact path="/c/:category" component={ListPosts} />
          <Route
            exact
            path="/post/:postId"
            render={() => <SinglePost handleEditPost={this.handleEditPost} />}
          />
        </Switch>
      </Container>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
