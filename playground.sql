\c nc_news_test


-- SELECT author, title, article_id, body AS topic, created_at, votes, article_img_url FROM articles
-- LEFT JOIN comments
-- ON COUNT(SELECT articles.article_id = comments.article_id)

SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
GROUP BY articles.article_id;


-- SELECT COUNT(*)
-- FROM articles
-- WHERE votes = 0;