import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from '@blueprintjs/core'

import { fetchCategories } from '../actions/categories'

const Categories = ()=> {
  const categories = useSelector(({ categories }) => categories)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchCategories())
  },[])

  return (
    <ButtonGroup>
      {categories &&
        categories.map(category => (
          <Link key={category.name} to={`/c/${category.path}`}>
            <Button icon="tag" text={category.name} />
          </Link>
        ))}
    </ButtonGroup>
  )
}

export default Categories