class superAdminPage {
  get adminBtn() {
    return $('#root > div > header > nav > ul > li:nth-child(2) > a');
  }
}

module.exports = new superAdminPage();
