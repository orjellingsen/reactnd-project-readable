import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import { Link } from 'react-router-dom'

const styles = {
}

class Categories extends Component {
  render() {
    const { classes, categories, currentCategory} = this.props
    return (
      <Tabs
        className={classes.categoryTabs}
        indicatorColor='primary'
        centered
        value={currentCategory}
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
