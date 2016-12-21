// import { browserHistory } from 'react-router';

export const ERROR_NOTIF_INSERT = 'error-notification-insert';
export const ERROR_NOTIF_DELETE = 'error-notification-delete';

export const errorNotificationInsert = (form, errors) => {
  return {
    type: ERROR_NOTIF_INSERT,
    form,
    errors
  };
};

export function errorNotificationDelete(form) {
  return {
    type: ERROR_NOTIF_DELETE,
    form
  };
}

//
export default function (state = [], action) {
  let ret;

  switch (action.type) {
    case ERROR_NOTIF_INSERT:
      if (!action.errors) return state;

      // remove existing row
      // const tmp = [ state.filter(obj => obj.form !== action.form) ];
      // ret = [ ...tmp, { form:action.form, value:action.errors }] ;
      ret = [...state, {form: action.form, errors: action.errors},]
      console.log("insert", ret);
      return ret;
    case ERROR_NOTIF_DELETE:
      ret = state.filter(err => err.form !== action.form);
      console.log("delete", ret);
      return ret;
    default:
      return state;
  }
}