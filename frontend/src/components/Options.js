import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { removePost } from '../actions/posts'
import { removeComment } from '../actions/comments'
import { Context } from './App'

const Options = ({ data, type, handleEditComment }) => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)

  const handleDelete = ({ id, parentId }, type) => {
    if (type === 'post') {
      dispatch(removePost(id))
      setRedirect(true)
    } else {
      dispatch(removeComment(id, parentId))
    }
  }

  if (redirect) return <Redirect to="/" />

  return (
    <Context.Consumer>
      {({ handleEditPost }) => (
        <div className="options">
          <Button
            icon="edit"
            onClick={() =>
              type === 'post' ? handleEditPost(data, type) : handleEditComment(data)
            }
          />
          <Button icon="trash" onClick={() => handleDelete(data, type)} />
        </div>
      )}
    </Context.Consumer>
  )
}

Options.propTypes = {
  type: PropTypes.oneOf(['comment', 'post']).isRequired,
  data: PropTypes.object.isRequired,
  handleEditPost: PropTypes.func,
  handleEditComment: PropTypes.func,
}

export default Options
