# Backend for a News Application

A live version of this can be found [here](https://nc-news-bh.onrender.com/api/articles).
You may wish to install a JSON viewer extension to view the data in a more manageable format. [Here](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc) is one that I use in Chrome.

If you would like to make a clone of this repo please run this following command:

```
git clone https://github.com/SmagicJones/nc_news_public.git
```

## Install the dependencies

```
$ npm install
$ npm install -D jest
$ npm install -D jest-sorted

```

## Set up your environment variables

In order to connect to the the test and development databases you must set up your own .env.test and .env.development files

.env.test should contain:

```
PGDATABASE=nc_news_test
```

.env.development should contain:

```
PGDATABASE=nc_news
```

## Seed the Databases

```
$ npm run setup-dbs
$ npm run seed
```

## API Endpoints

**GET** /api/topics

- Returns all the article topics

**GET** /api/users

- Returns all the users

**GET** /api/articles

- Returns all the articles
- Can also use an optional topic query

**GET** /api/articles/:article_id

- Returns an individual article

**GET** /api/articles/:article_id/comments

- Returns all the comments made on an article

**POST** /api/articles/:article_id/comments

- Adds a new comment to an article

Example request:

```
{"username": "mitch", "body": "This is my favourite article"}
```

Example response:

```
{"comment_id": 21,
"body": "This is my favouite article",
"author": "mitch",
"votes": 1,
"created_at": "2023-06-11T09:50:39.501Z"
}
```

**PATCH** /api/articles/:article_id/

- Updates the articles vote count

Example request body:

```
{"inc_votes: 1}
```

Example response:

Example response:

```
{ "article_id": 1,
"title": "Living in the shadow of a great man",
"topic": "mitch",
"author": "butter_bridge",
"body": "I find this existence challenging",
"created_at": "2020-07-09T20:11:00.000Z",
"votes": 101,
"article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700" };

```

**DELETE** /api/comments/:comment_id/

- Deletes the comment
