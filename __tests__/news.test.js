const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')
const data = require('../db/data/test-data')
const seed = require('../db/seeds/seed')

const endpoints = require('../endpoints.json')

const sorted = require('jest-sorted');



beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    return connection.end();
});

describe('invalid endpoint', () => {
    it('returns an object displaying invalid endpoint message', () => {
        return request(app)
            .get('/api/nonsense')
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
    it('returns an article using the article_id given with comment count', () => {
        return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then((result) => {
                expect(result.body.article[0].title).toBe('Living in the shadow of a great man')
                expect(result.body.article[0].topic).toBe('mitch')
                expect(typeof result.body.article[0].comment_count).toBe("string");
            })
    })
    it('returns 404 when given a non existent article_id', () =>{
        return request(app)
        .get('/api/articles/9999999')
        .expect(404)
        .then((result)=>{
            expect(result.body.message).toBe('Article not found');
        })
    })
})

describe('GET: status 200 - responds with all the articles', () => {
    it('returns all the articles with a comment count', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then((result) => {
               
                const {articles} = result.body.articles
               
              

                    articles.forEach((article) => {
                    expect(typeof article.title).toBe('string')
                    expect(typeof article.votes).toBe('number')
                    expect(typeof article.author).toBe('string')
                    expect(typeof article.topic).toBe('string')
                    expect(typeof article.created_at).toBe('string')
                    expect(typeof article.article_img_url).toBe('string')
                    expect(typeof article.comment_count).toBe('string')

                })

               

                expect(typeof result.body.articles.total_count[0].count).toBe('number')
            })
    })
    it('returns all the articles with a given topic query', () => {
        return request(app)
            .get('/api/articles?topic=cats')
            .expect(200)
            .then((result) => {
                const {articles} = result.body.articles;
                articles.forEach((article) => {
                    expect(article.topic).toBe('cats')
                })
            })
    })
    it('returns all the articles with a given topic query', () => {
        return request(app)
            .get('/api/articles?topic=mitch&limit=20')
            .expect(200)
            .then((result) => {
                const {articles} = result.body.articles;
                articles.forEach((article) => {
                    expect(article.topic).toBe('mitch')
                })
               
            })
    })
    it('returns all the articles with a given topic query', () => {
        return request(app)
            .get('/api/articles?topic=nonsense')
            .expect(404)
            .then((result) => {
               expect(result.body.message).toBe('not found')
                })
            })
            it('returns all the articles with a given topic query', () => {
                return request(app)
                    .get('/api/articles?topic=123')
                    .expect(404)
                    .then((result) => {
                       expect(result.body.message).toBe('not found')
                        })
                    })
            })
            it("returns articles ordered by valid query", () => {
                return request(app)
                .get('/api/articles?sort_by=title&order=asc')
                .expect(200)
                .then((result)=>{
                    const {articles} = result.body.articles;
                    expect(articles).toBeSortedBy("title", {ascending: true})
                })
            })
            it("returns articles sorted by valid query", () =>{
                return request(app)
                .get('/api/articles?sort_by=title&order=asc')
                .expect(200)
                .then((result)=>{
                    const {articles} = result.body.articles;
                    expect(articles).toBeSortedBy("title", {ascending: true})
                })
            })
            it('returns articles limited by the given limit', () =>{
                return request(app)
                .get('/api/articles?limit=2')
                .expect(200)
                .then((result) => {
                    const {articles} = result.body.articles;
                    expect(articles.length).toBe(2)
                    
                })
            })
    

  



describe('get users', () => {
    it('returns all the users', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then((result) => {
                result.body.users.forEach((user) => {
                    expect(typeof user.username).toBe('string')
                    expect(typeof user.name).toBe('string')
                    expect(typeof user.avatar_url).toBe('string')
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
            .get('/api/articles/nonsense/comments')
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
                expect(result.body.message).toBe('Article not found')
            })
    })
    it('returns comments limted by the given limit query', () =>{
        return request(app)
        .get('/api/articles/1/comments?limit=2')
        .expect(200)
        .then((result) =>{
            expect(result.body.comments.length).toBe(2)
        })
    })
    it('returns an error if an invalid limit is given', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=bob')
        .expect(400)
        .then((result) =>{
            expect(result.body.message).toBe('This is not a valid limit');
        })
    })
})

describe('POST: 201', () => {
    it('returns a status of 201 and the posted comment', () => {
        const body = {
            username: 'rogersop',
            body: 'this is really excellent'
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(201)
            .then((result) => {
                expect(result.body.comment.author).toBe('rogersop')
                expect(result.body.comment.body).toBe('this is really excellent')
                expect(result.body.comment.votes).toBe(0)
                expect(result.body.comment.comment_id).toBe(19)
                expect(result.body.comment.article_id).toBe(1)
                expect(typeof result.body.comment.created_at).toBe('string')
            })
    })
    it('returns a status 400 and a message of invalid input if given a nonexistent article_id', () => {
        const body = {
            username: 'rogersop',
            body: 'this is really excellent'
        }
        return request(app)
            .post('/api/articles/nothing/comments')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('Invalid input')
            })
    })
    it('returns an error if username nonexistent', () => {
        const body = {
            username: 'JonnyVegas',
            body: 'I be big guy'
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(404)
            .then((result) => {
                expect(result.body.message).toBe('not found')
            })
    })




    it('return a status 404 and a message of not found', () => {
        const body = {
            username: 'rogersop',
            body: 'this is really excellent'
        }
        return request(app)
            .post('/api/articles/9999/comments')
            .send(body)
            .expect(404)
            .then((result) => {
                expect(result.body.message).toBe('not found')
            })
    })
    it('returns an error if asked to post an empty object', () => {
        const body = {}
        return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('invalid input')
            })
    })
    it('returns an error if more than two properties are on the object', () => {
        const body = {
            username: 'rogersop',
            body: 'this is really great',
            somethingElse: 'look at this'
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(201)
            .then((result) => {
                expect(result.body.comment.author).toBe('rogersop')
                expect(result.body.comment.body).toBe('this is really great')
                expect(result.body.comment.votes).toBe(0)
                expect(result.body.comment.comment_id).toBe(19)
                expect(result.body.comment.article_id).toBe(1)
                expect(typeof result.body.comment.created_at).toBe('string')
            })
    })
   
})

