import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import { Link } from 'react-router-dom'

const styles = {
  categoryTabs: {
  },
}

class Categories extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes, categories, currentCategory } = this.props
    const { value } = this.state
    return (
      <Tabs
        className={classes.categoryTabs}
        value={currentCategory}
        onChange={this.handleChange}
        indicatorColor='primary'
        centered
      >
        <Tab
          label='All'
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
