const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}