import React, { useContext } from 'react';
import { Context }           from '../../Context';
import AppBar                from '@material-ui/core/AppBar';
import IconButton            from '@material-ui/core/IconButton';
import MenuIcon              from '@material-ui/icons/Menu';
import Toolbar               from '@material-ui/core/Toolbar';
import Typography            from '@material-ui/core/Typography';
import { makeStyles }        from '@material-ui/core/styles';
import { useHistory }        from 'react-router-dom';
import { LoginDropdown }     from './LoginDropdown';
import { ExitToAppOutlined } from '@material-ui/icons';





const useStyles = makeStyles(theme => ({  
  appBar: {
    backgroundColor: theme.palette.blue.main,
    // Using 'lg' here works in conjunction with  using lgUp / mdDown
    // in the <Hidden> components within Navigation.js.
    [theme.breakpoints.up('lg')]: {
      // This is one zIndex above the Drawer.
      // I will actually be sitting directly on top of the Home Button in the Drawer,
      // And it will look totally seamless because the height of the Buttons in the
      // Drawer matches the height of the AppBar.
      zIndex: 1201 
    }
    // Do this instead if you want to push the AppBar to the right.
    // [theme.breakpoints.up('lg')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  }
}));


/* =======================================================================

======================================================================= */


export function MenuBar({ toggleDrawer }){
  const value              = useContext(Context); 
  const { isUser, logout } = value;
  const classes            = useStyles();
  const history            = useHistory();


  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />

        </IconButton>

        <Typography 
          className="font-montserrat" 
          style={{ 
            marginRight: 'auto', 
            cursor: 'pointer', 
            textShadow: '0px 1px 2px rgba(0,0,0,0.5' 
          }}
          variant="h5" 
          noWrap
          onClick={() => history.push('/')}
        >DavTek Industries</Typography>


        { !isUser && <LoginDropdown />}


        { isUser && (
          <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={logout}>
            <ExitToAppOutlined fontSize="large" style={{ marginRight: 10 }} />
            <div className="font-montserrat" style={{ fontSize: 20 }}>Logout</div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}