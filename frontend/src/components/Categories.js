import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = {
  categoryTabs: {
  },
}

class Categories extends Component {
  render() {
    const { classes, categories, } = this.props
    return (
      <Tabs
        className={classes.categoryTabs}
        value='0'
        indicatorColor='primary'
        centered
      >
        <Tab label='All' disabled />
        {categories.map ((category) => (
          <Tab key={category.name} label={category.name} />
        ))}
      </Tabs>
    )
  }
}


export default withStyles(styles)(Categories)
