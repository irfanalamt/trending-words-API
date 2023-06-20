import ApiIcon from '@mui/icons-material/Api';
import MoodIcon from '@mui/icons-material/Mood';
import {Button, Card, CardContent, CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import {useState} from 'react';

export default function Index() {
  const [newsData, setNewsData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(false);

  // send GET request to backend; backend returns newsData from NEWS API
  function callNewsAPI() {
    setLoading(true);
    axios
      .get('/api/news')
      .then((res) =>
        // filter out articles with no description
        setNewsData(res.data.response.articles.filter((el) => el.description))
      )
      .catch((err) => console.log('err:', err))
      .finally(() => setLoading(false));
  }

  // set score bgColor based on sentiment score
  function setBgColor(article) {
    if (article.vote === 'negative' || article.score < 0) return '#ef5350';
    else return '#66bb6a';
  }

  function calculateSentiment() {
    // Extract desciption from articles; create newArray of article descriptions
    const newsDescriptionAndTitle = newsData.map(
      (el) => `${el.title}.${el.description}`
    );

    // Send array to backend; backend does sentiment analysis using NLP; return array of sentiment scores
    axios
      .post('/api/sentiment', {
        newsArray: newsDescriptionAndTitle,
      })
      .then((res) => {
        setSentimentData(res.data.sentiment);
        console.log('res = ' + JSON.stringify(res.data.sentiment[0]));
      })
      .catch((err) => console.log('err:', err));
  }

  return (
    <Container maxWidth='md' sx={{p: 2}}>
      <Typography
        variant='h4'
        align='left'
        sx={{fontWeight: 'bold', fontFamily: 'monospace', mb: 1}}>
        WORD TRENDS
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {xs: 'column', sm: 'row'},
          mb: 4,
          gap: 1,
        }}>
        <Button
          variant='outlined'
          onClick={callNewsAPI}
          startIcon={<ApiIcon />}>
          Call API
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={calculateSentiment}
          disabled={!newsData}
          startIcon={<MoodIcon />}>
          Analyze Sentiment
        </Button>
      </Box>
      <Grid container spacing={2} alignItems='stretch'>
        {loading ? (
          <CircularProgress sx={{mt: 4, mx: 'auto'}} />
        ) : (
          newsData?.map((article, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card variant='outlined' sx={{backgroundColor: '#f5f5f5'}}>
                <CardContent>
                  <Typography variant='h5' component='h2' gutterBottom>
                    {article.title}
                  </Typography>
                  {sentimentData && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        mt: 2,
                      }}>
                      <Typography variant='caption'>Sentiment Score</Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          backgroundColor: setBgColor(sentimentData[i]),
                          px: 1,
                          py: 0.5,
                          ml: 1,
                        }}>
                        {sentimentData[i].score.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {newsData && (
        <Typography variant='body2' align='center' sx={{my: 3}}>
          Life is good. ✨
        </Typography>
      )}
    </Container>
  );
}
