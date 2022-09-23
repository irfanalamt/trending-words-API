const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

export default function handler(req, res) {
  if (req.method !== 'GET') return;

  newsapi.v2
    .topHeadlines({
      language: 'en',
    })
    .then((response) => res.status(200).json({ response }))
    .catch((err) => res.status(500).json({ response: err }));
}
