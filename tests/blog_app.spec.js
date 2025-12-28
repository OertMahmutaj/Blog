const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog App', () => {
     beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
        data: {
            name: 'TestName',
            username: 'TestUsername',
            password: 'TestPassword'
      }
    })
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async({ page }) => {

        const locator = page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('user can log in', async ({ page }) => {

        await page.goto('http://localhost:5173')
        
        await page.getByRole('button' , {name: 'log in' }).click()
        await page.getByLabel('username').fill('TestUsername')
        await page.getByLabel('password').fill('TestPassword')

        await page.getByRole('button', {name: 'login' }).click()

        await expect(page.getByText('TestName logged in')).toBeVisible()
    })

    // test('user can log in', async ({ page }) => {

    //     await page.goto('http://localhost:5173')
        
    //     await page.getByRole('button' , {name: 'log in' }).click()
    //     await page.getByLabel('username').fill('TestUsername')
    //     await page.getByLabel('password').fill('TestPassword')

    //     await page.getByRole('button', {name: 'login' }).click()

    //     await expect(page.getByText('TestName logged in')).toBeVisible()
    // })


    describe('when logged in', () =>{
        beforeEach(async ({ page }) =>{
            await page.goto('http://localhost:5173')

            //Log in User
            await page.getByRole('button' , {name: 'log in' }).click()
            await page.getByLabel('username').fill('TestUsername')
            await page.getByLabel('password').fill('TestPassword')
            await page.getByRole('button', {name: 'login' }).click()
            await expect(page.getByText('TestName logged in')).toBeVisible()
        })

        test('create a new Blog', async({ page }) =>{             
            
            //Click on button to make the form visible
            await page.getByRole('button', {name: 'Make a new blog'}).click()

            //Fill out the form
            await page.getByPlaceholder('write author here').fill('Test Author')
            await page.getByPlaceholder('write title here').fill('Test Title')
            await page.getByPlaceholder('write url here').fill('Test Url')

            //Clik on the button to save the Blog
            await page.getByRole('button', {name: 'save'}).click()

            //Assert the text for creating a blog displays
            await expect(page.getByText('A new blog Test Title added by TestUsername')).toBeVisible()
        })

        describe('and a blog exists', async () =>{
            beforeEach(async ({ page }) =>{
                await page.getByRole('button', {name: 'Make a new blog'}).click()

            //Fill out the form
            await page.getByPlaceholder('write author here').fill('Test Author')
            await page.getByPlaceholder('write title here').fill('Test Title')
            await page.getByPlaceholder('write url here').fill('Test Url')

            //Clik on the button to save the Blog
            await page.getByRole('button', {name: 'save'}).click()

            //Assert the text for creating a blog displays
            await expect(page.getByText('A new blog Test Title added by TestUsername')).toBeVisible()
            })

            test('that the Properties are not visible unless clicked', async({ page })=>{
                await page.getByRole('button', {name: 'viewLikesAndUrl'}).first().click()
                await expect(page.getByText('adasd')).toBeVisible()

            })

            test('that the blogs are in descending order after ordering them', async({ page }) =>{
                await page.getByRole('button', {name: 'Sort Descending'}).click()
                const likes = await page.locator('.blog .likes').allTextContents();
                const likeNumbers = likes.map(l => Number(l));

                const sorted = [...likeNumbers].sort((a, b) => b - a);
                expect(likeNumbers).toEqual(sorted);
            })
        })
    })
})