import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

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

  //5.13
  const likesAndUrl = screen.getByText('https://example.com')
  expect(likesAndUrl).not.toBeVisible()

  //5.14
  await user.click(screen.getByText('viewLikesAndUrl'))
  expect(likesAndUrl).toBeVisible()
})

//5.13
//Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

//Add CSS classes to the component to help the testing as necessary.

//Pseudo

//In the Blog.jsx comp we separate url and likes and wrap it with another togglebale component

//We give the new togglebale component a new Css class and when we test it we need to press the other button

//This way the test called to show the blog will only show title and author

//5.14
//Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.

//Create a button which changes the display style of the div that wraps the url and likes 

//When this button is clicked the test should check if the display setting is equal to visible

//SWITCHED TO WRAPPING IN TOGLABLE COMPONENTS AS IT CHANGES THE STYLE

//5.15
//Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

//Create a mock function to pass the like handler

//Render Blog comp with this mock function as the prop

//Click it twice

//Asser that the mock functions call count is 2