import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Typography from '@material-ui/core/Typography';
import { useProductRepository } from '../repositories';

const ProductsHasDiscount: React.FC = () => {
  const { productRepository } = useProductRepository();
  const { state } = productRepository;

  const initOnMounted = () => {
    productRepository.findAllWithDiscount();
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
        <Grid container spacing={2}>
          {state.products.map((product) => (
            <Grid key={product.id} item sm={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductsHasDiscount;
