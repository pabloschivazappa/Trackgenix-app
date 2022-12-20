const superAdminPage = require('../pageobjects/admin.page');
const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');

describe('Create, update and delete Admin', () => {
  beforeAll('Navigate to url', async () => {
    browser.url('https://alfon-b-trackgenix-app.vercel.app/home');
  });

  it('Should login super admin with valid credentials', async () => {
    await HomePage.loginBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/login');
    await LoginPage.loginSuperAdmin('superadmin@superadmin.com', 'superadmin');
  });

  it('Should can create admin', async () => {
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/super-admins');
    await superAdminPage.adminBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/admins');
  });
});
