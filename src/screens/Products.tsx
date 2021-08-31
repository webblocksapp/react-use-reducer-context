import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React, { useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Typography from '@material-ui/core/Typography';
import StoreContext, { StoreContextType } from '../store/StoreContext';
import { randomProduct } from '../utils/functions';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const Products: React.FC = () => {
  const { productRepository } = useContext<StoreContextType>(StoreContext);
  const { state } = productRepository;

  const initOnMounted = () => {
    productRepository.findAll();
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
            <Grid key={product.id} item xs={12} sm={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
          {state.adding && (
            <Grid item xs={12} sm={4}>
              <ProductCardSkeleton />
            </Grid>
          )}
        </Grid>
      )}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => productRepository.create(randomProduct())}>
          Add product
        </Button>
      </Box>
    </>
  );
};

export default Products;
