import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchCategories } from '../middleware/categories'

import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = {
  categoryTabs: {
  },
}

class Categories extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

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

function mapStateToProps ({ categories, }) {
  return {
      categories: _.values(categories.categoryList),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Categories))
