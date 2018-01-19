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
    marginBottom: 30,
    backgroundColor: '#C62828',
  },
  card: {
    width: '100%',
    margin: '15px auto 15px auto'
  },

  flexGrow: {
    flex: '1 1 auto',
  },
  categories: {
    backgroundColor: '#D32F2F',
  },
  categoryTabs: {
    margin: 0
  },
  cardHeader: {
    backgroundColor: '#FFEBEE'
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

            {posts.map (
              (post) => (
                <Card key = {post.id} className={classes.card}>
                  <CardHeader
                    title={post.title}
                    subheader={post.author}
                    className={classes.cardHeader}
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
