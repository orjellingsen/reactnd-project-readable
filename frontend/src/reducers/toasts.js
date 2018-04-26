import { ADD_POST, DELETE_POST } from '../actions/posts'

export default function categories(state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        {
          message: 'Post Created',
          intent: 'success',
          icon: 'plus',
        },
      ]
    case DELETE_POST:
      return [
        ...state,
        {
          message: 'Post Deleted',
          intent: 'danger',
          icon: 'trash',
          timeout: 3000,
        },
      ]
    default:
      return state
  }
}
