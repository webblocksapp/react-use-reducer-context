import Grid from '@material-ui/core/Grid';
import React, { useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Typography from '@material-ui/core/Typography';
import StoreContext, { StoreContextType } from '../store/StoreContext';

const ProductsWithDiscount: React.FC = () => {
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
      {state.findingAllWithDiscount ? (
        <Typography component="p" variant="h6">
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {state.productsWithDiscounts.map((product) => (
            <Grid key={product.id} item sm={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductsWithDiscount;
