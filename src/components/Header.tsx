import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Box display="flex" justifyContent="center" width="100%">
          <Typography variant="body1">
            <Link
              color="white"
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: 30,
              }}
            >
              Products
            </Link>
            <Link color="white" to="/products-has-discount" style={{ color: 'white', textDecoration: 'none' }}>
              Products has discount
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
