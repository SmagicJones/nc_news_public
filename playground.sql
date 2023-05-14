\c nc_news_test


-- SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
-- FROM articles
-- LEFT JOIN comments
-- ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id;

-- SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments
-- WHERE comments.article_id = 2
-- ORDER BY created_at DESC


-- relevent here for post request is username which is author in the comments table
-- and body which has the same name in comments table
-- INSERT INTO comments (author, body) VALUES ('BOBBY', 'try this out') RETURNING *;



-- SELECT * FROM comments WHERE author = 'icellusedkars';

SELECT * FROM articles

-- UPDATE articles SET votes =  WHERE article_id = 1 RETURNING *