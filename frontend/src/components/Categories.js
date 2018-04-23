import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Tabs, { Tab } from 'material-ui/Tabs'
import { Link } from 'react-router-dom'

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  }

  render() {
    const { categories, category} = this.props
    return (
      <Tabs
        indicatorColor='primary'
        centered
        value={category}
      >
        <Tab
          label='All'
          value='all'
          component={Link}
          to='/'
        />
        {categories.map ((category) => (
          <Tab
            key={category.name}
            label={category.name}
            value={category.path}
            component={Link}
            to={category.path}
          />
        ))}
      </Tabs>
    )
  }
}

function mapStateToProps ({ categories: { categoryList } }) {
  return {
    categories: categoryList
  }
}

export default withRouter(connect(
  mapStateToProps
)((Categories)))