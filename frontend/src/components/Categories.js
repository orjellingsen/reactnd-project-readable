import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  }

  render() {
    const { categories } = this.props
    return (
      <ul>
        <li>
          <Link to="/" />
        </li>
        {categories.map(category => (
          <li key={category.name}>
            <Link to={category.path}>{category.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps({ categories: { categoryList } }) {
  return {
    categories: categoryList,
  }
}

export default withRouter(connect(mapStateToProps)(Categories))
