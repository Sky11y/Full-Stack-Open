const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  
  return blogs.reduce((acc, current) => acc + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let mostLikes = blogs.reduce((largest, current) => 
    (current.likes > largest.likes ? current : largest), blogs[0])

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
