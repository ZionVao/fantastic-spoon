import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import SignIn from 'src/pages/Login';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// test
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import { useTypedDispatch } from 'src/store';
// import { Header } from 'src/components/navigation/Header';
import { AppRoute } from 'src/common/enums/app-route.enum';
import { AdminHome, RegistrarHome } from 'src/pages';
import { useTypedDispatch, useTypedSelector } from 'src/store';
import { Header } from 'src/components/navigation/Header';
import { selectNotification, uiActions } from 'src/store/ui/slice';
import { getUser } from './store/user/slice';
import { Alert, Snackbar } from '@mui/material';
import { UserRole } from './common/enums/app/role.enum';
import NotFound from './components/not-found/NotFound';
import { CreateRegistry } from './components/registry/create/CreateRegistry';

function App() {
  const notification = useTypedSelector(selectNotification);

  const user = useTypedSelector(getUser);

  const dispatch = useTypedDispatch();

  const handleClose = () => {
    dispatch(uiActions.clearNotification());
  };

  const notify = () => {
    if (notification) {
      const { status, message } = notification;

      return (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      );
    } else return null;
  };

  const notice = notify();

  return (
    <Router>
      <>
        {user.userId !== null && <Header role={user.role} />}
        {notice}

        <Switch>
          {user.role === UserRole.REGISTRATOR && (
            <>
              <Route exact path={AppRoute.ROOT} component={RegistrarHome} />
              <Route
                exact
                path={AppRoute.UPDATE_REGISTRY}
                component={CreateRegistry}
              />
              <Route exact path={AppRoute.CREATE} component={CreateRegistry} />
            </>
          )}

          {user.role === UserRole.ADMIN && (
            <>
              <Route exact path={AppRoute.ROOT} component={AdminHome} />
            </>
          )}

          <Route exact path={AppRoute.LOGIN} component={SignIn} />

          <Route path={AppRoute.ANY} component={NotFound} />
        </Switch>
      </>
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
