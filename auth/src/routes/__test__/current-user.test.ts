import request from "supertest";
import { app } from "../../app";

// const request = supertest.agent(app)

    it('responds with details about the current user',  async () => {
        const cookie = await global.signin();
    
        const response =  request(app)
            .get('/api/users/currentuser')
            .set('Cookie', cookie)
            .send()
            .expect(200)
            .end((err,res) => {
                expect(res.body.currentUser.email).toEqual('test@test.com')
            })


            
    })
