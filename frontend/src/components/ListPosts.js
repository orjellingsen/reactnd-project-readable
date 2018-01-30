import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'

import { fetchPostsByCategory } from '../middleware/posts'

import { withStyles } from 'material-ui/styles'
import Card, { CardHeader } from 'material-ui/Card'

const styles = {
  card: {
    width: '90%',
    margin: '15px auto 15px auto',
  },
  cardHeader: {
    backgroundColor: '#E8EAF6',
  },
}

class ListPosts extends Component {
  static propTypes = {
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array,
  }

  state = {
    sort: 'timestamp',
  }

  render() {
    const { posts, classes } = this.props
    return (
      <div>
        {posts.map ((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <Card className={classes.card}>
              <CardHeader
                title={post.title}
                subheader={`Posted ${moment(post.timestamp).fromNow()} by ${post.author} (${post.commentCount} comments, ${post.voteScore} votes)`}
                className={classes.cardHeader}
                color='accent'
              />
            </Card>
          </Link>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ posts, }) {
  return {
    posts: _.values(_.orderBy(posts.allPosts, 'timestamp', 'desc')),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListPosts))