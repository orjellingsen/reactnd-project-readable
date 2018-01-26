import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import FolderIcon from 'material-ui-icons/Folder'
import ImageIcon from 'material-ui-icons/Image'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
  },
  listItem: {
    widh: '100%'
  }
})

class Footer extends Component {
  render() {
    const { classes } = this.props
    return(
      <List className={classes.root}>
        <ListItem button>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <ListItemText primary="Work" secondary="Jan 28, 2014" />
        </ListItem>
        <Divider inset />
        <ListItem className={classes.listItem} button>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText primary="Vacation vacation vacation" secondary="Jan 20, 2014" />

          <ListItemText primary="Vacation" secondary="Jan 20, 2014" />
        </ListItem>
      </List>
    )
  }
}

export default withStyles(styles)(Footer);