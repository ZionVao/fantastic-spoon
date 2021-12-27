import * as React from 'react';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Grid,
  Box,
  Stack,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { SearchFields } from './SearchFields';
import { CheckFields } from './CheckFields';

const initialSFields: SearchFields = {
  full_name: '',
  email: '',
  code: '',
};

const fWidth = 300;

export default function PaginationSearch(props: {
  onSearch: (searchData: SearchFields, check: CheckFields) => void;
}) {
  const [searchData, setSearchData] =
    React.useState<SearchFields>(initialSFields);

  const [dateValue, setDates] = React.useState<DateRange<Date>>([null, null]);

  const [action, setAction] = React.useState<number | null>(null);

  const handleChangeAction = (
    event: React.MouseEvent<HTMLElement>,
    newAction: number,
  ) => {
    setAction(newAction);
  };

  const handleSearch = () => {
    const fields: CheckFields = {
      date1: dateValue[0] === null ? null : dateValue[0].toString(),
      date2: dateValue[1] === null ? null : dateValue[1].toString(),
      id_typeAction: action === null ? null : action,
    };
    console.log(searchData);

    props.onSearch(searchData, fields);
  };
  return (
    <Box
      sx={{
        width: '100wh',
        mx: 'auto',
        p: 3,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="ПІБ"
            variant="outlined"
            value={searchData.full_name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              console.log(event.target.value, 'ertyui');

              setSearchData({
                ...searchData,
                full_name: event.target.value,
              });
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                full_name: searchData.full_name.trim(),
              })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Електронна пошта"
            variant="outlined"
            value={searchData.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                email: event.target.value,
              })
            }
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              setSearchData({ ...searchData, email: searchData.email.trim() })
            }
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Реєстраційний код"
            variant="outlined"
            value={searchData.code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                code: event.target.value,
              })
            }
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              setSearchData({ ...searchData, code: searchData.code.trim() })
            }
            sx={{ width: fWidth }}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={dateValue}
              onChange={(newValue) => {
                setDates(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> --- </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
          <ToggleButtonGroup
            color="primary"
            value={action}
            exclusive
            onChange={handleChangeAction}
          >
            <ToggleButton value={1}>Створення</ToggleButton>
            <ToggleButton value={2}>Зміна</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Grid>
      <Box textAlign="center" sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleSearch}>
          Пошук
        </Button>
      </Box>
    </Box>
  );
}
