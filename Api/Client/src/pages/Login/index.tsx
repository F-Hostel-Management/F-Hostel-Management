import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import Link from '@mui/material/Link';
import * as Styled from './styles'
import GoogleLoginButton from '../../components/GGLoginButton/index'
import imgLogin from '../../assets/images/login.png'
import { fontSize } from '@mui/system';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={5} md={7} sx={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      />

      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={1} square >
        <Box
          sx={{
            my: 8,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography variant='h3' sx={{
            mb: 2,
            fontWeight: 600,
            color: 'grey.800',
            textDecoration: 'none',
          }}>Welcome Back.</Typography>
          <Typography variant='body2' sx={{
            mb: 3,
            color: 'grey.600',
          }}>Please sign in to your account</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Grid container sx={{mb: 4}}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={5}><Styled.Break></Styled.Break></Grid>
              <Grid item xs={2}>
                <Typography variant='body2' sx={{
                  mb: 3,
                  color: 'grey.500',
                  textAlign: 'center',
                  fontSize: 13
                }}>OR</Typography>
              </Grid>
              <Grid item xs={5}><Styled.Break></Styled.Break></Grid>
            </Grid>
            <GoogleLoginButton />
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
};

export default Login;
