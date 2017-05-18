import { browser, element, by, $$ } from 'protractor';

export class LogInPage {
  get() {
    browser.get('');
    browser.sleep(5000);

    this.openMenu();

    $$('#btnShowLogin').click();
    browser.sleep(2000);
  }

  openMenu() {
    $$('button[menutoggle]').click();
    browser.sleep(2000);
  }

  logIn(email: string = 'a@b.com', password: string = 'password') {
    $$('input[name=email]').sendKeys(email);
    $$('input[name=password]').sendKeys(password);
    $$('#btnLogin').click();
    browser.sleep(5000);
  }

  canLogIn() {
    return element(by.css('#btnShowLogin')).isPresent();
  }

  isLoggedIn() {
    return element(by.css('#btnLogout')).isPresent();
  }

  logOut() {
    this.openMenu();
    $$('#btnLogout').click();
    browser.sleep(1000);
  }
}