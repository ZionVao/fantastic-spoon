import { CssBaseline, GlobalStyles } from '@mui/material';
import React from 'react';
import { Header } from 'src/components/navigation/Header';
import { useTypedDispatch } from 'src/store';

export const Home = () => {
  const dispatch = useTypedDispatch();

  const handleUserLogout = React.useCallback(
    () => dispatch(() => {}),
    [dispatch],
  );

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <Header user={{}} onUserLogout={handleUserLogout} />
    </React.Fragment>
  );
};
