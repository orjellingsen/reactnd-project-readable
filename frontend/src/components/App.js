import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { fetchCategories } from '../actions/categories'
import { fetchAllPosts } from '../actions/posts'

import Header from './Header'
import Categories from './Categories'
import ListPosts from './ListPosts'
import EditPost from './EditPost'
import SinglePost from './SinglePost'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
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
          <Header path={pathname} />
          <Switch>
            <Route exact path='/' render={() => (
              <div>
                <Categories category='all' />
                <ListPosts />
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
              <div>
                <Link to='/'>
                  <Button className='all-categories'>View all categories</Button>
                </Link>
                <SinglePost path={pathname} />
              </div>
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