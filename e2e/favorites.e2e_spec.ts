import { browser, element, by, $$ } from 'protractor';
import { LogInPage } from './login_page';

class FavoritesPage {
  logInPage: LogInPage = new LogInPage();

  get() {
    this.logInPage.get();
    this.logInPage.logIn();
  }

  openMenu() {
    $$('button[menutoggle]').click();
    browser.sleep(2000);
  }

  viewTopStories() {
    this.openMenu();
    $$('#btnShowTopStories').click();
    browser.sleep(5000);
  }

  viewFavorites() {
    this.openMenu();
    $$('#btnShowFavorites').click();
    browser.sleep(5000);
  }

  addToFavorite() {
    this.viewTopStories();
    const itemElem = $$('item').filter(elem => {
      return elem.element(by.css('.btnLike')).isPresent();
    }).first();
    if (itemElem) {
      const title = itemElem.element(by.css('h2')).getText();
      itemElem.element(by.css('.btnLike')).click();
      browser.sleep(2000);
      return title;
    }
    return null;
  }

  isInFavorites(title: string) {
    this.viewFavorites();
    expect($$('h2').map(elem => elem.getText())).toContain(title);
  }
}

describe('favorites page', () => {
  beforeEach(() => {
    this.favoritesPage = new FavoritesPage();
    this.favoritesPage.get();
  });

  it('should add stories to the favorites', () => {
    const title = this.favoritesPage.addToFavorite();
    if (!title) {
      fail('No stories can be added.');
    }
    this.favoritesPage.isInFavorites(title);
  });
});