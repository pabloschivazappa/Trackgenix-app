class TaskPage {
  get createTaskBtn() {
    return $('#root > div > section > a');
  }

  get confirmCreateTaskBtn() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }

  get closeBtnTasks() {
    return $('#root > div > div.modal_modal__Neg9O.modal_background__lt1sq > div > span > button');
  }

  get inputDescription() {
    return $('#root > div > div > div > form > label > input[type=text]');
  }

  get editTaskBtn() {
    return $('#root > div > section > table > tbody > tr:nth-child(4) > td.table_icons__74D5g > a');
  }

  get editTaskBtnConfirmation() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }

  get cancelBtnTasks() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_red__Z5anP'
    );
  }

  get closeBtnDeleteSuccess() {
    return $(
      '#root > div > section > div.modal_modal__Neg9O.modal_background__lt1sq > div > span > button'
    );
  }

  get deleteBtnTasks() {
    return $(
      '#root > div > section > table > tbody > tr:nth-child(4) > td.table_icons__74D5g > button'
    );
  }

  get goBackBtnTasks() {
    return $(
      '#root > div > div > div > form > div > button.buttons_form__button__uLJ3p.buttons_red__Z5anP'
    );
  }

  get deleteBtnConfirm() {
    return $(
      '#root > div > section > div.modal_modal__Neg9O.modal_background__lt1sq > div > span > button.buttons_form__button__uLJ3p.buttons_green__rAw61'
    );
  }

  async descriptionTask(description) {
    await this.inputDescription.setValue(description);
    await this.confirmCreateTaskBtn.click();
  }
}

module.exports = new TaskPage();
