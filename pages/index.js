import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Link, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useState } from 'react';
import ApiIcon from '@mui/icons-material/Api';
import MoodIcon from '@mui/icons-material/Mood';

export default function Index() {
  const [newsData, setNewsData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);

  function callNewsAPI() {
    axios
      .get('/api/news')
      .then((res) => {
        setNewsData(res.data.response);
        console.log('🚀 ~ .then ~ res.data.response', res.data.response);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }
  function setBgColor(score) {
    if (score < 0) return '#ec407a';

    if (score >= 1) return '#9ccc65';

    return '#29b6f6';
  }

  function calculateSentiment() {
    const newsDescriptionOnly = newsData.articles.map((el) => el.description);
    console.log(
      '🚀 ~ calculateSentiment ~ newsDescriptionOnly',
      newsDescriptionOnly
    );

    axios
      .post('/api/sentiment', {
        newsArray: newsDescriptionOnly,
      })
      .then((res) => {
        console.log(res.data.sentiment);
        setSentimentData(res.data.sentiment);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 2 }}>
        <Typography variant='h2' component='h1' gutterBottom>
          Fetch news headlines
        </Typography>
        <Button
          sx={{ m: 1, backgroundColor: '#ff9800', color: 'black' }}
          onClick={callNewsAPI}
          variant='contained'
          size='small'
        >
          Call API
          <ApiIcon sx={{ mx: 0.5 }} />
        </Button>
        <Button
          sx={{ m: 1, backgroundColor: '#ff9800', color: 'black' }}
          onClick={calculateSentiment}
          variant='contained'
          size='small'
        >
          Analyze sentiment
          <MoodIcon sx={{ mx: 0.5 }} />
        </Button>
        <Grid sx={{ my: 2 }} container spacing={2}>
          {newsData?.articles.map((article, i) => (
            <Grid sm={12} md={6} key={i}>
              <Paper sx={{ mx: 1, px: 2, py: 1, backgroundColor: '#e8eaf6' }}>
                <Typography sx={{ fontSize: '1rem' }} variant='h6'>
                  {article.title}
                </Typography>
                {sentimentData && (
                  <Typography
                    sx={{
                      ml: 'auto',
                      mt: 1,
                      backgroundColor: setBgColor(
                        sentimentData[i].score.toFixed(2)
                      ),
                      width: 'max-content',
                      px: 1,
                      borderRadius: 1,
                    }}
                    variant='subtitle2'
                  >
                    {sentimentData[i].score.toFixed(2)}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
