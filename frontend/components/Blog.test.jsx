import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('details are shown after clicking viewBlog', async () => {
  const blog = {
    title: 'My first blog',
    author: 'John Example',
    url: 'https://example.com',
    likes: 10
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const author = screen.getByText('John Example')
  expect(author).not.toBeVisible()

  await user.click(screen.getByText('viewBlog'))

  expect(author).toBeVisible()
  expect(screen.getByText('https://example.com')).toBeVisible()
  expect(screen.getByText('10')).toBeVisible()
})
