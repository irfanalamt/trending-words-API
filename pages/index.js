import ApiIcon from '@mui/icons-material/Api';
import MoodIcon from '@mui/icons-material/Mood';
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useState } from 'react';

export default function Index() {
  const [newsData, setNewsData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);

  // send GET request to backend; backend returns newsData from NEWS API
  function callNewsAPI() {
    axios
      .get('/api/news')
      .then((res) =>
        // filter out articles with no description
        setNewsData(res.data.response.articles.filter((el) => el.description))
      )
      .catch((err) => console.log('err:', err));
  }

  // set score bgColor based on sentiment score
  function setBgColor(score) {
    if (score < 0) return '#ec407a';

    if (score >= 1) return '#9ccc65';

    return '#29b6f6';
  }

  function calculateSentiment() {
    // Extract desciption from articles; create newArray of article descriptions
    const newsDescriptionOnly = newsData.map((el) => el.description);
    console.log(
      '🚀 ~ calculateSentiment ~ newsDescriptionOnly',
      newsDescriptionOnly
    );

    // Send array to backend; backend does sentiment analysis using NLP; return array of sentiment scores
    axios
      .post('/api/sentiment', {
        newsArray: newsDescriptionOnly,
      })
      .then((res) => setSentimentData(res.data.sentiment))
      .catch((err) => console.log('err:', err));
  }

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 2 }}>
        <Typography
          sx={{
            backgroundColor: '#eceff1',
            width: 'max-content',
            p: 1,
            boxShadow: 1,
            m: 1,
            fontSize: '3rem',
          }}
          variant='h3'
          component='h3'
          gutterBottom
        >
          Fetch news
        </Typography>
        <Button
          sx={{ m: 1, backgroundColor: '#26a69a', color: 'black' }}
          onClick={callNewsAPI}
          variant='contained'
          size='small'
        >
          Call API
          <ApiIcon sx={{ mx: 0.5, fontSize: '1.2rem' }} />
        </Button>
        <Button
          sx={{ m: 1, backgroundColor: '#ffa726', color: 'black' }}
          onClick={calculateSentiment}
          variant='contained'
          size='small'
          disabled={!newsData}
        >
          Analyze sentiment
          <MoodIcon sx={{ mx: 0.5, fontSize: '1.2rem' }} />
        </Button>
        <Grid sx={{ my: 2 }} container spacing={2}>
          {newsData?.map((article, i) => (
            <Grid sm={12} md={6} key={i}>
              <Paper sx={{ mx: 1, px: 2, py: 1, backgroundColor: '#c5cae9' }}>
                <Typography
                  sx={{ fontSize: '1rem', backgroundColor: '#e8eaf6', px: 0.5 }}
                  variant='h6'
                >
                  {article.title}
                </Typography>
                {sentimentData && (
                  <Typography
                    sx={{
                      mr: 'auto',
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

      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '1rem',
          display: newsData ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        variant='overline'
      >
        Life is good. ✨
      </Typography>
    </Container>
  );
}
