import { FormattedMessage } from 'react-intl';
import React from 'react';
import parseText from '../utils/parseText';
import deCamelCase from '../utils/deCamelCase';

function useProps(props) {

  // if there's not defaultMessage, then
  // use the message Id as the message.
  const id = props.id;
  let defaultMessage;
  if (props.defaultMsg) {
      defaultMessage = props.defaultMessage
    } else {
      defaultMessage = deCamelCase(id);
    }
  return {id, defaultMessage};
}

const FmtMsg = (props) => {

// if passing in by props, use that first.
// if no defaultMessage, then use id;

  let ret, args;
  if (props.id) {
    ret = useProps(props);
  } else {
    ret = parseText(props.children);
    args = {...props};
  }
  const id = ret.id;
  const defaultMessage = ret.defaultMessage;

  return (
    <span {...args}>
      <FormattedMessage id={id} defaultMessage={defaultMessage} />
    </span>
  );
};

export default FmtMsg;