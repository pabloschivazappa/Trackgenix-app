class HomePage {
  get loginBtn() {
    return $('#root > div > header > nav > div.header_sign__JSZ0m > div > a > div');
  }

  get signUpBtn() {
    return $('#root > div > header > nav > div.header_sign__JSZ0m > button');
  }

  get headerHomePage() {
    return $('#root > div > header');
  }

  get navBarHomePage() {
    return $('#root > div > header > nav');
  }

  get sectionHomePage() {
    return $('#root > div');
  }

  get footerHomePage() {
    return $('#root > div > footer');
  }

  get linkFacebookHomePage() {
    return $('#root > div > footer > div > div.footer_social_networks__VQJPw > a:nth-child(1) > i');
  }

  get linkTwitter() {
    return $('#root > div > footer > div > div.footer_social_networks__VQJPw > a:nth-child(2) > i');
  }

  get linkInstagram() {
    return $('#root > div > footer > div > div.footer_social_networks__VQJPw > a:nth-child(3) > i');
  }
}

module.exports = new HomePage();
