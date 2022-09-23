const { SentimentAnalyzer } = require('node-nlp');
const sentiment = new SentimentAnalyzer({ language: 'en' });

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const { newsArray } = req.body;
  let resultArray = [];

  console.log('newsArray: ', newsArray);
  //   newsArray.forEach((element) => {
  //     sentiment.getSentiment(element).then((result) => {
  //       resultArray.push(result);
  //     });
  //   });
  const status = await Promise.all(
    newsArray.map((el) => sentiment.getSentiment(el))
  );

  console.log('resultArray: serv', status);
  res.status(200).json({ sentiment: status });

  return;
}
