class LoginPage {
  get inputLoginEmail() {
    return $('#root > div > div > div > form > label:nth-child(2) > input');
  }
  get inputLoginPassword() {
    return $('#root > div > div > div > form > label:nth-child(3) > input[type=password]');
  }
  get confirmLoginBtn() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }
  async loginSuperAdmin(username, password) {
    await this.inputLoginEmail.setValue(username);
    await this.inputLoginPassword.setValue(password);
    await this.confirmLoginBtn.click();
  }
}

module.exports = new LoginPage();
