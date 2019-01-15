const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('../../server');
const Todo = require('../../models/todo');
const {todos, populateTodos} = require('./seed');

describe('Todo API', () => {

  beforeEach(populateTodos);

  describe('GET /todos', () => {
    it('should return all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.results.length).toBe(todos.length);
        })
        .end(done);
    });
  });

  describe('GET /todos:id', () => {
    it('should return a single todo with the correct id', (done) => {
      let id = todos[0]._id.toString();
      request(app)
        .get(`/todos/${id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.result).not.toEqual(undefined);
          expect(res.body.result._id).toEqual(id);
        })
        .end(done);
    });

    it('should return a 404 when supplied with an incorrect id', (done) => {
      let id = 1234;
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
  });

  describe('POST /todos', () => {
    const newTodo = {
      title: `Sample ${todos.length + 1}`,
      description: `Description for Sample ${todos.length + 1}`
    };

    it('should create a new todo', (done) => {
      request(app)
        .post('/todos')
        .send(newTodo)
        .expect(200)
        .expect((res) => {
          expect(res.body.result.title).toBe(newTodo.title);
        })
        .end((err, res) => {
          if (err) return done(err);

          Todo.find({title: newTodo.title}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].title).toBe(newTodo.title);
            done();
          }, (err) => {
            return done(err);
          })
          .catch((e) => done(e));
      });
    });
  });

  describe('PATCH /todos/:id', () => {
    it('should update the expected todo with the supplied properties', (done) => {
      let id = todos[0]._id.toString();
      let updateValues = {
        description: 'New Description',
        completed: true,
        completedAt: Date.now()
      };

      request(app)
        .patch(`/todos/${id}`)
        .send(updateValues)
        .expect(200)
        .expect((res) => {
          expect(res.body.result).not.toEqual(undefined);
          expect(res.body.result.description).toEqual(updateValues.description);
          expect(res.body.result.completed).toEqual(updateValues.completed);
        })
        .end(done);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete the todo with the supplied id', (done) => {
      let id = todos[0]._id.toString();

      request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
        });
    });
  });
});
