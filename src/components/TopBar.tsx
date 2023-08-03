import {
  AppBar,
  Container,
  Button,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableViewIcon from '@mui/icons-material/TableView';
import { Open_Sans } from 'next/font/google';
import { NextLinkComposed } from '@components/LinkAdapter';

const openSans = Open_Sans({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap',
});

export function TopBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontFamily: openSans.style.fontFamily,
              fontWeight: 800,
              p: '1rem',
            }}
          >
            VGM Obscura Stats
          </Typography>
          <Box sx={{ ml: '1rem' }}>
            <Button
              component={NextLinkComposed}
              variant="contained"
              to="/"
              sx={{ m: '0.5rem' }}
            >
              <TableViewIcon sx={{ mr: '0.5rem', my: '0.25rem' }} />
              Overview
            </Button>
            <Button
              component={NextLinkComposed}
              variant="contained"
              to="/charts"
              sx={{ m: '0.5rem' }}
            >
              <BarChartIcon sx={{ mr: '0.5rem', my: '0.25rem' }} /> Charts
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
