
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomFloat = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2)
}

export {getRandomFloat, getRandomInt}