import Container from '@material-ui/core/Container';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './screens/Products';
import ProductsWithDiscount from './screens/ProductsWithDiscount';
import ShoppingCart from './screens/ShoppingCart';
import StoreProvider from './store/StoreProvider';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Header />
        <Container style={{ marginTop: 100 }}>
          <Route exact path="/" component={Products} />
          <Route path="/products-with-discount" component={ProductsWithDiscount} />
          <Route path="/shopping-cart" component={ShoppingCart} />
        </Container>
      </Router>
    </StoreProvider>
  );
};

export default App;
