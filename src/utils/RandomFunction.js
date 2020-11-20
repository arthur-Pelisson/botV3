
/**
 * @const RandomFunction
 * @param {Int} valeur Max of array songs
 * @return {Int} Random int 
 */
const RandomFunction = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

exports.RandomFunction = RandomFunction