describe('patch article', () => {
    it('returns the article with the votes updated by the patched amount', () => {
        const body = {
            inc_votes: 1
        }
        return request(app)
            .patch('/api/articles/1')
            .send(body)
            .expect(200)
            .then((result) => {
                expect(result.body.patch.votes).toBe(101)
            })
    })
    it('returns the article with the votes updated by the patched amount', () => {
        const body = {
            inc_votes: -23
        }
        return request(app)
            .patch('/api/articles/2')
            .send(body)
            .expect(200)
            .then((result) => {
                expect(result.body.patch.votes).toBe(-23)
            })
    })
    it('returns 400 if given a string as an inc_votes', () => {
        const body = {
            inc_votes: 'yes'
        }
        return request(app)
            .patch('/api/articles/2')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('Invalid input')
            })
    })
    it('returns a 400 if given an object without the key of inc_votes', () => {
        const body = {
            name: "bobby"
        }
        return request(app)
            .patch('/api/articles/2')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('invalid input')
            })
    })

    it('returns a 404 if given an article_id that is a valid request but not found on db', () => {
        const body = {
            inc_votes: 23
        }
        return request(app)
            .patch('/api/articles/9999')
            .send(body)
            .expect(404)
            .then((result) => {
                expect(result.body.message).toBe('Article not found')
            })
    })

})

