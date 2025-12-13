import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogItem from './BlogItem'
import { expect } from 'vitest'

test('like button is clicked twice', async () => {

  const blog = {
    title: 'My first blog',
    author: 'John Example',
    url: 'https://example.com',
    likes: 10
  }

  const likeBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogItem blog={blog} handleLike = {likeBlog}/>)

  const sendButton = screen.getByText('Like')
  for (let i = 0; i < 2; i++) {
  await user.click(sendButton)
}
  expect(likeBlog).toHaveBeenCalled(2)
})