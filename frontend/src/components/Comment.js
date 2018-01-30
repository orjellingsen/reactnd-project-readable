import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import { removeComment, } from '../middleware/comments'

import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography/Typography'

const styles = {
  card: {
    width: '90%',
    margin: '15px auto 15px auto',
    padding: '5px',
  },
  cardHeader: {
    backgroundColor: '#E8EAF6',
  },
}

class Comment extends Component {
  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object,
    classes: PropTypes.object,
  }

  handleDelete = id => {
    this.props.deleteComment(id)
  }

  handleEdit = e => {

  }

  render() {
    const { comment, classes } = this.props
    return(
      <div>
        {comment?
          <Card className={classes.card}>
            <CardContent>
              <Typography type='body2'>{comment.body}</Typography>
              <Typography type='caption'>{`${moment(comment.timestamp).fromNow()} by ${comment.author} (Score: ${comment.voteScore})`}</Typography>
            </CardContent>
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={(e) => this.handleDelete(comment.id)}>Delete</button>
          </Card>
        : ''}
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (id) => dispatch(removeComment(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Comment))