import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Speech To Text page', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toContain('Speech To Text Example');
  });
});
