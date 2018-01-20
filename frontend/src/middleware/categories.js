import * as api from '../utils/ReadableAPI'
import {
  getCategories,
} from '../actions/categories'

export const fetchCategories = () => dispatch => (
  api.fetchCategories()
    .then(categories => dispatch(getCategories(categories)))
)