import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

import { fetchCategories } from '../actions/categories'

const Categories = ({getCategories, categories})=> {
  useEffect(()=> {
    getCategories()
  },[])

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

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
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
