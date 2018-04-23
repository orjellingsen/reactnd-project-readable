import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { capitalize, ID } from '../utils/helper'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { Intent, Spinner } from "@blueprintjs/core"

import { createPost, updatePost } from '../actions/posts'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import FormControl from 'material-ui/Form/FormControl';
import Button from 'material-ui/Button/Button';


const styles = {
  root: {
    width: '50%',
    margin: '50px auto 0 auto',
  },
  submitButton: {
    backgroundColor: '#EF5350',
  }
}

class EditPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    path: PropTypes.string,
    categories: PropTypes.array.isRequired,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    classes: PropTypes.object,
  }

  state = {
    redirect: false,
    redirectNew: false,
    category: 'react',
  }

  componentDidMount () {
    const { post, path } = this.props
    if(path.includes('/update')) {
      if(post) { this.setState({ category: post.category }) }
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = e => {
    const { createPost, updatePost, post } = this.props
    e.preventDefault()
    const updatedPost = serializeForm(e.target, { hash: true })
    updatedPost.timestamp = Date.now()
    if (!post) {
      updatedPost.id = ID()
      createPost(updatedPost)
    } else {
      updatedPost.id = post.id
      updatePost(updatedPost)
    }
    this.setState({ redirect: true })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, categories, post } = this.props
    const { category, redirect, redirectNew } = this.state
    if (redirect) {
      return <Redirect to='/'/>
    } else if (redirectNew) {
      return <Redirect to='/new' />
    }
    return(
      <div className={classes.root}>
        <Typography type='title'>
          {post? 'Edit Post' : 'New Post'}
        </Typography>
        <Spinner intent={Intent.PRIMARY} />;
        <form onSubmit={this.handleSubmit} className='post-form' noValidate autoComplete="off">
          <TextField
            id="title"
            name='title'
            defaultValue={post? post.title : ''}
            label="Title"
            margin="normal"
            color='#C62828'
            fullWidth
          />
          <TextField
            id="body"
            name='body'
            defaultValue={post? post.body : ''}
            label="Content"
            multiline
            margin="normal"
            rows='3'
            fullWidth
          />
          <TextField
            id="author"
            name='author'
            defaultValue={post? post.author : ''}
            label="Author"
            multiline
            margin="normal"
            fullWidth
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={category}
              input={<Input name="category" id="category" />}
              onChange={this.handleChange}
            >
              {categories.map( (category) => (
                <MenuItem key={category.name} value={category.name}>{capitalize(category.name)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type='submit' raised color='primary' fullWidth>{post? 'Update Post' : 'Create Post'}</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ posts, }) {
  return {
    post: posts.post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (post) => dispatch(createPost(post)),
    updatePost: (post) => dispatch(updatePost(post)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditPost))