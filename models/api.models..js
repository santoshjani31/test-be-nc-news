const db = require('../db/connection');

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticlesById = (article_id) => {
  return db
    .query(
      `
    SELECT * FROM articles
    WHERE article_id = $1
    `,
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return rows;
    });
};

exports.fetchArticles = () => {
  return db
    .query(
      `
    SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id):: INT AS comment_count
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `,
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return db
          .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
          .then(({ rows: articles }) => {
            if (articles.length === 0) {
              return Promise.reject({ status: 404, msg: 'Article not found' });
            }
            return [];
          });
      }
      return rows;
    });
};
