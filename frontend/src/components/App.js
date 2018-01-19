import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import ListPosts from './ListPosts'

import { withStyles } from 'material-ui/styles'
import 'typeface-roboto'

const styles = {
  root: {
    width: '100%',
  },
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div className={classes.root}>
            <Header />
            <ListPosts />
          </div>
        )}/>
        <Route exact path='/category' render={() => (
          <Header />
        )}/>
        <Route exact path='/post' render={() => (
          <Header />
        )}/>
        <Route exact path='/add' render={() => (
          <Header />
        )}/>
      </div>
    )
  }
}

export default withStyles(styles)(App)
