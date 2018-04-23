import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    path: PropTypes.string,
  }

  render() {
    const { path } = this.props
    return (
      <div>
        <h1>READABLE</h1>
        {path === '/new' || path.includes('/update') ? (
          <Link to="/">Cancel</Link>
        ) : (
          <Link to="/new">New</Link>
        )}
      </div>
    )
  }
}
