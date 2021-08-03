import request from "supertest";
import { app } from "../../app";

// const request = supertest.agent(app)

    it('responds with details about the current user',  async () => {
        const authResponse =  request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)
        
        const cookie = authResponse.get('Set-Cookie')
    
        const response =  request(app)
            .get('/api/users/currentuser')
            .set('Cookie', cookie)
            .send()
            .expect(200)
            .end((err,res) => {
                expect(res.body.currentUser.email).toEqual('test@test.com')
            })


            
    })
