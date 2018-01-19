import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui-icons/AddCircle'
import Cancel from 'material-ui-icons/Cancel'

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
    const { classes, editPost } = this.props
    return (
      <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <Typography className={classes.flex} type='title' color='inherit'>
            READABLE
          </Typography>
          {!editPost ?
          <Link to='/new'>
            <IconButton color='contrast'>
            <AddCircle /><Typography type="button">New</Typography>
            </IconButton>
          </Link>
          :
          <Link to='/'>
            <IconButton color='contrast'>
            <Cancel /><Typography type="button">Cancel</Typography>
            </IconButton>
          </Link>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
