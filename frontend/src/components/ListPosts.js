import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { fetchAllPosts, removePost, fetchPostsByCategory } from '../middleware/posts'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ThumbDown from 'material-ui-icons/ThumbDown'
import ThumbUp from 'material-ui-icons/ThumbUp'
import Comment from 'material-ui-icons/Comment'
import Delete from 'material-ui-icons/Delete'

const styles = {
  card: {
    width: '90%',
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
    const { category, getAllPosts, getPostsByCategory } = this.props
    if(category === 'all') {
      getAllPosts()
    } else {
      getPostsByCategory(category)
    }
  }
  handleDelete = (id) => {
    this.props.deletePost(id)
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
                subheader={`Posted ${moment(post.timestamp).fromNow()} by ${post.author}`}
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
                <IconButton onClick={(e) => this.handleDelete(post.id, e)} aria-label='Delete'>
                  <Delete />
                </IconButton>
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
    getPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    deletePost: (id) => dispatch(removePost(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListPosts))
