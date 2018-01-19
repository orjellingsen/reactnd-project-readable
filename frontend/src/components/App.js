import React, { Component } from 'react'
import { connect } from 'react-redux'
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

// Icons
import ThumbDown from 'material-ui-icons/ThumbDown'
import ThumbUp from 'material-ui-icons/ThumbUp'
import Comment from 'material-ui-icons/Comment'

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
  appBar: {
    marginBottom: 10,
    backgroundColor: '#3F51B5',
  },
  card: {
    width: '90%',
    margin: '10px auto 10px auto'
  },

  flexGrow: {
    flex: '1 1 auto',
  },
  showPosts: {
    margin: '0 auto 30px auto',
    width: '90%',
  },
  categories: {
    backgroundColor: '#5C6BC0',
  }
}

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
            <AppBar className={classes.appBar} position='static'>
              <Toolbar>
                <IconButton className={classes.menuButton} color='contrast' aria-label='Menu'>
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.flex} type='title' color='inherit'>
                  READABLE
                </Typography>
              </Toolbar>

              <Toolbar className={classes.categories}>
                <Tabs
                  value='0'
                  indicatorColor='primary'
                  textColor='inherit'
                  centered
                >
                  <Tab label='All' />
                  {categories.map ((category) => (
                    <Tab key={category.name} label={category.name} />
                  ))}
                </Tabs>
              </Toolbar>
            </AppBar>

            <Typography className={classes.showPosts} component='p'>
              Showing all posts:
            </Typography>

            {posts.map (
              (post) => (
                <Card key = {post.id} className={classes.card}>
                  <CardHeader
                    title={post.title}
                    subheader={post.timestamp}
                  />

                  <CardContent>
                    <Typography component='p'>{post.body}</Typography>
                  </CardContent>

                  <CardActions>
                    <IconButton aria-label='Like'>
                      <ThumbUp />
                    </IconButton>
                    <IconButton>{post.voteScore}</IconButton>
                    <IconButton aria-label='Dislike'>
                      <ThumbDown />
                    </IconButton>
                    <div className={classes.flexGrow} />
                    <IconButton aria-label='Comment'>
                      <Comment /> ({post.commentCount})
                    </IconButton>
                  </CardActions>
                </Card>
              )
            )}
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
