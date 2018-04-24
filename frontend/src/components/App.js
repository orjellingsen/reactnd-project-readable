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
import Footer from './Footer'

class App extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }

  render() {
    const { categories } = this.props
    const { pathname } = this.props.location
    return (
      <div className="app pt-dark">
        <Header path={pathname} />
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
            render={() => <SinglePost path={pathname} />}
          />

          <Route
            exact
            path="/new"
            render={() => <EditPost path={pathname} categories={categories} />}
          />

          <Route
            exact
            path="/update/:postId"
            render={() => <EditPost path={pathname} categories={categories} />}
          />
        </Switch>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts: _.values(_.orderBy(posts.allPosts, 'timestamp', 'desc')),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
