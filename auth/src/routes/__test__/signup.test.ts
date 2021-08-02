import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
    request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
    })
      .expect(201)
})

it('returns a 400 with an invalid email', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
          email: 'test',
          password: 'password'
      })
        .expect(400)
})

it('returns a 400 with an invalid password', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
          email: 'test',
          password: 'p'
      })
        .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com' })
        .expect(400)

    request(app)
        .post('/api/users/signup')
        .send({ password: 'password' })
        .expect(400)
})

it('disallows duplicate emails', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(201)

    request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async () => {
   const response = request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie'))
})