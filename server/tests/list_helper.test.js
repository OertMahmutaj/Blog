const assert = require('assert')
const { test, describe } = require('node:test')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Blog 1',
      author: 'Alice',
      likes: 10
    },
    {
      title: 'Blog 2',
      author: 'Bob',
      likes: 5
    },
    {
      title: 'Blog 3',
      author: 'Charlie',
      likes: 12
    }
  ]

  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has one blog, return that', () => {
    const list = [blogs[1]]
    assert.deepStrictEqual(listHelper.favoriteBlog(list), blogs[1])
  })

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('most blogs', ()=>{
    const blogs = [
    {
      title: 'Blog 1',
      author: 'Alice',
      likes: 10
    },
    {
      title: 'Blog 2',
      author: 'Bob',
      likes: 5
    },
    {
      title: 'Blog 3',
      author: 'Charlie',
      likes: 12
    },
    {
      title: 'Blog 4',
      author: 'Charlie',
      likes: 13
    }
  ]
  test('returns the author with most blogs', () => {
  const result = listHelper.mostBlogs(blogs)
  const expected = { author: 'Charlie', blogs: 2 } // match your test data
  assert.deepStrictEqual(result, expected)
})
})

describe('most likes', ()=>{
    const blogs = [
    {
      title: 'Blog 1',
      author: 'Alice',
      likes: 10
    },
    {
      title: 'Blog 2',
      author: 'Bob',
      likes: 5
    },
    {
      title: 'Blog 3',
      author: 'Charlie',
      likes: 12
    },
    {
      title: 'Blog 4',
      author: 'Charlie',
      likes: 13
    }
  ]
  test('returns the author with most blogs', () => {
  const result = listHelper.mostLikes(blogs)
  const expected = { author: 'Charlie', likes: 25 } // match your test data
  assert.deepStrictEqual(result, expected)
})
})

