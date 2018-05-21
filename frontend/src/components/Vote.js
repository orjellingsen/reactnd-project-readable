import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'

import { registerVote } from '../actions/posts'
import { registerVoteComment } from '../actions/comments'

class Vote extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['post', 'comment']).isRequired,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    score: PropTypes.number.isRequired,
    votePost: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
  }

  static defaultProps = {
    score: 1,
  }

  handleVote = (id, vote, type, parentId) => {
    const { votePost, voteComment } = this.props
    type === 'post' ? votePost(id, vote) : voteComment(id, vote, parentId)
  }

  render() {
    const { id, score, type, parentId } = this.props
    return (
      <div className="vote-score">
        <Button icon="thumbs-up" onClick={() => this.handleVote(id, 'upVote', type, parentId)} />
        <Button>{score}</Button>
        <Button
          icon="thumbs-down"
          onClick={() => this.handleVote(id, 'downVote', type, parentId)}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (id, option) => dispatch(registerVote(id, option)),
    voteComment: (id, option, postId) => dispatch(registerVoteComment(id, option, postId)),
  }
}

export default connect(null, mapDispatchToProps)(Vote)
