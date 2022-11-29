const HomePage = require('../pageobjects/home.page');

describe('Create, update and delete Admin', () => {
  beforeAll('Navigate to url', async () => {
    browser.url('https://alfon-b-trackgenix-app.vercel.app/home');
  });

  it('To have url title', async () => {
    await expect(browser).toHaveTitle('TRACKgenix');
  });

  it('Home page should be displayed', async () => {
    await expect(HomePage.headerHomePage).toBeDisplayed();
    await expect(HomePage.navBarHomePage).toBeDisplayed();
    await expect(HomePage.sectionHomePage).toBeDisplayed();
    await expect(HomePage.footerHomePage).toBeDisplayed();
  });

  it('Button login to be clickable', async () => {
    await expect(HomePage.loginBtn).toBeClickable();
  });

  it('Button sign up to be clickable', async () => {
    await expect(HomePage.signUpBtn).toBeClickable();
  });

  it('Social media buttons to be clickable', async () => {
    await expect(HomePage.linkFacebookHomePage).toBeClickable();
    await expect(HomePage.linkTwitter).toBeClickable();
    await expect(HomePage.linkInstagram).toBeClickable();
  });
});
