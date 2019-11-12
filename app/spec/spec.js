import Request from 'request';
import fs from 'fs';
import servers from '../server/server';

//DONE
describe('Server setup', () => {
  let server;
  beforeAll(() => {
    server = servers;
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
    server = servers;
  });

  describe('unauthenticated user should not access protected routes', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: 'http://localhost:3000/api/v1/articles',
        form: {title: 'test article', article: 'this is a test article', appr_status: true}
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
        form: {title: 'test articles', article: 'this is a test article', appr_status: true}
        }, (err, res, body) => {
        if(err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    // specs design
    it('Should return status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should return a user', () => {
      expect(data.body['data']['title']).toBe('test articles');
    });
  });
});
//DONE
describe('API endpoint tests', () => {
  let server;
  beforeAll(() => {
    server = servers;
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
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: {
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
// Done
  describe('DELETE /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.delete({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/25'
      }, (err, resp, body) => {
        if(err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      })
    });
    // test specs
    it('Should delete an article', () => {
      expect(data.body["data"]["message"]).toBe("Article successfully deleted");
    });

  });
// DONE
  describe('GET /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/2'
      }, (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('Should return an article with article id equals to 2', () => {
      expect(data.body['data']['id']).toBe(2);
    });
    it('Should return an article with title', () => {
      expect(data.body['data']['title']).toEqual("the changed article title");
    });
  });
// DONE
  describe('POST /gifs', () => {
    const data = {};
    beforeAll((done) => {
      var req = Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs'
      }, (err, res, body) => {
        if(err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        console.log('the gif body', data);
        done();
      });

      var form = req.form();
      form.append('gifPost', fs.createReadStream('Certificate.jpg'));
      form.append('gif_title', 'my first gif test');
      form.append('appr_status', 'false');
      // form.append('gif_id', '303030');
    })
    // spec test
    it('Should return the gif title upon successful creation', () => {
      expect(data.body['data']['title']).toBe('my first gif test');
    });
    it('Should return a successful creation message', () => {
      expect(data.body['status']).toBe('success');
    });

  });
// Done
  describe('PATCH /articles/:articleId', () => {

    const data = {};
    beforeAll((done) => {
      Request.patch({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/3',
        form: {
          title: 'updated article title',
          article: 'this is a test article update'
        }
      }, (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('Should update and article and return the article id', () => {
      expect(data.body['data']['title']).toBe('updated article title');
    });

  });
// Done
  describe('POST /gifs/:gifId/comment', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs/9/comment',
        form: {
          "comments": "This is a new gif comment"
        }
      }, (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('should return a status code of 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should return the new gif comment created', () => {
      expect(data.body["data"]["comment"]).toEqual("This is a new gif comment")
    });
  });
// Done
  describe('GET /gifs/:gifId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
          },
          url: 'http://localhost:3000/api/v1/gifs/27'
        }, (err, res, body) => {
          if(err) throw err;
          data.status = res.statusCode;
          data.body = JSON.parse(body);
          done();
      });
    });
    //test spec
    it('should return a status code of 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should return the gif Title', () => {
      expect(data.body["data"]["title"]).toEqual("my first gif test");
    });

  });
// Done
  describe('GET /feed', () => {

    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/feed'
      }, (err, resp, body) => {
        if(err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      })
    });
    // test specs
    it('Should return a status code of 200', () => {
      expect(data.body["status"]).toBe("success");
    });

  });
// Done
  describe('DELETE /gifs/:gifId', () => {

    const data = {};
    beforeAll((done) => {
      Request.delete({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs/19'
      }, (err, resp, body) => {
        if(err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      })
    });
  
    // test specs
    it('Should delete a gif post', () => {
      expect(data.body["data"]["message"]).toBe("gif post successfully deleted");
    });
    it('Should send a status of 200', () => {
      expect(data["status"]).toBe(200);
    });

  });
// Done
   describe('POST /articles/:articleId/comment', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/7/comment',
        form: {
          "comments": "This is a new article comment"
        }
      }, (err, res, body) => {
        if(err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('should return a status code of 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should return the new article comment created', () => {
      expect(data.body["data"]["comment"]).toEqual("This is a new article comment")
    });

  });

});
