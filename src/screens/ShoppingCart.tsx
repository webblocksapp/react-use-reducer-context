import Grid from '@material-ui/core/Grid';
import React, { useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Typography from '@material-ui/core/Typography';
import StoreContext, { StoreContextType } from '../store/StoreContext';

const ShoppingCart: React.FC = () => {
  const { productRepository } = useContext<StoreContextType>(StoreContext);
  const { state } = productRepository;

  const initOnMounted = () => {
    productRepository.findAllWithDiscount();
  };

  useEffect(() => {
    initOnMounted();
  }, []);

  return (
    <>
      {state.findingAll ? (
        <Typography component="p" variant="h6">
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {state.products.map((product) => (
            <Grid key={product.id} item sm={12}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ShoppingCart;
