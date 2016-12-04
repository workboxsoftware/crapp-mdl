import { SWITCH_LOCALE } from './applicationActionTypes'

export default function application(state = {}, action = {}) {
  // debugger;
  switch (action.type) {
    case SWITCH_LOCALE:
      return {...state, locale:action.locale, messages:action.messages };
    default:
      return state
  }
}