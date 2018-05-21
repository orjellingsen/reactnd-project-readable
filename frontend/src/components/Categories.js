import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

import { fetchCategories } from '../actions/categories'

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <Fragment>
        {categories &&
          categories.map(category => (
            <Link key={category.name} to={`/c/${category.path}`}>
              <Button icon="tag" text={category.name} />
            </Link>
          ))}
      </Fragment>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
