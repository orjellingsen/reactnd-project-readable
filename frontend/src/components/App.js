import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './Header'
import PostList from './PostList'
import PostForm from './PostForm'
import PostSingle from './PostSingle'
import PageNotFound from './PageNotFound'

class App extends Component {
  toggleTheme = () => {
    this.setState(() => ({ darkTheme: !this.state.darkTheme }))
  }

  toggleForm = () => {
    this.setState(() => ({
      postFormOpen: !this.state.postFormOpen,
      currentPost: null,
    }))
  }

  handleEditPost = currentPost => {
    this.setState(() => ({
      postFormOpen: true,
      currentPost,
    }))
  }

  state = {
    darkTheme: true,
    postFormOpen: false,
    currentPost: null,
    toggleTheme: this.toggleTheme,
    toggleForm: this.toggleForm,
    handleEditPost: this.handleEditPost,
  }

  render() {
    const { darkTheme, currentPost, toggleForm } = this.state
    return (
      <Context.Provider value={this.state}>
        <div className={darkTheme ? 'container dark pt-dark' : 'container'}>
          <Header />
          <PostForm toggleForm={toggleForm} currentPost={currentPost} />

          <Switch>
            <Route exact path="/" component={PostList} />
            <Route exact path="/c/:category" component={PostList} />
            <Route exact path="/post/:postId" component={PostSingle} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Context.Provider>
    )
  }
}

export const Context = React.createContext()
export default App
