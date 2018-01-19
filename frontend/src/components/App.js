import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from '../middleware/categories'
import { fetchAllPosts } from '../middleware/posts'
import _ from 'lodash'


import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import Reboot from 'material-ui/Reboot'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

// App Bar
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Typography from 'material-ui/Typography'

// Category tabs
import Tabs, { Tab } from 'material-ui/Tabs'

// Card
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
  card: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: '50px 0 10px 0'
  }
};

class App extends Component {
  componentWillMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }

  render() {
    const { categories, posts, classes } = this.props

    return (
      <div className={classes.root}>
      <Reboot>
        <Grid container spacing={24}>
            <AppBar position='static'>
              <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.flex} type="title" color="inherit">
                  READABLE
                </Typography>
              </Toolbar>

              <Toolbar>
                <Tabs
                  value
                  onChange
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  {categories.map ((category) => (
                    <Tab key={category.name} label={category.name} />
                  ))}
                </Tabs>
              </Toolbar>
            </AppBar>

            {posts.map (
              (post) => (
                <Card className={classes.card}>
                  <CardHeader
                    title={post.title}
                    subheader={post.timestamp}
                  />
                </Card>
              )
            )}
        </Grid>
      </Reboot>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
      categories: _.values(categories.categoryList),
      posts: _.values(posts.allPosts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
