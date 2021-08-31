import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card variant="outlined">
      <Box minHeight={150} display="flex" alignItems="center" justifyContent="center">
        Creating...
      </Box>
    </Card>
  );
};

export default ProductCardSkeleton;
