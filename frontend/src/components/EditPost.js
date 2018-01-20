import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { capitalize, UUID } from '../utils/helper'
import { Redirect } from 'react-router'

import { createPost } from '../middleware/posts'

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
  state = {
    redirect: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    post.timestamp = Date.now()
    post.id = UUID.generate()
    this.props.createPost(post)
    this.setState({ redirect: true })
  }

  render() {
    const { classes, categories } = this.props
    if (this.state.redirect) {
      return <Redirect to='/'/>
    }
    return(
      <div className={classes.root}>
        <Typography type='title'>New Post</Typography>
        <form onSubmit={this.handleSubmit} className='post-form' noValidate autoComplete="off">
          <TextField
            id="title"
            name='title'
            label="Title"
            margin="normal"
            color='#C62828'
            fullWidth
          />
          <TextField
            id="body"
            name='body'
            label="Content"
            multiline
            margin="normal"
            rows='3'
            fullWidth
          />
          <TextField
            id="author"
            name='author'
            label="Author"
            multiline
            margin="normal"
            fullWidth
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value='React'
              input={<Input name="category" id="category" />}
            >
              {categories.map( (category) => (
                <MenuItem key={category.name} value={category.name}>{capitalize(category.name)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type='submit' raised color='primary' fullWidth>Create Post</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (post) => dispatch(createPost(post)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditPost))