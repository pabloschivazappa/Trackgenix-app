const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');
const AdminPage = require('../pageobjects/admin.page');
const TaskPage = require('../pageobjects/tasks.page');

describe('Create, update and delete Task', () => {
  beforeAll('Navigate to url', async () => {
    browser.url('https://alfon-b-trackgenix-app.vercel.app/home');
  });

  it('Should can create a new task', async () => {
    await HomePage.loginBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/login');
    await LoginPage.loginAdmin('admin@admin.com', 'admin123');
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await AdminPage.taskBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/tasks');
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    await TaskPage.createTaskBtn.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/tasks/form');
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    await TaskPage.descriptionTask('Example for description of task number 1');
    await TaskPage.confirmCreateTaskBtn.click();
    // // eslint-disable-next-line wdio/no-pause
    // await browser.pause(2000);
    await TaskPage.closeBtnTasks.click();
    await TaskPage.cancelBtnTasks.click();
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/tasks');
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    // await AdminPage.taskBtn.click();
  });

  it('Should can delete task', async () => {
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/tasks');
    //eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await TaskPage.deleteBtnTasks.click();
    await TaskPage.deleteBtnConfirm.click();
    await TaskPage.closeBtnDeleteSuccess.click();
    //eslint-disable-next-line wdio/no-pause
    await browser.pause(3000);
    await browser.url('https://alfon-b-trackgenix-app.vercel.app/task');
  });
});
