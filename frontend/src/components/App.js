import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from '../middleware/categories';
import _ from 'lodash'

class App extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const { categories } = this.props
    console.log(categories)
    return (
      <div>
          <ul>
          {categories.map(
              (category) => (
                  <li key={category.name} className="category">
                          {category.name}
                  </li>
              )
          )}
      </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
      categories: _.values(categories.categoryList),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
