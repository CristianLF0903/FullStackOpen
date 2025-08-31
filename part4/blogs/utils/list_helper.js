const User = require('../models/user')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null
	return blogs.reduce(
		(max, blog) => (blog.likes > max.likes ? blog : max),
		blogs[0]
	)
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null

	const counts = blogs.reduce((acc, blog) => {
		acc[blog.author] = (acc[blog.author] || 0) + 1
		return acc
	}, {})

	const authorWithMost = Object.entries(counts).reduce(
		(max, [author, count]) =>
			count > max.blogs ? { author, blogs: count } : max,
		{ author: null, blogs: 0 }
	)

	return authorWithMost
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null

	const likesByAuthor = blogs.reduce((acc, blog) => {
		acc[blog.author] = (acc[blog.author] || 0) + blog.likes
		return acc
	}, {})

	const authorWithMostLikes = Object.entries(likesByAuthor).reduce(
		(max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
		{ author: null, likes: 0 }
	)

	return authorWithMostLikes
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map((u) => u.toJSON())
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
	usersInDb,
}
