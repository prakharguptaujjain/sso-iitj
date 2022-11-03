import { Link as RouterLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Link,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Iconify from '../components/Iconify';
import { LoadingButton } from '@mui/lab';
import AuthContext from '../contexts/AuthContext';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled('div')(() => ({
  width: '100%',
  maxWidth: 664,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '70vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const ButtonStyled = styled(LoadingButton)(() => ({
  fontWeight: 700,
  textTransform: 'none',
  backgroundColor: '#00AB55',
  boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.24)',
  '&:hover': {
    backgroundColor: '#007B55',
  },
}));

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // };

  return (
    <RootStyle>
      <SectionStyle>
        <Typography
          variant="h4"
          sx={{ px: 10, mt: 15, mb: 5, fontWeight: 500, fontSize: 25 }}
        >
          Hi, Welcome Back
        </Typography>
        <img
          sx={{ width: 0.7 }}
          alt="login"
          src="https://i.imgur.com/IFjLpCc.png"
        />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 600, fontSize: 35 }}
              >
                Sign in with IITJ SSO
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your details below.
              </Typography>
            </Box>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="LDAP Username"
                id="username"
                variant="outlined"
                color="success"
              />
              <TextField
                label="LDAP Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                color="success"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <ButtonStyled
                loading={loading}
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </ButtonStyled>
            </Stack>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: { md: 3 }, textAlign: 'center', fontWeight: 300 }}
          >
            Don't have an account? {''}
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="/register"
              underline="hover"
              color="#00AB55"
              sx={{ fontWeight: 700 }}
            >
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
