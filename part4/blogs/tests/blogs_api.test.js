const { test, after } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blog contain id property', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	response.body.forEach((blog) => {
		assert.ok(
			Object.hasOwn(blog, 'id'),
			`El elemento ${JSON.stringify(blog)} no tiene la propiedad "id"`
		)
	})
})

test('blog contain likes property', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	response.body.forEach((blog) => {
		assert.ok(
			Object.hasOwn(blog, 'likes'),
			`El elemento ${JSON.stringify(blog)} no tiene la propiedad "likes"`
		)
	})
})

test('creation fails with status 400 if title is missing', async () => {
	const newBlog = {
		author: 'Author Name',
		url: 'http://example.com',
		likes: 5,
	}

	// Remove title property
	delete newBlog.title

	await api.post('/api/blogs').send(newBlog).expect(400)
})

test('creation fails with status 400 if url is missing', async () => {
	const newBlog = {
		title: 'Blog Title',
		author: 'Author Name',
		likes: 5,
	}

	// Remove url property
	delete newBlog.url

	await api.post('/api/blogs').send(newBlog).expect(400)
})

after(async () => {
	await mongoose.connection.close()
})
