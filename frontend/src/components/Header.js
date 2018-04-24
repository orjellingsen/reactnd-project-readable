import React from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Alignment,
} from '@blueprintjs/core'
import Categories from './Categories'

export default () => (
  <Navbar>
    <NavbarGroup>
      <NavbarHeading>Readable</NavbarHeading>
      <NavbarDivider />
      <Link to="/">
        <Button icon="home" text="All" />
      </Link>
      <Categories />
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <Link to="/new">
        <Button icon="plus" text="New Post" />
      </Link>
    </NavbarGroup>
  </Navbar>
)
