import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import styled from 'styled-components'
import Settings from './Settings'
import Vote from './Vote'

const StyledComment = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr auto;
  grid-gap: 20px;
`

const AuthorText = styled.p`
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: -10px;
  font-size: 12px;
`

const Comment = ({ comment }) => (
  <Fragment>
    {comment && (
      <StyledComment>
        <Vote
          type="comment"
          id={comment.id}
          score={comment.voteScore}
          parentId={comment.parentId}
        />
        <div>
          <p>{comment.body}</p>
          <AuthorText className="pt-text-muted">{`${moment(
            comment.timestamp
          ).fromNow()} by ${comment.author}`}</AuthorText>
        </div>
        <Settings
          type="comment"
          data={comment}
          handleEditComment={this.handleEdit}
        />
      </StyledComment>
    )}
  </Fragment>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
