import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Link, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useState } from 'react';

export default function Index() {
  const [newsData, setNewsData] = useState(null);

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

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 2 }}>
        <Typography variant='h2' component='h1' gutterBottom>
          Fetch news headlines
        </Typography>
        <Button onClick={callNewsAPI} variant='contained'>
          Call API
        </Button>
        <Grid sx={{ my: 2 }} container spacing={2}>
          {newsData?.articles.map((article, i) => (
            <Grid sm={12} md={6} key={i}>
              <Paper sx={{ mx: 1, px: 2, py: 1, backgroundColor: '#e8eaf6' }}>
                <Typography sx={{ fontSize: '1rem' }} variant='h6'>
                  {article.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
