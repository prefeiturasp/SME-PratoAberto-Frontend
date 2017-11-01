import { CodePage } from './app.po';

describe('code App', () => {
  let page: CodePage;

  beforeEach(() => {
    page = new CodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
