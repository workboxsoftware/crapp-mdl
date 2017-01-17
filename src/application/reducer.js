import { SWITCH_LOCALE } from './actionTypes'

export default function application(state = {}, action = {}) {

  switch (action.type) {
    case SWITCH_LOCALE:
      return {...state, locale:action.locale, messages:action.messages };
    default:
      return state
  }
}