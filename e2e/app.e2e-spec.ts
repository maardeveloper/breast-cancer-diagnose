import { BreastCancerPage } from './app.po';

describe('breast-cancer App', () => {
  let page: BreastCancerPage;

  beforeEach(() => {
    page = new BreastCancerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
