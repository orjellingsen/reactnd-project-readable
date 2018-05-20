import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Alignment,
} from '@blueprintjs/core'
import Categories from './Categories'
import Context from './App'

const Header = ({ toggleNewPost, toggleTheme, darkTheme }) => (
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

Header.propTypes = {
  toggleNewPost: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool,
}

export default Header
