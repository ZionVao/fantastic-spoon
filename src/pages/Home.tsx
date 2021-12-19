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
    <>
      <Header user={{}} onUserLogout={handleUserLogout} />
    </>
  );
};
