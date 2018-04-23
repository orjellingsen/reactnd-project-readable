import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import moment from 'moment'
import PropTypes from 'prop-types'

import { fetchPost, removePost, registerVote } from '../actions/posts'
import Comments from './Comments'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ThumbDown from 'material-ui-icons/ThumbDown'
import ThumbUp from 'material-ui-icons/ThumbUp'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/Edit'
import Button from 'material-ui/Button'

const styles = {
  card: {
    width: '90%',
    margin: '15px auto 15px auto',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  cardHeader: {
    backgroundColor: '#E8EAF6',
  },
  hidden: {
    display: 'none',
  },
  commentIcon: {
    marginRight: '5px',
  },
  rightIcon: {
    marginLeft: '5px',
  },
  button: {
    marginRight: '10px',
  },
}

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    classes: PropTypes.object,
  }

  state = {
    redirect: false,
    edit: false,
  }

  handleDelete = (id) => {
    this.props.deletePost(id)
    this.setState({ redirect: true })
  }

  handleEdit = (post) => {
    this.setState({ edit: true })
  }

  handleVote = (id, vote) => {
    this.props.votePost(id, vote)
  }

  render() {
    const { classes, post, } = this.props
    const { redirect, edit } = this.state

    if (redirect) {
      return <Redirect to='/'/>
    }

    if (edit) {
      return (
        <Redirect to={`/update/${post.id}`} />
      )
    }

    return (
      <div>
        {post?
          <Card className={classes.card}>
            <CardHeader
              title={post.title}
              subheader={`Posted ${moment(post.timestamp).fromNow()} by ${post.author} (${post.commentCount} comments, ${post.voteScore} votes)`}
              className={classes.cardHeader}
              color='accent'
            />

            {singlePost?
              <CardContent>
                <Typography component='p'>{post.body}</Typography>
              </CardContent>
            : ''}

            {singlePost?
              <div>
                <CardActions>
                  <IconButton onClick={(e) => this.handleVote(post.id, 'upVote')} aria-label='Like'>
                    <ThumbUp />
                  </IconButton>
                  <IconButton>{post.voteScore}</IconButton>
                  <IconButton onClick={(e) => this.handleVote(post.id, 'downVote')} aria-label='Dislike'>
                    <ThumbDown />
                  </IconButton>
                  <div className={classes.flexGrow} />
                  <Button onClick={(e) => this.handleEdit(post, e)} className={classes.button} raised color='primary'>
                    Edit
                    <Edit className={classes.rightIcon} />
                  </Button>
                  <Button onClick={(e) => this.handleDelete(post.id, e)} className={classes.button} raised color='primary'>
                      Delete
                      <Delete className={classes.rightIcon} />
                  </Button>
                </CardActions>

                <Comments postId={post.id} />
              </div>
            : ''}
          </Card>
        :
          ''
        }
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    currentPost: posts.post,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    deletePost: (id) => dispatch(removePost(id)),
    votePost: (id, option) => dispatch(registerVote({id, option})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post))