const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

blogsRouter.post('/', async (request, response) => {
	const data = request.body
	const requiredProps = ['title', 'author', 'url', 'likes']

	const checkMissingProps = (obj) => {
		return requiredProps.filter((prop) => obj[prop] === undefined)
	}

	if (Array.isArray(data)) {
		for (let i = 0; i < data.length; i++) {
			const missing = checkMissingProps(data[i])
			if (missing.length > 0) {
				return response
					.status(400)
					.json({
						error: `Objeto en índice ${i} falta propiedad(es): ${missing.join(
							', '
						)}`,
					})
			}
		}
		try {
			const result = await Blog.insertMany(data)
			response.status(201).json(result)
		} catch (error) {
			response.status(400).json({ error: error.message })
		}
	} else {
		const missing = checkMissingProps(data)
		if (missing.length > 0) {
			return response
				.status(400)
				.json({ error: `Falta propiedad(es): ${missing.join(', ')}` })
		}
		try {
			const blog = new Blog(data)
			const result = await blog.save()
			response.status(201).json(result)
		} catch (error) {
			response.status(400).json({ error: error.message })
		}
	}
})

module.exports = blogsRouter
