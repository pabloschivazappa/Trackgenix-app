class HomePage {
  get loginBtn() {
    return $('#root > div > section > h3:nth-child(2) > a');
  }

  get signUpBtn() {
    return $('#root > div > section > h3:nth-child(3) > a');
  }

  get headerHomePage() {
    return $('#root > div > header > div');
  }

  get navBarHomePage() {
    return $('#root > div > header > nav');
  }

  get sectionHomePage() {
    return $('#root > div > section');
  }

  get footerHomePage() {
    return $('#root > div > footer');
  }

  get linkFacebookHomePage() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(1)');
  }

  get linkTwitter() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(2)');
  }

  get linkInstagram() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(3)');
  }
}

module.exports = new HomePage();
