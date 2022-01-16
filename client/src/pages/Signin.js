import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from 'react-google-login';
import store from '../store';
import { handleLogin } from '../reducers/authReducer';
import { useDispatch } from 'react-redux'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        MoneyFlow
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const dispatch = useDispatch()

  const onFailure = (error) => {
    alert(error);
  };
  
  const googleResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({access_token: response.accessToken}, null, 2)], 
      {type : 'application/json'}
    );
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:3000/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
              // update state
              dispatch(handleLogin(token, user))
              localStorage.setItem("jwtToken", token)
            }
        });
      })
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <GoogleLogin
            clientId="781018697893-rfeal7ulgqjhpv542jbnkm4ivq9ofo0v.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={googleResponse}
            onFailure={onFailure}
          />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}