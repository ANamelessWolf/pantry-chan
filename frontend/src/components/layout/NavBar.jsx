import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSection } from '../../store/sectionSlice';
import SectionsEnum from '../../constants/SectionsEnum';
import UniversalSearchBar from '../controls/UniversalSearchBar';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname.replace('/', '');
    dispatch(setSection(path || SectionsEnum.HOME));
  }, [location, dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pantry Planner
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/food">Food</Button>
        <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
        <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
        <Button color="inherit" component={Link} to="/settings">Settings</Button>
        <UniversalSearchBar />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
