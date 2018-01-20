import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchCategories } from '../middleware/categories'
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
  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const { classes, categories, } = this.props
    return (
      <div className={classes.root}>
        <Route exact path='/' render={() => (
          <Reboot>
            <Header />
            <Categories category='all' categories={categories} />
            <ListPosts category='all' />
          </Reboot>
        )}/>

          <Route exact path='/react' render={() => (
            <Reboot>
              <Header />
              <Categories category='react' categories={categories} />
              <ListPosts category='react' />
            </Reboot>
          )}/>

          <Route exact path='/redux' render={() => (
            <Reboot>
              <Header />
              <Categories category='redux' categories={categories} />
              <ListPosts category='redux' />
            </Reboot>
          )}/>

          <Route exact path='/udacity' render={() => (
            <Reboot>
              <Header />
              <Categories category='udacity' categories={categories} />
              <ListPosts />
            </Reboot>
          )}/>

        <Route exact path='/category' render={() => (
          <Reboot>
            <Header />
            <Categories categories={categories} />
          </Reboot>
        )}/>

        <Route exact path='/post' render={() => (
          <Header />
        )}/>

        <Route exact path='/new' render={() => (
          <Reboot>
            <Header editPost='true' />
            <EditPost categories={categories} />
          </Reboot>
        )}/>
      </div>
    )
  }
}

function mapStateToProps ({ categories, }) {
  return {
    categories: _.values(categories.categoryList),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App)))
