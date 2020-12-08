describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'TestaajaTomppa',
      username: 'tomppa',
      password: 'salasana',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('front page is opened with login form', function () {
    cy.contains('Log in to application');
    cy.get('#login-button').click();
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('tomppa');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.contains('wrong credentials');
    cy.get('html').should('not.contain', 'TestaajaTomppa logged in');
  });
  it('user can log in', function () {
    cy.contains('login').click();
    cy.get('#username').type('tomppa');
    cy.get('#password').type('salasana');
    cy.get('#login-button').click();

    cy.contains('TestaajaTomppa');
  });
});
describe('when logged in', function () {
  beforeEach(function () {
    window.localStorage.clear();
    cy.login({
      username: 'tomppa',
      password: 'salasana',
    });
  });

  it('a new blog can be created', function () {
    cy.contains('Add blog').click();
    cy.get('#title').type('a blog created by cypress');
    cy.get('#author').type('Testi Testaaja');
    cy.get('#url').type('www.jokublogi.fi');
    cy.contains('save').click();
  });
  describe('and when added blog exist', function () {
    beforeEach(function () {
      cy.addBlog({
        title: 'a blog created by cypress',
        author: 'Testi Testaaja',
        url: 'www.jokublogi.fi',
      });
      cy.addBlog({
        title: 'second blog created by cypress',
        author: 'Testi Testaaja',
        url: 'www.jokublogi.fi',
        likes: 10,
      });
      cy.addBlog({
        title: 'third blog created by cypress',
        author: 'Testi Testaaja',
        url: 'www.jokublogi.fi',
        likes: 5,
      });
    });
    it('the blogs are arranged in descending order based on likes', function () {
      cy.contains('view').click();
      cy.contains('second blog created by cypress');
      cy.contains('likes: 10');
    });
    it('information on the blogs can viewed', function () {
      cy.get('.view').click({ multiple: true });
      cy.contains('a blog created by cypress');
      cy.contains('Testi Testaaja');
      cy.contains('www.jokublogi.fi');
    });
    it('the blog can be liked', function () {
      cy.contains('third blog created by cypress')
        .parent()
        .find('button')
        .click();
      cy.get('.like').click();
      cy.contains('likes: 6');
    });
    it('the blog can be deleted by the user who added it', function () {
      cy.contains('third blog created by cypress')
        .parent()
        .find('button')
        .click();
      cy.get('.del').click();
      cy.contains('removed blog');
      // .and('have.css', 'color', 'rgb(0, 0, 255)')
      // .and('have.css', 'border-style', 'solid');
    });
    it('but the blog can not be deleted by other users', function () {
      cy.contains('third blog created by cypress')
        .parent()
        .find('button')
        .click();
      window.localStorage.setItem(
        'loggedBlogUser',
        JSON.stringify({ username: 'tuomas' })
      );
      cy.get('.del').should('not.exist');
    });
  });
});
