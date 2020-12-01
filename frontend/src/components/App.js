import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './Header'
import PostList from './PostList'
import PostForm from './PostForm'
import PostSingle from './PostSingle'
import PageNotFound from './PageNotFound'

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true)
  const [postFormOpen, setPostFormOpen] = useState(false)
  const [currentPost, setCurrentPost]= useState(null)

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  const toggleForm = () => {
    setCurrentPost(null)
    setPostFormOpen(!postFormOpen)
  }

  const handleEditPost = currentPost => {
    setCurrentPost(currentPost)
    setPostFormOpen(true)
  }

  return (
    <Context.Provider value={{darkTheme, postFormOpen, currentPost, toggleTheme, toggleForm, handleEditPost}}>
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

export const Context = React.createContext()
export default App
