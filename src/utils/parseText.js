import deCamelCase from './deCamelCase'; 

function parseText(arg) {
  const errId = "noidfoundx";

  if (typeof arg !== "string") {
    return { id:errId, defaultMessage:"Invalid fmtMessage text"};
  }
  if (arg.length === 0) {
    return {id: errId, defaultMessage:" "};
  }
  //  There are 2 "good" values for arg.  A colon separated string where
  //  the first part is a single lowercae word.  Alternatively, if the
  //  only a single word is passed in and it starts with a lowercase
  //  letter, then decamelcase it and use that as the default Message
  // case 1.  "invclnt: Invalid Client Entered"
  ///   Will return {id:"invclnt", defaultMessage:"Invalid Client Entered"}
  // case 2.  "billingRate". 
  //    Will Return {id:billingRate, defaultMessage:"Billing Rate"}
  // All others will return {id:noidfoundx, defaultMessage:arg}
  const pos = arg.indexOf(':');
  const firstChar = arg.substring(0,1);
  let ret;
  if (pos > 0) {  
    const id = arg.substring(0,pos);
    const wordCt = id.split(" ").length;
    const defaultMessage = arg.substring(pos+1);
    const isLowercase = ( id.toLowerCase() === id);
    if (wordCt === 1 && isLowercase) {
      ret = {id, defaultMessage}  //perfect eg "invclnt: Invalid Client"
    } else {
      ret = {id:errId, defaultMessage:arg}
    }
  } else if (arg.split(" ").length === 1 && firstChar === firstChar.toLowerCase()) {
      const defaultMessage = deCamelCase(arg);
      ret = {id:arg, defaultMessage};
  } else {
      ret = {id:errId, defaultMessage:arg} 
  } 

  return ret;
  }

  export default parseText;