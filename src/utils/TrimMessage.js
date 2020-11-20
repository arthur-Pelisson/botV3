
/**
 * @const RemoveExtraSpace
 * @param message
 * @return {String} string without space at the start and end 
 */
const RemoveExtraSpace = (message) => {
    message = message.replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
    message = message.replace(/^[\s]/, ""); // Enlève les espaces au début
    message = message.replace(/[\s]$/,""); // Enlève les espaces à la fin
    return message;    
  }

exports.RemoveExtraSpace = RemoveExtraSpace