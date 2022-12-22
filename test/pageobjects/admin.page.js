class AdminPage {
  get createNewAdmin() {
    return $('#root > div > section > a');
  }

  get lastName() {
    return $('#root > div > div > div > form > label:nth-child(2) > input[type=text]');
  }

  get name() {
    return $('#root > div > div > div > form > label:nth-child(3) > input[type=text]');
  }

  get email() {
    return $('#root > div > div > div > form > label:nth-child(4) > input[type=text]');
  }

  get password() {
    return $('#root > div > div > div > form > label:nth-child(5) > input[type=password]');
  }

  get dni() {
    return $('#root > div > div > div > form > label:nth-child(6) > input[type=text]');
  }

  get phone() {
    return $('#root > div > div > div > form > label:nth-child(7) > input[type=text]');
  }

  get confirmBtnCreateAdmin() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }

  get editLastName() {
    return $('#root > div > div > div > form > label:nth-child(2) > input[type=text]');
  }

  get editName() {
    return $('#root > div > div > div > form > label:nth-child(3) > input[type=text]');
  }

  get editEmail() {
    return $('#root > div > div > div > form > label:nth-child(4) > input[type=text]');
  }

  get editDni() {
    return $('#root > div > div > div > form > label:nth-child(5) > input[type=text]');
  }

  get editPhone() {
    return $('#root > div > div > div > form > label:nth-child(6) > input[type=text]');
  }

  get closeBtnSpan() {
    return $('#root > div > div.modal_modal__Neg9O > div > span > button');
  }

  get editBnt() {
    return $(
      '#root > div > section > table > tbody > tr:nth-child(2) > td.table_icons__74D5g > a > i'
    );
  }

  get editBtnForm() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }

  get deleteBtnForm() {
    return $(
      '#root > div > section > table > tbody > tr:nth-child(2) > td.table_icons__74D5g > button'
    );
  }

  get deleteConfirmBtnForm() {
    return $(
      '#root > div > section > div.modal_modal__Neg9O > div > span > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }

  get taskBtn() {
    return $('#root > div > header > nav > ul > li:nth-child(6) > a');
  }

  async createAdmin(lastname, name, email, password, dni, phone) {
    await this.lastName.setValue(lastname);
    await this.name.setValue(name);
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.dni.setValue(dni);
    await this.phone.setValue(phone);
    await this.confirmBtnCreateAdmin.click();
  }

  async editAdmin(lastname, name, email, dni, phone) {
    await this.editLastName.setValue(lastname);
    await this.editName.setValue(name);
    await this.editEmail.setValue(email);
    await this.editDni.setValue(dni);
    await this.editPhone.setValue(phone);
    await this.confirmBtnCreateAdmin.click();
  }
}

module.exports = new AdminPage();
