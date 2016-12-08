export const SCREEN1_APPROVED = 'screen1_approved';


export function screen1Approved() {
  return {
    type: SCREEN1_APPROVED
  }
}

export default function signup(state = {}, action = {}) {
  // debugger;
  switch (action.type) {
    case SCREEN1_APPROVED:
      return {...state, screen1Approved:true};
    default:
      return state
  }
}