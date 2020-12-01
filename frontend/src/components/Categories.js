import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'

import { fetchCategories } from '../actions/categories'

const Categories = ()=> {
  const categories = useSelector(({ categories }) => categories)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchCategories())
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

export default Categories