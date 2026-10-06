const {test,expect}= require('@playwright/test');
const {defineConfig} = require('@playwright/test');
// test('First Playwright test',async function()
// {

// });
test ('Browser Context Playwright test',async ({browser})=>
{
    const context= await browser.newContext();
    const page  = await context.newPage();

    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    //type or fill to enter in edit box
    // type is deprecated and fill is used now
    //css locator
    await userName.fill("rahulshetty");
    await passWord.fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    //asertion
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // fill also wipes off the content entered previously
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("");
    await passWord.fill("Learning@830$3mK2")
    await signIn.click();
    await expect(page.locator(".navbar-brand").first()).toBeVisible();
    console.log("login try");
    console.log(await page.title());
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    // console.log(await cardTitles.nth(2).textContent());
    // console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const password = page.locator('#password');
    const dropdown = page.locator('select.form-control');

    await dropdown.selectOption("consult");

    //await page.locator(".radiotextsty").last().click();
    //await page.locator("#okayBtn").click();
    //await page.pause();
    // console.log(await page.locator(".radiotextsty").last().isChecked());
    // await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    console.log(await expect(page.locator("#terms")).toBeChecked());
    await page.locator("#terms").uncheck();
    //expect(await page.locator("#terms").isChecked()).toBeTruthy();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingTexts");

});

test.only ('@child windows hadl',async({browser})=>
{
    const context = await  browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
    context.waitForEvent('page'), // listen for any new page pending, rejected or fulfilled page event
    documentLink.click(),
    ]) // new page is opened in new tab
    const text = await newPage.locator(".red").textContent();
     console.log("fulltext: " +text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log("idname: " +domain);

    await page.locator("#username").fill(domain);
    
   // console.log(await page.locator("#username").textContent());    
    console.log(await page.locator("#username").inputValue());
    await page.pause();

});
