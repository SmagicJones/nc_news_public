const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')
const data = require('../db/data/test-data')
const seed = require('../db/seeds/seed')


beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    return connection.end();
});

describe('invalid endpoint', () => {
    it('returns an object displaying invalid endpoint message', () => {
        return request(app)
            .get('/api/smells')
            .expect(404)
            .then((result) => {
                expect(result.body.message).toBe('invalid endpoint')
            })
    })
})

describe('GET: status 200 - responds with an array of topic objects each with slug and description properties', () => {
    it('returns an array of all the topics in the test data', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((result) => {
                expect(result.body.length).toBe(3);
                expect(result.body).toEqual([{
                        description: 'The man, the Mitch, the legend',
                        slug: 'mitch'
                    },
                    {
                        description: 'Not dogs',
                        slug: 'cats'
                    },
                    {
                        description: 'what books are made of',
                        slug: 'paper'
                    }
                ])
            })
    })
})