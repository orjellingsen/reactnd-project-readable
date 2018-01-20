import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import { Link } from 'react-router-dom'

const styles = {
}

class Categories extends Component {
  render() {
    const { classes, categories, } = this.props
    return (
      <Tabs
        className={classes.categoryTabs}
        indicatorColor='primary'
        centered
        value='All'
      >
        <Tab
          label='All'
          value='All'
          component={Link}
          to='/'
        />
        {categories.map ((category) => (
          <Tab
            key={category.name}
            label={category.name}
            component={Link}
            to={category.path}
          />
        ))}
      </Tabs>
    )
  }
}

export default withStyles(styles)(Categories)
