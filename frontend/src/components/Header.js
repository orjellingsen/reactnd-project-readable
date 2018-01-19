import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchCategories } from '../middleware/categories'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = {
  flex: {
    flex: 1,
  },
  appBar: {
    marginBottom: 30,
    backgroundColor: '#C62828',
  },
  categories: {
    backgroundColor: '#D32F2F',
  },
  categoryTabs: {
    margin: 0
  },
}

class Header extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const { categories, classes } = this.props
    return (
      <AppBar className={classes.appBar} position='static'>
      <Toolbar>
        <Typography className={classes.flex} type='title' color='inherit'>
          READABLE
        </Typography>
      </Toolbar>

      <Toolbar className={classes.categories}>
        <Tabs
          className={classes.categoryTabs}
          value='0'
          indicatorColor='#E57373'
          textColor='inherit'
          centered
        >
          <Tab label='All' disabled />
          {categories.map ((category) => (
            <Tab key={category.name} label={category.name} />
          ))}
        </Tabs>
      </Toolbar>
      </AppBar>
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
)(withStyles(styles)(Header))
