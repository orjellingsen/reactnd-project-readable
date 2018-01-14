import {
  SELECT_CATEGORY,
} from '../actions/categories'

function categories ( state = {}, action ) {
  switch (action.type) {
    case SELECT_CATEGORY:
    default:
      return state
  }
}

export default categories