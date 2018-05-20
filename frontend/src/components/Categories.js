import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

const Categories = ({ categories }) => (
  <Fragment>
    {categories.map(category => (
      <Link key={category.name} to={`/c/${category.path}`}>
        <Button icon="tag" text={category.name} />
      </Link>
    ))}
  </Fragment>
)

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default connect(({ categories }) => ({ categories }))(Categories)
