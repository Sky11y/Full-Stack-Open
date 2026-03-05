const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  
  let array_of_likes = blogs.map(item => item.likes)
  let total = array_of_likes.reduce(
    (acc, current) => acc + current,
    0,
  )
  return total
}

module.exports = {
  dummy,
  totalLikes
}
