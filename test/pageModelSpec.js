var expect = require('chai').expect
var models = require('../models/models.js');
var Page = models.Page;
var User = models.User;
var marked = require('marked');



describe('Page model', function() {

  before(function(done) {
    User.sync({
        force: true
      })
      .then(function() {
        return Page.sync({
          force: true
        });
      })
      .then(function() {
        done()
      }).catch(done)
  })

  var dummyPage;

  beforeEach(function() {
    dummyPage = Page.build({
      title: 'Fake Content',
      urlTitle: 'fake_content',
      tags: ['potato', 'dishwasher'],
      content: 'This is dummy content'
    })
  })

  describe('Virtuals', function() {
    describe('route', function() {
      it('returns the url_name prepended by "/wiki/"', function() {
        expect(dummyPage.route).to.be.equal(
          '/wiki/fake_content');
      });
    });

    describe('renderedContent', function() {
      it('converts the markdown-formatted content into HTML',
        function() {
          expect(dummyPage.renderedContent).to.be.equal(marked(
            dummyPage.content));
        });
    });
  });

  describe('Class methods', function() {
    describe('findByTag', function() {

      beforeEach(function(done) {
        Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
          })
          .then(function() {
            done();
          })
          .catch(done);
      });
      //
      afterEach(function(done) {
        Page.destroy({
            where: {
              title: 'foo',
              content: 'bar',
              tags: ['foo', 'bar']
            }
          })
          .then(function() {
            done();
          })
          .catch(done);
      });

      it('gets pages with the search tag', function(done) {
        Page.findByTag('bar')
          .then(function(pages) {
            expect(pages).to.have.lengthOf(1);
            done();
          })
          .catch(done);
      });

      it('does not get pages without the search tag', function(done) {
        Page.findByTag('mango')
          .then(function(pages) {
            expect(pages).to.have.lengthOf(0);
            done();
          })
          .catch(done);
      });
    });
  });
});

// describe('Instance methods', function() {
//     beforeEach(function(done) {
//       Promise.all([
//           Page.create({
//             title: 'foo1',
//             content: 'bar',
//             tags: ['boo', 'bar']
//           }),
//           Page.create({
//             title: 'foo2',
//             content: 'bar',
//             tags: ['boo', 'bar']
//           }),
//           Page.create({
//             title: 'foo3',
//             content: 'bar',
//             tags: ['boo', 'bar']
//           })
//         ])
//         .then(function() {
//           done();
//         })
//         .catch(done);
//     });
//   });
//
//   afterEach(function(done) {
//     Promise.all([
//         Page.destroy({
//           title: 'foo1',
//           content: 'bar',
//           tags: ['boo', 'bar']
//         }),
//         Page.destroy({
//           title: 'foo2',
//           content: 'bar',
//           tags: ['boo', 'bar']
//         }),
//         Page.destroy({
//           title: 'foo3',
//           content: 'bar',
//           tags: ['boo', 'bar']
//         })
//       ])
//       .then(function() {
//         done();
//       })
//       .catch(done);
//   });
// });
//
// describe('findSimilar', function() {
//   it('never gets itself', function() {
//     Page.findSimilar('mango')
//       .then(function(pages) {
//         expect(pages).to.have.lengthOf(2);
//         done();
//       })
//       .catch(done);
//   });
// });
//
// it('gets other pages with any common tags');
// it('does not get other pages without any common tags');
// });
// });
//
// describe('Validations', function() {
//   it('errors without title');
//   it('errors without content');
//   it('errors given an invalid status');
// });
//
// describe('Hooks', function() {
//   it('it sets urlTitle based on title before validating');
// });
