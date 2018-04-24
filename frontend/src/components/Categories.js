import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  }

  render() {
    const { categories } = this.props
    return (
      <Fragment>
        {categories.map(category => (
          <Link to={`/${category.path}`}>
            <Button key={category.name} icon="tag" text={category.name} />
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

export default withRouter(connect(mapStateToProps)(Categories))
