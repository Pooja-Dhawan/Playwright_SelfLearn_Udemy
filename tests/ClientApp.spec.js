const {test,expect}= require('@playwright/test');

// test('First Playwright test',async function()
// {

// });
test ('Browser Context Playwright test',async ({page})=>
{
    //card body returns an array of products
    const email="pooja_dhawan24@yahoo.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Welcome@123");
    await page.locator("[value='Login']").click();
    // wait for networkidle is discouraged.
   // await page.waitForLoadState('networkidle');
    //console.log(await page.title());
    //console.log(await page.locator(".card-body b").first().textContent());
    // due to many elements in this locator, waitfor wont work.
    //await page.locator(".card-body b").waitFor();
    //await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body b").last().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

    const count= await products.count();
    console.log("count is " +count);
    for (let i=0; i<count; ++i)
    {
       if (await products.nth(i).locator("b").textContent() === productName)
       {
        // if product name matches, then click on add to cart button
        await products.nth(i).locator("text= Add To Cart").click();
        console.log("clicked is " + productName);
        //await page.pause();
        break;
       }
    }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy(); 
    console.log("bool value is ", +bool);
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    await page.locator(".ta-results").waitFor();
    const dropdown=page.locator(".ta-results");
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if( text === " India")
        {
            // click operation if text matches
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    // await page.pause();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    console.log("clicked on my orders");
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    console.log(" table of orders is displayed");
    for (let i=0; i<await rows.count(); ++i)
    {   
        console.log("inside for loop");
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("roworderid is ", rowOrderId);
        console.log ("prev fetched order id is ",orderId);
        if (orderId.includes(rowOrderId))
        {
            console.log("inside if condition");
            await rows.nth(i).locator("button").first().click();
            console.log("clicked on view button");
            console.log("roworderid is ", rowOrderId);
            break;
        }
        else
        {
            console.log("didnt find match");
        }
    }
 
    const orderIDDetails = await page.locator(".col-text").textContent();
    console.log("orderIDDetails is ", orderIDDetails);
    expect(orderId.includes(orderIDDetails)).toBeTruthy();
    console.log("expectation is successful");
});

