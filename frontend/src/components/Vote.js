import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'

import { registerVote } from '../actions/posts'
import { registerVoteComment } from '../actions/comments'

const Vote = ({ id, score = 1, type, parentId }) => {
  const dispatch = useDispatch()

  const handleVote = (voteType) => {
    if(type === 'post') dispatch(registerVote(id, voteType))
    else dispatch(registerVoteComment(id, voteType, parentId))
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

export default Vote
