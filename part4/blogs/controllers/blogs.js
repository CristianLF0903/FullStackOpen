const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({ user: request.userId }).populate('user', {
		username: 1,
		name: 1,
	})

	response.json(blogs)
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
				return response.status(400).json({
					error: `Objeto en índice ${i} falta propiedad(es): ${missing.join(
						', '
					)}`,
				})
			}
			data[i].user = request.userId
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
		data.user = request.userId
		try {
			const blog = new Blog(data)
			const result = await blog.save()

			response.status(201).json(result)
		} catch (error) {
			response.status(400).json({ error: error.message })
		}
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id

	try {
		const deletedBlog = await Blog.findById(id)

		if (!deletedBlog) {
			return response.status(404).json({ error: 'Blog not found' })
		}
		if (deletedBlog.user.toString() !== request.userId.toString()) {
			return response.status(403).json({ error: 'Unauthorized' })
		}

		await Blog.findByIdAndDelete(id)

		response.status(204).end()
	} catch (error) {
		console.error(error)
		response.status(500).json({ error: 'Something went wrong' })
	}
})

blogsRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body

	const blogToUpdate = {
		title,
		author,
		url,
		likes,
	}

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			blogToUpdate,
			{
				new: true, // devuelve el documento actualizado
				runValidators: true, // valida los cambios según el schema
				context: 'query',
			}
		)

		if (!updatedBlog) {
			return response.status(404).json({ error: 'Blog not found' })
		}

		response.json(updatedBlog)
	} catch (error) {
		console.error(error)
		response.status(500).json({ error: 'Something went wrong' })
	}
})

module.exports = blogsRouter
