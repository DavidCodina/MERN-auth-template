import React, { useContext } from 'react';
import { Context }           from './Context';
import Router                from './components/navigation/Router';
import { makeStyles }        from '@material-ui/core/styles';
import { ResponsiveDrawer }  from './components/navigation/ResponsiveDrawer';
import Container             from '@material-ui/core/Container';
import './scss/App.scss';


const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar //! necessary for content to be below app bar
}));


/* =======================================================================

======================================================================= */


function App(){  
  const value   = useContext(Context);
  const classes = useStyles();


  return (
    <ResponsiveDrawer> 
      <main>
        <div className={classes.toolbar} />
        <Container className="flex-1" style={{ maxWidth: 1600, padding: 25 }}>
          <Router value={value} />
        </Container>   
      </main>
    </ResponsiveDrawer>   
  );
}


export default App;