describe('delete article', () => {
    it('returns an error message for a article_id that is not found', () => {
        return request(app)
            .delete('/api/articles/999999')
            .expect(404)
            .then((result) => {
                expect(result.body.message).toBe('Article not found')
            })
    })
    it('returns no content', () => {
        return request(app)
            .delete('/api/articles/1')
            .expect(204)
            .then((result) => {
                expect(Object.keys(result.body).length).toBe(0)
            })
    })
})

describe('deleteComment', () => {
    it('returns an error message for a comment_id that is not found', () => {
        return request(app)
            .delete('/api/comments/999999')
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('not found')
            })
    })
    it('returns no content', () => {
        return request(app)
            .delete('/api/comments/2')
            .expect(204)
            .then((result) => {
                expect(Object.keys(result.body).length).toBe(0)
            })
    })
})

describe('getuser', () =>{
    it('returns an array of user details', () =>{
        return request(app)
        .get('/api/users/rogersop')
        .expect(200)
        .then((result)=>{
            expect(typeof result.body.user[0].name).toBe('string');
            expect(typeof result.body.user[0].username).toBe('string');
            expect(typeof result.body.user[0].avatar_url).toBe('string');
        })
    })
    it('retuns 404 when given username not in db', () => {
        return request(app)
        .get('/api/users/steve')
        .expect(404)
        .then((result) => {
            expect(result.body.message).toBe('user not found');
        })
    })
})


describe('patch comment', () => {
    it('returns the comment with the votes updated by the patched amount', () => {
        const body = {
            inc_votes: 1
        }
        return request(app)
            .patch('/api/comments/1')
            .send(body)
            .expect(200)
            .then((result) => {
                expect(result.body.patch.votes).toBe(17)
            })
    })
    it('returns the article with the votes updated by the patched amount', () => {
        const body = {
            inc_votes: -5
        }
        return request(app)
            .patch('/api/comments/2')
            .send(body)
            .expect(200)
            .then((result) => {
                expect(result.body.patch.votes).toBe(9)
            })
    })
    it('returns 400 if given a string as an inc_votes', () => {
        const body = {
            inc_votes: 'yes'
        }
        return request(app)
            .patch('/api/comments/2')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('Invalid input')
            })
    })
    it('returns a 400 if given an object without the key of inc_votes', () => {
        const body = {
            name: "bobby"
        }
        return request(app)
            .patch('/api/comments/2')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('invalid input')
            })
    })

    it('returns a 404 if given an article_id that is a valid request but not found on db', () => {
        const body = {
            inc_votes: 23
        }
        return request(app)
            .patch('/api/comments/9999')
            .send(body)
            .expect(400)
            .then((result) => {
                expect(result.body.message).toBe('not found')
            })
    })

})

describe('POST article: 201', () => {
    it('returns a status of 201 and the posted article', () => {
        const body = {
            author: 'rogersop',
            title: 'this is really excellent',
            topic: 'mitch',
            body: 'Something something something',
            article_img_url: 'www.bob.com'
        }
        return request(app)
            .post('/api/articles')
            .send(body)
            .expect(201)
            .then((result) => {
                expect(result.body.article.author).toBe('rogersop')
                expect(result.body.article.title).toBe('this is really excellent')
                expect(result.body.article.topic).toBe('mitch')
                expect(result.body.article.body).toBe('Something something something')
                expect(result.body.article.article_img_url).toBe('www.bob.com')
            })
    })
   
   
    it('returns an error if passed an empty object', () => {
        const body = {}
        return request(app)
            .post('/api/articles')
            .send(body)
            .expect(400)
            .then((result) => {
              expect(result.body.message).toBe('invalid input')
            })
    })
})

describe('201, new topic posted', () => {
    it('returns topics including the new one', () => {
        const body = {
            slug: "this is awesome",
            description: "the best thing you will ever read"
        }
        return request(app)
            .post('/api/topics')
            .send(body)
            .expect(201)
            .then((result) => {
               expect(result.body.topic.slug).toBe('this is awesome');
               expect(result.body.topic.description).toBe('the best thing you will ever read');
            })
    })
})