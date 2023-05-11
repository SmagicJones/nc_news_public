\c nc_news_test


SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
GROUP BY articles.article_id;

-- SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id FROM articles
-- LEFT JOIN comments
-- ON articles.article_id = comments.article_id
-- WHERE articles.article_id = 1
-- ORDER BY created_at DESC