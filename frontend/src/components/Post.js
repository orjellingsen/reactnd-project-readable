import React, { Component } from 'react'
import moment from 'moment'

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
    margin: '15px auto 15px auto',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  cardHeader: {
    backgroundColor: '#C5CAE9',
  },
  hidden: {
    display: 'none',
  },
  commentIcon: {
    marginRight: '5px',
  }
}

class Post extends Component {
  render() {
    const { classes, post, singlePost } = this.props
    console.log(singlePost)
    return (
      <div>
        {post?
          <Card key = {post.id} className={classes.card}>
            <CardHeader
              title={post.title}
              subheader={`Posted ${moment(post.timestamp).fromNow()} by ${post.author}`}
              className={classes.cardHeader}
              color='accent'
            />
            {singlePost?
              <CardContent>
                <Typography component='p'>{post.body}</Typography>
              </CardContent>
            : ''}

            <CardActions>
              <IconButton aria-label='Like'>
                <ThumbUp />
              </IconButton>
              <IconButton>{post.voteScore}</IconButton>
              <IconButton aria-label='Dislike'>
                <ThumbDown />
              </IconButton>
              <div className={classes.flexGrow} />
              {singlePost?
              <IconButton onClick={(e) => this.handleDelete(post.id, e)} aria-label='Delete'>
                <Delete color='primary' />
              </IconButton>
              : ''}
              <IconButton color='primary' aria-label='Comment'>
                <Comment color='primary' className={classes.commentIcon} />{post.commentCount}
              </IconButton>
            </CardActions>
          </Card>
        :
          ''
        }
      </div>
    )
  }
}

export default withStyles(styles)(Post)