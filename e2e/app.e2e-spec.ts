import { NgxCroppieExamplePage } from './app.po';

describe('ngx-croppie-example App', () => {
  let page: NgxCroppieExamplePage;

  beforeEach(() => {
    page = new NgxCroppieExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
