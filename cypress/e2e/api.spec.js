
describe('API Tests', () => {
    it('should fetch all posts and assert 200 HTTP status code response', () => {
        cy.request({
            method: 'GET',
            url: '/posts'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(100);
            expect(response.body[0]).to.have.property('userId');
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('body');
        });
    });

    it('should fetch all posts from userId=1 and post count', () => {
        cy.request({
            method: 'GET',
            url: '/users/1/posts'
        }).then((response) => {
            const userCount = response.body.length;
            expect(response.status).to.equal(200);
            expect(response.body[0]).to.have.property('userId');
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('body');
            expect(userCount).to.equal(10);
            // NB: This is a bad practice but for the purpose of this assessment
            cy.log('response count:', userCount);
        });
    });
    it('should create a post with userId=1', () => {
        cy.request('POST', '/posts', {
                title: 'New post title',
                userId: 1,
                body: 'This is the content of the new post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        ).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('userId');
            expect(response.body).to.have.property('title');
            expect(response.body).to.have.property('body');
        });
    });
});
