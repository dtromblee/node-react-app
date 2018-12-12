const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('../../server');
const Todo = require('../../models/todo');

let counter = 0;

const todos = [{
  _id: new ObjectID(),
  title: `Sample ${++counter}`,
  description: `Description for Sample ${counter}`
},
{
  _id: new ObjectID(),
  title: `Sample ${++counter}`,
  description: `Description for Sample ${counter}`
},
{
  _id: new ObjectID(),
  title: `Sample ${++counter}`,
  description: `Description for Sample ${counter}`
}];

describe('Todo API', () => {

  beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
      Todo.insertMany(todos).then((docs) => { done(); }, (err) => { done(err); });
    }, (err) => {
      return done(err);
    });
  });

  describe('GET /todos', () => {
    it('should return all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.results.length).toBe(3);
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
      title: `Sample ${++counter}`,
      description: `Description for Sample ${counter}`
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
    it('should update the expected todo with the supplied properties', () => {
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
        })
        .end((err, res) => {
          if (err) return done(err);

          Todo.findById(id).then((todo) => {
            expect(todo.description).toEqual(description);
            expect(todo.completed).toEqual(completed);
            expect(todo.completedAt).toEqual(completedAt);
            done();
          })
        });
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
