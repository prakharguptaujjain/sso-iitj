import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ColorTabs() {
  return (
    <Box
      display="flex"
      flexDirection={'column'}
      maxWidth={400}
      height={'60vh'}
      alignItems={'center'}
      margin={'auto'}
      marginTop={10}
      padding={2}
      borderRadius={5}
      boxShadow={5}
    >
      <Typography>
        <h1>Student Login</h1>
      </Typography>
      <TextField
        type={'text'}
        color="success"
        margin="normal"
        id="outlined"
        label="LDAP ID"
        variant="outlined"
      />
      <TextField
        type={'password'}
        color="success"
        margin="normal"
        id="outlined-basic"
        label="LDAP Password"
        variant="outlined"
      />
      <Button
        variant="contained"
        sx={{
          marginTop: 3,
          borderRadius: 5,
          paddingX: 4,
          backgroundColor: '#00ad56',
          '&:hover': { backgroundColor: '#008743' },
        }}
      >
        Login
      </Button>
    </Box>
  );
}
