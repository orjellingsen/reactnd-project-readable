import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { fetchCategories } from '../middleware/categories'
import { fetchAllPosts } from '../middleware/posts'

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
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    classes: PropTypes.object,
  }

  componentWillMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }

  render() {
    const { classes, categories, } = this.props
    const { pathname } = this.props.location
    return (
      <div className={classes.root}>
        <Reboot>
          <Header path={pathname} />
          <Switch>
            <Route exact path='/' render={() => (
              <div>
                <Categories category='all' categories={categories} />
                <ListPosts category='all' />
              </div>
            )}/>

            {categories.map((category) => (
              <Route key={category.path} exact path={`/${category.path}`} render={() => (
                <div>
                  <Categories category={category.path} />
                  <ListPosts category={category.path} />
                </div>
              )}/>
            ))}

            <Route exact path='/post/:postId' render={() => (
              <ListPosts category='singlePost' path={pathname} />
            )}/>

            <Route exact path='/new' render={() => (
              <div>
                <EditPost path={pathname} categories={categories} />
              </div>
            )}/>

            <Route exact path='/update/:postId' render={() => (
              <div>
                <EditPost path={pathname} categories={categories} />
              </div>
            )}/>
          </Switch>
        </Reboot>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: _.values(categories.categoryList),
    posts: _.values(_.orderBy(posts.allPosts, 'timestamp', 'desc')),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App)))