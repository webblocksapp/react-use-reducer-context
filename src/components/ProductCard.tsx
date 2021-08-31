import React, { useContext, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Product } from '../interfaces';
import StoreContext, { StoreContextType } from '../store/StoreContext';
import { randomProduct } from '../utils/functions';
import Loader from './Loader';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { productRepository } = useContext<StoreContextType>(StoreContext);
  const [loading, setLoading] = useState<boolean>(false);

  const updateProduct = async () => {
    setLoading(true);
    await productRepository.update(product.id, randomProduct(['id']));
    setLoading(false);
  };

  const removeProduct = async () => {
    setLoading(true);
    await productRepository.remove(product.id);
  };

  return (
    <Card variant="outlined" style={{ position: 'relative' }}>
      {loading && <Loader />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {product.location}
        </Typography>
        <Typography color="textSecondary" variant="h6" component="p" gutterBottom>
          ${product.price}
        </Typography>
        {product.discount ? (
          <Typography color="secondary" variant="body2" component="p" gutterBottom>
            {product.discount.percentage}% of discount
          </Typography>
        ) : (
          <></>
        )}
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Button variant="contained" color="primary" onClick={updateProduct}>
            Update
          </Button>
          <Button variant="contained" onClick={removeProduct}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
