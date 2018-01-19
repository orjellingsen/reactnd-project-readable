import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import Categories from './Categories'
import ListPosts from './ListPosts'

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
    return (
      <div className='app'>
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
        <Route exact path='/add' render={() => (
          <Header />
        )}/>
      </div>
    )
  }
}

export default App
