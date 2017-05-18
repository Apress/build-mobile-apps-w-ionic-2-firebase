import { browser, element, by } from 'protractor';

class TopStoriesPage {
  get() {
    browser.get('');
    browser.sleep(5000);
  }

  scrollDown() {
    browser.executeScript('document.getElementsByTagName("ion-infinite-scroll")[0].scrollIntoView();');
    browser.sleep(5000);
  }

  getStoriesCount() {
    const stories = element.all(by.css('item'));
    return stories.count();
  }
}

describe('top stories page', () => {
  beforeEach(() => {
    this.topStoriesPage = new TopStoriesPage();
    this.topStoriesPage.get();
  });

  it('should show 10 stories', () => {
    expect(this.topStoriesPage.getStoriesCount()).toEqual(10);
  });

  it('should show more stories when scrolling down', () => {
    expect(this.topStoriesPage.getStoriesCount()).toEqual(10);

    this.topStoriesPage.scrollDown();
    expect(this.topStoriesPage.getStoriesCount()).toEqual(20);
  });
});