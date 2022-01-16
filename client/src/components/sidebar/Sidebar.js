import * as React from 'react';
import Piechart from './piechart/Piechart';
import LogoutIcon from '@mui/icons-material/Logout';
import Nav from './navsection/Nav';
import PropTypes from 'prop-types';
import { Box, Link, Button, Drawer, Typography, Toolbar, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavConfig from './navsection/NavConfig';
// material
import store from '../../store';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { handleLogout } from '../../reducers/authReducer';

const drawerWidth = 340;

Sidebar.propTypes = {
  tableIndex: PropTypes.number,
  handleSelectionTable : PropTypes.func
}

// const mapStateToProps = (state) => {
//   return { isAuth : state.auth.isAuthenticated }
// }

function Sidebar() {

  const googleLogoutResponse = () => {
    fetch('http://localhost:3000/auth/logout').then(r => {
      store.dispatch(handleLogout())
    })
  } 

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ mb: 1, mx: 2.5 }}>
          <Toolbar>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {store.getState().auth.user.displayName}
            </Typography>
            <GoogleLogout
              clientId="781018697893-rfeal7ulgqjhpv542jbnkm4ivq9ofo0v.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={googleLogoutResponse}
            >
          </GoogleLogout>
          </Toolbar>
        </Box>

        <Box>
          <Piechart />
        </Box>

        <Box>
          <Nav />
        </Box>

      </Drawer>
  );
}

export default Sidebar

