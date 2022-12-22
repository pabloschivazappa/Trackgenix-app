const superAdminPage = require('../pageobjects/superAdmin.page');
const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');
const AdminPage = require('../pageobjects/admin.page');

describe('Create, update and delete Admin', () => {
  beforeAll('Navigate to url', async () => {
    browser.url('https://alfon-b-trackgenix-app.vercel.app/home');
  });

  it('Should not login with empty fields', async () => {
    await HomePage.loginBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/login');
    await LoginPage.loginSuperAdmin('', '');
    // await LoginPage.errorMsgLoginEmail.waitForDisplayed({timeout: 10000});
    await expect(LoginPage.errorMsgLoginEmail).toBeDisplayed();
    await expect(LoginPage.errorMsgLoginPass).toBeDisplayed();
    await expect(LoginPage.errorMsgLoginEmail).toHaveText('Email must not be an empty field.');
    await expect(LoginPage.errorMsgLoginPass).toHaveText('Password must not be an empty field.');
  });

  it('Should not login with user name empty', async () => {
    await LoginPage.loginSuperAdmin('', 'superadmin');
    await expect(LoginPage.errorMsgLoginEmail).toBeDisplayed();
    await expect(LoginPage.errorMsgLoginEmail).toHaveText('Email must not be an empty field.');
    await browser.refresh();
  });

  it('Should not login with password empty', async () => {
    await LoginPage.loginSuperAdmin('superadmin@superadmin.com', '');
    await expect(LoginPage.errorMsgLoginPass).toBeDisplayed();
    await expect(LoginPage.errorMsgLoginPass).toHaveText('Password must not be an empty field.');
    await browser.refresh();
  });

  it('Should login super admin with valid credentials', async () => {
    await HomePage.loginBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/login');
    await LoginPage.loginSuperAdmin('superadmin@superadmin.com', 'superadmin');
  });

  it('Should can create admin', async () => {
    await HomePage.loginBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/login');
    await LoginPage.loginSuperAdmin('superadmin@superadmin.com', 'superadmin');
    //eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/super-admins');
    await superAdminPage.adminBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/admins');
    await AdminPage.createNewAdmin.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/admins/form');
    await AdminPage.createAdmin(
      'Ronaldo',
      'Nazario',
      'elgordorony@gmail.com',
      'asdqwecvbb',
      '417851852',
      '3415881233'
    );
    await AdminPage.confirmBtnCreateAdmin.click();
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    await AdminPage.closeBtnSpan.click();
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
  });

  it('Should can edit admin', async () => {
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/admins');
    await AdminPage.editBnt.click();
    //eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await AdminPage.editAdmin(
      'Bartolito',
      'Gandolfo',
      'bartolazo1@gmail.com',
      '45612899',
      '6413100133'
    );
    await AdminPage.editBtnForm.click();
  });

  it('Should can delete admin', async () => {
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/admins');
    //eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await AdminPage.deleteBtnForm.click();
    await AdminPage.deleteConfirmBtnForm.click();
    //eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/admins');
  });
});
