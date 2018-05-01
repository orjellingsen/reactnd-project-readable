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

export default ({ toggleNewPost, toggleTheme, darkTheme }) => (
  <Navbar fixedToTop>
    <NavbarGroup>
      <NavbarHeading>Readable</NavbarHeading>
      <NavbarDivider />
      <Link to="/">
        <Button icon="home" text="All" />
      </Link>
      <Categories />
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <Button
        icon={darkTheme ? 'flash' : 'moon'}
        text={darkTheme ? 'Light Theme' : 'Dark Theme'}
        onClick={toggleTheme}
      />
      <Button
        intent="primary"
        icon="plus"
        text="New Post"
        onClick={toggleNewPost}
      />
    </NavbarGroup>
  </Navbar>
)
