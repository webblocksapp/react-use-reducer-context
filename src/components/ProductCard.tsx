import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Product } from '../interfaces';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card variant="outlined">
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
        {product.discountPercentage ? (
          <Typography color="secondary" variant="body2" component="p" gutterBottom>
            {product.discountPercentage}% of discount
          </Typography>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
