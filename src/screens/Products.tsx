import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Typography from '@material-ui/core/Typography';
import { randomProduct } from '../utils/functions';
import { useProductRepository } from '../repositories';

const Products: React.FC = () => {
  const { productRepository } = useProductRepository();
  const { state } = productRepository;

  const initOnMounted = () => {
    productRepository.findAll();
  };

  useEffect(() => {
    initOnMounted();
  }, []);

  return (
    <>
      {state.loading ? (
        <Typography component="p" variant="h6">
          Loading...
        </Typography>
      ) : (
        <></>
      )}
      <Grid container spacing={2}>
        {state.products.map((product) => (
          <Grid key={product.id} item sm={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => productRepository.create(randomProduct())}>
          Add product
        </Button>
      </Box>
    </>
  );
};

export default Products;
