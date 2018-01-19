import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import FormControl from 'material-ui/Form/FormControl';
import Button from 'material-ui/Button/Button';

import serializeForm from 'form-serialize'


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
  handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    console.log(values)
  }
  render() {
    const { classes } = this.props
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
              <MenuItem value={'React'}>React</MenuItem>
              <MenuItem value={'Redux'}>Redux</MenuItem>
              <MenuItem value={'Udacity'}>Udacity</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit' raised color='primary' fullWidth>Create Post</Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(EditPost)