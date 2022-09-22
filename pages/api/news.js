const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

export default function handler(req, res) {
  if (req.method !== 'GET') return;

  newsapi.v2
    .topHeadlines({
      language: 'en',
    })
    .then((response) => {
      console.log('response:', response);
      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(500).json({ response: err });
    });
}
