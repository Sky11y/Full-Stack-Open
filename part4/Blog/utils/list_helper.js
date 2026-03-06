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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const names = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const mostBlogs = Object.entries(names).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0]

  const ret = {
    "author": mostBlogs,
    "blogs": names[mostBlogs]
  }

  return ret
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const names = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0)
    acc[blog.author] += blog.likes
    return acc
  }, {})

  const mostLikes = Object.entries(names).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0]

  const ret = {
    "author": mostLikes,
    "likes": names[mostLikes]
  }

  return ret
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
