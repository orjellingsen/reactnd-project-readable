import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'

import { registerVote } from '../actions/posts'
import { registerVoteComment } from '../actions/comments'

const Vote = ({ id, score = 1, type, parentId, votePost, voteComment }) => {
  const handleVote = (voteType) => {
    type === 'post' ? votePost(id, voteType) : voteComment(id, voteType, parentId)
  }

  return (
    <div className="vote-score">
      <Button icon="thumbs-up" onClick={() => handleVote('upVote')} />
      <Button>{score}</Button>
      <Button
        icon="thumbs-down"
        onClick={() => handleVote('downVote')}
      />
    </div>
  )
}

Vote.propTypes = {
  type: PropTypes.oneOf(['post', 'comment']).isRequired,
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  score: PropTypes.number.isRequired,
  votePost: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (id, option) => dispatch(registerVote(id, option)),
    voteComment: (id, option, postId) => dispatch(registerVoteComment(id, option, postId)),
  }
}

export default connect(null, mapDispatchToProps)(Vote)
