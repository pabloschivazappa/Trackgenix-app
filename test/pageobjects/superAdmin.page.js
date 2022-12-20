class superAdminPage {
  get adminBtn() {
    return $('#root > div > header > nav > ul > li:nth-child(1) > a');
  }
}

module.exports = new superAdminPage();
