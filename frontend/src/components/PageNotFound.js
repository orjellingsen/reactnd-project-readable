import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className="page-not-found">
    <h2>Page not found.</h2>
    <p>
      This page does not exist. <Link to="/">Go to homepage</Link>
    </p>
  </div>
)
