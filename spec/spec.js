const Request = require('request');
const fs = require('fs');
console.log('this one started second');

//DONE
describe('Server setup', () => {
  console.log('this one started third');
  let server;
  beforeAll(() => {
    server = require('../server/server');
  });
  describe('Test the server', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/test', (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('Should return status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should respond with body message', () => {
      expect(data.body).toBe('Request received');
    });
  });
});
//DONE
describe('JWT route protection', () => {
  let server;
  beforeAll(() => {
    server = require('../server/server');
  });

  describe('unauthenticated user should not access protected routes', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: 'http://localhost:3000/api/v1/articles',
        form: {article_id: 3000, title: 'test article', article: 'this is a test article', appr_status: true}
      },  (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('should return error 401', () => {
      expect(data.status).toBe(401);
    });
    it('should return unathorized', () => {
      expect(data.body).toBe('{"Server Error":"Unauthorized access 1"}');
    });
  });

  describe('authenticated user should access protected routes', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type' : 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: {article_id: 10000, title: 'test article', article: 'this is a test article', appr_status: true}
        }, (err, res, body) => {
        if(err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        console.log('the JWT body', data)
        done();
      });
    });
    // specs design
    it('Should return status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should return a user', () => {
      expect(data.body["data"]["title"]).toBe('test article');
    });
  });
});

describe('API endpoint tests', () => {
  let server;
  let giffile;
  beforeAll(() => {
    server = require('../server/server');
  });

  // DONE
  // describe('POST /auth/create-user', () => {
  //   const data = {};
  //   beforeAll((done) => {
  //     Request.post({
  //       headers: {
  //         'content-type': 'x-www-form-urlencoded',
  //         'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMwNjAzMDIsImV4cCI6MTU3NDUwMDMwMn0.ub6P4wBGuulB_c7TrGv9TtmBvYjMzVx0yfXqWrXDMOE'
  //       },
  //       url: 'http://localhost:3000/api/v1/auth/create-user',
  //       form: {
  //         firstname: 'bimbo',
  //         lastname: 'fetuga',
  //         email: 'bimbo@gmail.com',
  //         employee_password: 'bimbo',
  //         gender: 'female',
  //         jobrole: 'I.T',
  //         employee_no: 902410,
  //         department: 'Sales'
  //       }
  //     }, (err, res, body) => {
  //       if(err) throw err;
  //       data.status = res.statusCode;
  //       data.body = JSON.parse(body);
  //       done();
  //     });
  //   });
  //   // test specs
  //   it('Should return a successfully created employee', () => {
  //     expect(data.body['data']['message']).toBe('User account successfully created');
  //   });
  // });
// DONE
  describe('POST /auth/signin', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'http://localhost:3000/api/v1/auth/signin',
        form: {
          username: 'gnztrade@gmail.com',
          password: 'tosin'
        }
      }, (err, res, body) => {
        if(err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      }); 
    });
    //test specs
    it('Should return a successful login message', () => {
      expect(data.body['status']).toBe('success');
    });
  }); 
// DONE
  describe('POST /articles', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: {
          article_id: 20000,
          title: 'my test article',
          article: 'this is a test article creation',
          appr_status: false
        }
      }, (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('Should create and article and return article id', () => {
      expect(data.body['data']['message']).toBe('Article successfully posted');
    });
  });

  describe('PATCH /articles/:articleId', () => {

  });

  describe('DELETE /articles/:articleId', () => {

  });

  describe('POST /articles/:articleId/comment', () => {

  });
// DONE
  describe('GET /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/2'
      }, (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        console.log('this is the data', data);
        done();
      });
    });
    //test spec
    it('Should return an article with article id equals to 2', () => {
      expect(data.body['data']['id']).toBe(2);
    });
    it('Should return an article with comments', () => {
      expect(data.body['data']['comments']).toEqual([
        {
            "commentid": 1,
            "comment": "this is  a new comment",
            "authorid": 2,
            "createdon": "2019-10-10T00:00:00.000Z"
        },
        {
            "commentid": 2,
            "comment": "this is a comment by another employee",
            "authorid": 3,
            "createdon": "2019-10-09T00:00:00.000Z"
        }
    ]);
    });
  });
// DONE
  describe('POST /gifs', () => {
    const data = {};
    beforeAll((done) => {
      var req = Request.post({
        headers: {
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs'
      }, (err, res, body) => {
        if(err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });

      var form = req.form();
      form.append('gifPost', fs.createReadStream('Certificate.jpg'));
      form.append('gif_title', 'my first gif test');
      form.append('appr_status', 'false');
    })
    // spec test
    it('Should return the gif title upon successful creation', () => {
      expect(data.body['data']['title']).toBe('my first gif test');
    });
    it('Should return a successful creation message', () => {
      expect(data.body['status']).toBe('success');
    });

  });

  describe('POST /gifs/:gifId/comment', () => {

  });

  describe('PATCH /gifs/:gifId', () => {

  });

  describe('GET /gifs/:gifId', () => {

  });

  describe('GET /feed', () => {

  });

  describe('DELETE /gifs/:gifId', () => {

  });

});
