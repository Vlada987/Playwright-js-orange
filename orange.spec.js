const{test, expect}=require('@playwright/test')
test('orange-Test',async({page})=>{ 
test.setTimeout(120000);

//Open and verify login page 
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
const pageLogo=await page.getByAltText('company-branding')
await expect(pageLogo).toBeVisible();

//Login by passing username and password and confirm home page
await page.getByPlaceholder("Username").fill("Admin");
await page.getByPlaceholder("Password").fill("admin123");
await page.locator("//button[@type='submit']").click();
const homePageUrl="https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
await expect(page).toHaveURL(homePageUrl);

//Open and confirm presence on the Leave section 
await page.locator("//span[text() ='Leave']").click();
const leaveTabUrl="https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList";
await expect(page).toHaveURL(leaveTabUrl);

//Open Apply leave tab and confirm
await page.locator("//a[text()='Apply']").click();
const applyLeaveUrl="https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave";
await expect(page).toHaveURL(applyLeaveUrl);

//Setting the leave data and send leave request
const dropdown=await page.getByText("-- Select --");
expect (dropdown).toBeVisible();
await dropdown.click();
const FMLA=await page.getByText("CAN - FMLA");
await FMLA.click();
await page.waitForTimeout(3000);
await page.locator(".oxd-grid-4 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input").fill("2025-28-05");
await page.locator("div.oxd-form-row:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input").clear();
await page.locator("div.oxd-form-row:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input").fill("2025-29-05");
await page.locator(".oxd-textarea").fill("test123");
await page.locator("//button[@type='submit']").click();
await page.waitForTimeout(6000);

//Verify that the request is send by comparing the comment
await page.getByText("My Leave").click();
await page.waitForTimeout(2300);
const verify_comm=await page.getByText("test123");
expect(verify_comm).toBeVisible(); 











})