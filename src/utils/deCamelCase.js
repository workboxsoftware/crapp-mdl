export default function deCamelCase(text) {
  const ret =  
      text
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());
  return ret;
  }