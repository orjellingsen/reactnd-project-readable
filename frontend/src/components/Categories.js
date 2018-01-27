import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import { Link } from 'react-router-dom'

const styles = {
}

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    classes: PropTypes.object,
  }

  render() {
    const { classes, categories, category} = this.props
    return (
      <Tabs
        className={classes.categoryTabs}
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

export default withStyles(styles)(Categories)
