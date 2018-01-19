import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import Categories from './Categories'
import ListPosts from './ListPosts'
import EditPost from './EditPost'

import { withStyles } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'
import 'typeface-roboto'

const styles = {
  root: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Route exact path='/' render={() => (
          <Reboot>
            <Header />
            <Categories />
            <ListPosts />
          </Reboot>
        )}/>
        <Route exact path='/category' render={() => (
          <Reboot>
            <Header />
            <Categories />
          </Reboot>
        )}/>
        <Route exact path='/post' render={() => (
          <Header />
        )}/>
        <Route exact path='/new' render={() => (
          <Reboot>
            <Header editPost='true' />
            <EditPost />
          </Reboot>
        )}/>
      </div>
    )
  }
}

export default withStyles(styles)(App)