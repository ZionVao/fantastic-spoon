import * as React from 'react';
import { NavLink } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { AppRoute } from 'src/common/enums/app-route.enum';
import { Container, Paper, Typography } from '@mui/material';

const NotFound = () => (
  <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <SentimentVeryDissatisfiedIcon />
      <Typography component="h1" variant="h4" align="center">
        404 Not Found
      </Typography>
      <Typography component="h2" variant="h4" align="center">
        Go to
        <NavLink to={AppRoute.ROOT}> Home </NavLink>
        page
      </Typography>
    </Paper>
  </Container>
);

export default NotFound;
