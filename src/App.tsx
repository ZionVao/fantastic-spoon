import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import SignIn from 'src/pages/Login';
// import { Provider, useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useTypedDispatch } from 'src/store';
// import { Header } from 'src/components/navigation/Header';
import { AppRoute } from 'src/common/enums/app-route.enum';
import { Home } from 'src/pages';

function App() {
  // const hasUser = false;

  // const dispatch = useTypedDispatch();

  // const handleUserLogout = React.useCallback(
  //   () => dispatch(() => {}),
  //   [dispatch],
  // );

  return (
    <Router>
      <>
        {/* {hasUser && <Header user={{}} onUserLogout={handleUserLogout} />} */}

        <Switch>
          <Route exact path={AppRoute.ROOT} component={Home} />

          <Route path={AppRoute.LOGIN} component={SignIn} />
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
