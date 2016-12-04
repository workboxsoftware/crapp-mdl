import { defineMessages } from 'react-intl';
import deCamelCase from '../utils/deCamelCase';  
import parseText from '../utils/parseText'



export class translateText {
  
  constructor(formatMessage) {
    this.formatMessage = formatMessage;
  }

  doTranslate(id, defaultMessage) {
    const messages = defineMessages({
      text: {
        id,
        defaultMessage
      }
    });
    return this.formatMessage(messages.text);
  }

  msgId(id, msg) {

    if (!id) {
      return "!!tr-no-key";
    }

    let defaultMessage;
    if (!msg) {
      defaultMessage = deCamelCase(id);
    } else {
      defaultMessage = msg;
    }

    return this.doTranslate(id, defaultMessage);
  }

  text(text) {
    const ret = parseText(text);
    return this.doTranslate(ret.id, ret.defaultMessage);
  }

  // obj(obj) {
  
  //   // just return if obj is a string
  //   if (typeof obj === 'string')
  //     return obj;
  
  //   // return garbage if not an object
  //   if (typeof obj !== 'object') {
  //     return "!!tr-noobj";
  //   }
  
  //   const id = Object.keys(obj)[0];
  //   const msg = obj[id];
  //   if (typeof id !== "string") {
  //     return "!!tr-err2!!"
  //   }
  //   if (typeof msg !== "string") {
  //     return "!!tr-err3!!";
  //   }
  //   return this.key(id, msg);
  // }
}