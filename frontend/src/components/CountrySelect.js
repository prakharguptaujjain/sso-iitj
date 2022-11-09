import { Box, TextField, Autocomplete, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

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

const allCountries = Country.getAllCountries();

export default function CountrySelect({
  onStateChange,
  onCountryChange,
  countryValue,
  stateValue,
}) {
  const [country, setCountry] = useState('IN');
  const [states, setStates] = useState(State.getStatesOfCountry('IN'));

  const handleChange = (e, value) => {
    setCountry(value.isoCode);
    onCountryChange(value);
  };

  useEffect(() => {
    changeStates();
  }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeStates = () => {
    setStates(State.getStatesOfCountry(country));
  };

  return (
    <Stack direction={'row'} spacing={5}>
      <Autocomplete
        sx={{ width: 300 }}
        options={allCountries}
        autoHighlight
        value={Country.getCountryByCode(countryValue)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.name}
        onChange={(e, value) => {
          handleChange(e, value);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.name} ({option.isoCode}) +{option.phonecode}
          </Box>
        )}
        renderInput={(params) => (
          <StyledTextField
            required
            {...params}
            sx={{ width: 310, typography: 'body1', input: { color: '#000' } }}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />

      <Autocomplete
        sx={{ width: 300 }}
        options={states}
        autoHighlight
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={{ name: stateValue }}
        onChange={(e, newValue) => onStateChange(newValue)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <StyledTextField
            required
            {...params}
            sx={{ width: 310, typography: 'body1', input: { color: '#000' } }}
            label="Choose a state"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Stack>
  );
}
