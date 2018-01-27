import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
    paddingRight: '10px',
  }
}

class Header extends Component {
  static propTypes = {
    path: PropTypes.string,
    classes: PropTypes.object,
  }

  render() {
    const { classes, path, } = this.props
    return (
      <AppBar className={classes.appBar} color='primary' position='static'>
        <Toolbar>
          <Typography className={classes.flex} type='title' color='inherit'>
            READABLE
          </Typography>
          {(path === '/new' || path.includes('/update')) ?
            <Link to='/'>
              <IconButton color='contrast'>
                <Cancel /><Typography type="button">Cancel</Typography>
              </IconButton>
            </Link>
          :
            <Link to='/new'>
              <IconButton color='contrast'>
                <AddCircle /><Typography type="button">New</Typography>
              </IconButton>
            </Link>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
