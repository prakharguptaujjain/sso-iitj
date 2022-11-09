import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Box,
  Card,
  CardActions,
  CardContent,
  NativeSelect,
  Tab,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
// import toast from 'react-hot-toast';
// import useAxios from '../utils/useAxios.js';
import CountrySelect from '../components/CountrySelect';

const StyledDiv = styled('div')(() => ({
  position: 'absolute',
  marginTop: -22,
  marginLeft: 400,
  top: 90,
}));

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#00AB55',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B0B9C2',
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00AB55',
    },
  },
});

const ButtonStyled = styled(LoadingButton)(() => ({
  fontWeight: 700,
  marginRight: 30,
  textTransform: 'none',
  backgroundColor: '#00AB55',
  boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.24)',
  '&:hover': {
    backgroundColor: '#007B55',
  },
}));

const AddCandidate = () => {
  // const navigate = useNavigate();

  // const api = useAxios();

  const [value, setValue] = useState('1');
  const [skillSet, setSkillSet] = useState([skillOptions[0]]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    primary_role: primaryRoleOptions[0],
    experience: '',
    education: '',
    bio: '',
    email: '',
    phone: '',
    adress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    website: '',
    linkedln: '',
    github: '',
    projects: '',
    skills: '',
    resume: '',
    status: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goToNextTab = (newValue) => {
    setValue(newValue);
  };

  const handleSkillsChange = () => {
    const skillsArray = skillSet;
    setFormData({ ...formData, skills: skillsArray.join(', ') });
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await api.post('/candidates/register/', formData);
  //         toast.success('Candidate added successfully');
  //         console.log(response);
  //         navigate('/');
  //     } catch (e) {
  //         const errors = e.response.data;
  //         const errorKeys = Object.keys(e.response.data);
  //         errorKeys.forEach((item) => {
  //             toast.error(item + ' : ' + errors[item]);
  //         });
  //     }
  // };

  const onStateChange = (newValue) => {
    setFormData({ ...formData, state: newValue.name });
  };

  const onCountryChange = (newValue) => {
    setFormData({ ...formData, country: newValue.name });
  };

  useEffect(() => {
    handleSkillsChange();
  }, [skillSet]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledDiv>
      <h1>Welcome! Get Started</h1>
      <form>
        <Box sx={{ width: 700, typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { background: '#00AB55', height: 3 },
                }}
                aria-label="lab API tabs example"
              >
                <Tab label="General" value="1" />
                <Tab label="Contact" value="2" />
                <Tab label="Education" value="3" />
                <Tab label="Portfolio" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    required
                    label="First Name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                  <StyledTextField
                    required
                    label="Last Name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    required
                    label="Email Address"
                    type={'email'}
                    value={formData.email}
                    helperText="Please enter the IITJ email address only"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                  <StyledTextField
                    required
                    label="Roll Number"
                    value={formData.phone}
                    helperText="Please enter in capital numbers. Ex: B20AI009"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Autocomplete
                    disablePortal
                    required
                    variant="outlined"
                    options={primaryRoleOptions}
                    value={formData.primary_role}
                    onChange={(e, value) =>
                      setFormData({ ...formData, primary_role: value })
                    }
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Program" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    required
                    variant="outlined"
                    options={primaryRoleOptions}
                    value={formData.primary_role}
                    onChange={(e, value) =>
                      setFormData({ ...formData, primary_role: value })
                    }
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Branch" />
                    )}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Autocomplete
                    disablePortal
                    required
                    variant="outlined"
                    options={genderOptions}
                    value={formData.primary_role}
                    onChange={(e, value) =>
                      setFormData({ ...formData, primary_role: value })
                    }
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Gender" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    required
                    variant="outlined"
                    options={categoryOptions}
                    value={formData.primary_role}
                    onChange={(e, value) =>
                      setFormData({ ...formData, primary_role: value })
                    }
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    required
                    label="Edcation"
                    value={formData.education}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 663,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    label="Bio"
                    variant="outlined"
                    helperText="Should not be more than 200 charachters"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    multiline
                    rows={3}
                    sx={{
                      width: 663,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                </Stack>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <ButtonStyled
                  sx={{ marginTop: 2, marginRight: 0, marginBottom: 10 }}
                  size="large"
                  variant="contained"
                  onClick={() => {
                    goToNextTab('2');
                  }}
                >
                  Next
                </ButtonStyled>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    required
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                  <StyledTextField
                    required
                    label="Address"
                    value={formData.adress}
                    onChange={(e) =>
                      setFormData({ ...formData, adress: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <CountrySelect
                    onStateChange={onStateChange}
                    onCountryChange={onCountryChange}
                    countryValue={formData.country}
                    stateValue={formData.state}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <StyledTextField
                    required
                    label="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                  <StyledTextField
                    required
                    label="Zipcode"
                    value={formData.zipcode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipcode: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: 'body1',
                      input: { color: '#000' },
                    }}
                  />
                </Stack>
                <StyledTextField
                  required
                  label="Experience"
                  variant="outlined"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  multiline
                  rows={6}
                  sx={{
                    width: 663,
                    typography: 'body1',
                    input: { color: '#000' },
                  }}
                />
              </Stack>
              <ButtonStyled
                sx={{ marginLeft: 0, marginTop: 2, marginBottom: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('1');
                }}
              >
                Back
              </ButtonStyled>
              <ButtonStyled
                sx={{
                  position: 'absolute',
                  right: 0,
                  marginTop: 3,
                  marginRight: 2,
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('3');
                }}
              >
                Next
              </ButtonStyled>
            </TabPanel>
            <TabPanel value="3">
              <StyledTextField
                required
                label="Projects"
                variant="outlined"
                value={formData.projects}
                onChange={(e) =>
                  setFormData({ ...formData, projects: e.target.value })
                }
                multiline
                rows={6}
                sx={{
                  width: 663,
                  typography: 'body1',
                  input: { color: '#000' },
                }}
              />
              <ButtonStyled
                sx={{ marginLeft: 0, marginTop: 2, marginBottom: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('2');
                }}
              >
                Back
              </ButtonStyled>
              <ButtonStyled
                sx={{
                  position: 'absolute',
                  right: 0,
                  marginTop: 3,
                  marginRight: 2,
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab('4');
                }}
              >
                Next
              </ButtonStyled>
            </TabPanel>
            <TabPanel value="4">
              <Card sx={{ minWidth: 250, boxShadow: 'none' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <StyledTextField
                      label="Website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      variant="outlined"
                      sx={{
                        width: 600,
                        paddingBottom: 3,
                        typography: 'body1',
                        input: { color: '#000' },
                      }}
                    />
                    <StyledTextField
                      label="Linkedln"
                      value={formData.linkedln}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedln: e.target.value })
                      }
                      variant="outlined"
                      sx={{
                        width: 600,
                        paddingBottom: 3,
                        typography: 'body1',
                        input: { color: '#000' },
                      }}
                    />
                    <StyledTextField
                      label="GitHub"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      variant="outlined"
                      sx={{
                        width: 600,
                        paddingBottom: 3,
                        typography: 'body1',
                        input: { color: '#000' },
                      }}
                    />
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant="body1"
                        sx={{ position: 'relative', left: 20, fontWeight: 600 }}
                      >
                        Resume :
                      </Typography>
                      <input
                        sx={{ width: 400 }}
                        style={{ marginLeft: 40 }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            resume: e.target.files[0],
                          })
                        }
                        type="file"
                      />
                    </Box>
                    <Stack direction={'row'} spacing={3}>
                      <Typography
                        variant="body1"
                        sx={{
                          position: 'relative',
                          left: 20,
                          fontWeight: 600,
                          paddingTop: 3,
                        }}
                      >
                        Skills :
                      </Typography>
                      <Autocomplete
                        multiple
                        sx={{ width: 400 }}
                        options={skillOptions}
                        onChange={(e, newValue) => setSkillSet(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      position: 'relative',
                      left: 13,
                      paddingTop: 3,
                      fontWeight: 600,
                      display: 'flex',
                    }}
                  >
                    Status :
                    <NativeSelect
                      defaultValue={' '}
                      sx={{ marginLeft: 2 }}
                      inputProps={{
                        name: '',
                        id: 'uncontrolled-native',
                      }}
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value={'applied'}>Applied</option>
                      <option value={'accepted'}>Accepted</option>
                      <option value={'rejected'}>Rejected</option>
                    </NativeSelect>
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    marginTop: 25,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <ButtonStyled
                    size="large"
                    variant="contained"
                    onClick={() => {
                      goToNextTab('2');
                    }}
                  >
                    Back
                  </ButtonStyled>
                  <ButtonStyled size="large" type="submit" variant="contained">
                    Add
                  </ButtonStyled>
                </CardActions>
              </Card>
            </TabPanel>
          </TabContext>
        </Box>
      </form>
    </StyledDiv>
  );
};

export default AddCandidate;

const skillOptions = ['Docker', 'Kubernetes', 'DevOps', 'React'];

const primaryRoleOptions = [
  'Full-Stack Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'DevOps Engineer',
  'Mobile Developer',
  'Data Engineer',
  'Data Scientist',
];

const genderOptions = ['Male', 'Female', 'Other'];

const categoryOptions = ['General', 'OBC', 'EWS', 'SC', 'ST'];
