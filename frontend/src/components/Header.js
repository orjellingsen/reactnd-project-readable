import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = {
  flex: {
    flex: 1,
    textAlign: 'center',
  },
  appBar: {
    backgroundColor: '#C62828',
  },
}

class Header extends Component {
  render() {
    const { classes, } = this.props
    return (
      <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <Typography className={classes.flex} type='title' color='inherit'>
            READABLE
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
