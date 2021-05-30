function randomIntFromInterval(min, max) { // min and max included 
    let value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
  }


  module.exports = {randomIntFromInterval};