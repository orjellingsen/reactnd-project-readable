import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchAllPosts } from '../middleware/posts'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ThumbDown from 'material-ui-icons/ThumbDown'
import ThumbUp from 'material-ui-icons/ThumbUp'
import Comment from 'material-ui-icons/Comment'

const styles = {
  card: {
    width: '60%',
    margin: '15px auto 15px auto'
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  cardHeader: {
    backgroundColor: '#C5CAE9'
  },
}

class ListPosts extends Component {
  componentWillMount() {
    this.props.getAllPosts()
  }

  render() {
    const { classes, posts, } = this.props
    return (
      <div>
        {posts.map (
          (post) => (
            <Card key = {post.id} className={classes.card}>
              <CardHeader
                title={post.title}
                subheader={post.author}
                className={classes.cardHeader}
                color='accent'
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
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: _.values(posts.allPosts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(fetchAllPosts()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListPosts))
