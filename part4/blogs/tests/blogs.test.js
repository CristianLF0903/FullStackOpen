const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithMultipleBlogs = [
	{
		_id: '1',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'https://example.com/dijkstra',
		likes: 5,
		__v: 0,
	},
	{
		_id: '2',
		title: 'React Patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '3',
		title: 'Another Blog',
		author: 'Michael Chan',
		url: 'https://example.com/michael',
		likes: 2,
		__v: 0,
	},
	{
		_id: '4',
		title: 'More Thoughts',
		author: 'Edsger W. Dijkstra',
		url: 'https://example.com/more',
		likes: 3,
		__v: 0,
	},
	{
		_id: '5',
		title: 'Final Blog',
		author: 'Michael Chan',
		url: 'https://example.com/final',
		likes: 4,
		__v: 0,
	},
]

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 5,
			__v: 0,
		},
	]

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		assert.strictEqual(result, 5)
	})
})

describe('favorite blog', () => {
	test('when list has multiple blogs, equals the blog with most likes', () => {
		const result = listHelper.favoriteBlog(listWithMultipleBlogs)
		assert.deepStrictEqual(result, listWithMultipleBlogs[1])
	})
})

describe('most blogs', () => {
	test('returns the author with the highest number of blogs', () => {
		const result = listHelper.mostBlogs(listWithMultipleBlogs)
		assert.deepStrictEqual(result, {
			author: 'Michael Chan',
			blogs: 3,
		})
	})
})

describe('most likes', () => {
	test('returns the author whose blogs have the most total likes', () => {
		const result = listHelper.mostLikes(listWithMultipleBlogs)
		// Michael Chan has 7 + 2 + 4 = 13 likes
		assert.deepStrictEqual(result, {
			author: 'Michael Chan',
			likes: 13,
		})
	})
})
