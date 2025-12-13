import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  // Select inputs by their name
//   const authorInput = screen.getByRole('textbox', { name: /author/i })
  const titleInput = screen.getByRole('textbox', { name: /title/i })
  //Variant to test urlInput with id
  const urlInput = container.querySelector('#url-id')
//   const urlInput = screen.getByRole('textbox', { name: /url/i })
  const sendButton = screen.getByRole('button', { name: /save/i })
  //Variant to testing authorInput with placeholder text
  const authorInput = screen.getByPlaceholderText('write author here')

  // Type into inputs
  await user.type(authorInput, 'John')
  await user.type(titleInput, 'My blog')
  await user.type(urlInput, 'https://example.com')

  // Submit the form
  await user.click(sendButton)

  // Assert that createBlog was called with correct data
  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    author: 'John',
    title: 'My blog',
    url: 'https://example.com'
  })
})

