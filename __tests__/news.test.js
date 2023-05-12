const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')
const data = require('../db/data/test-data')
const seed = require('../db/seeds/seed')

const endpoints = require('../endpoints.json')



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

                expect(result.body[0]).toHaveProperty('description')
                expect(result.body[0]).toHaveProperty('slug')
            })
    })
})

describe('GET: status 200 - responds with a JSON object that shows all the possible endpoint', () => {
    it('returns a JSON with all the endpoints detailed.', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then((result) => {
                expect(result.body).toEqual(endpoints)
            })
    })
})

describe('GET: status 200 - responds with an article', () => {
    it('returns an article using the article_id given', () => {
        return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then((result) => {
                expect(result.body.article[0].title).toBe('Living in the shadow of a great man')
                expect(result.body.article[0].topic).toBe('mitch')
            })
    })
})

describe('GET: status 200 - responds with all the articles', () => {
    it('returns all the articles with a comment count', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then((result) => {
                result.body.articles.forEach((article) => {
                    expect(typeof article.title).toBe('string')
                    expect(typeof article.votes).toBe('number')
                })
            })
    })
})

describe('GET: status 200 - resonds with the comments from an article_id', () => {
    it('returns all the comments from a given article_id', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((result) => {
                result.body.comments.forEach((comment) => {
                    expect(typeof comment.body).toBe('string')
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.article_id).toBe('number')
                })
            })
    })
})

describe('GET: status 200 - resonds with the comments from an article_id', () => {
    it('returns all the comments from a given article_id', () => {
        return request(app)
            .get('/api/articles/3/comments')
            .expect(200)
            .then((result) => {
                result.body.comments.forEach((comment) => {
                    expect(typeof comment.body).toBe('string')
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.article_id).toBe('number')
                })
            })
    })
})

describe('GET: status 200 - responds with an empty array', () => {
    it('returns an empty array when given an article_id with no comments', () => {
        return request(app)
            .get('/api/articles/2/comments')
            .expect(200)
            .then((result) => {
                expect(result.body.comments).toEqual([])
            })
    })
})

describe('GET: status 400 - responds with not found', () => {
    it('returns a status code of 400 and a message Invalid input', () => {
        return request(app)
            .get('/api/articles/dog/comments')
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('Invalid input')
            })
    })
})

describe('GET: status 404 - responds with not found', () => {
    it('returns a status code of 404 and a message of not found', () => {
        return request(app)
            .get('/api/articles/99999999/comments')
            .expect(404)
            .then((result) => {
                expect(result.body.message).toBe('not found')
            })
    })
})