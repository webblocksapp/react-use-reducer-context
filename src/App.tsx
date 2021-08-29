import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import StoreProvider from './store/StoreProvider';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <header>
          <Link to="/">Screen 1</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/screen-2">Screen 2</Link>
        </header>
        <hr />
        <Route exact path="/" component={Screen1} />
        <Route path="/screen-2" component={Screen2} />
      </Router>
    </StoreProvider>
  );
};

export default App;
