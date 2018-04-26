import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Toaster, Toast, Position } from '@blueprintjs/core'

import { fetchCategories } from '../actions/categories'
import { fetchAllPosts } from '../actions/posts'

import Header from './Header'
import ListPosts from './ListPosts'
import EditPost from './EditPost'
import SinglePost from './SinglePost'

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
        <Toaster position={Position.BOTTOM_RIGHT} canEscapeKeyClear={true}>
          {this.props.toasts.map((toast, index) => (
            <Toast key={index} {...toast} />
          ))}
        </Toaster>
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
      </div>
    )
  }
}

function mapStateToProps({ categories, posts: { allPosts = [] }, toasts }) {
  return {
    categories,
    posts: allPosts.sort(({ timestamp }) => timestamp).reverse(),
    toasts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
