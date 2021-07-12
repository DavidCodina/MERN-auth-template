import React, { useState, useContext } from 'react';
import { Context }                     from '../../Context';


import { useHistory, useLocation } from 'react-router-dom'; //! could also just use <NavLinks>
import { makeStyles }              from '@material-ui/core/styles';
import Drawer                      from '@material-ui/core/Drawer';
import Hidden                      from '@material-ui/core/Hidden';
import { MenuBar }                 from './MenuBar';
import List                        from '@material-ui/core/List';
import ListItem                    from '@material-ui/core/ListItem';
import ListItemIcon                from '@material-ui/core/ListItemIcon';
import ListItemText                from '@material-ui/core/ListItemText';
import { VerifiedUserOutlined, AccountCircleOutlined, LockOpenOutlined, ExitToAppOutlined } from '@material-ui/icons';


const drawerWidth = 250;


const useStyles = makeStyles(theme => {
  return {
    root: { display: 'flex' },
  
    toolbar: theme.mixins.toolbar,
  
    nav: {
      // Using 'lg' here works in conjunction with  using lgUp / mdDown
      // in the <Hidden> components below.
      [theme.breakpoints.up('lg')]: { // https://material-ui.com/customization/breakpoints/
        width: drawerWidth,
        flexShrink: 0
      }
    },
  
    drawerPaper: { 
      width: drawerWidth,
      backgroundColor: theme.palette.light.main,
      borderRight: `2px solid ${theme.palette.blue.main}`
    },
  
    listItemTextPrimary: {
      color: theme.palette.blue.main,
      fontFamily: 'Montserrat',
      fontSize: 24,
      textDecoration: 'none',
    },
  
    link: {
      //////////////////////////////////////////////////////////////////
      //
      // This will match the default behavior of the AppBar
      // height: 56,
      // [theme.breakpoints.up('sm')]: { height: 64 }
      // However, this is a better approach:
      //
      //////////////////////////////////////////////////////////////////
      ...theme.mixins.toolbar
    },
  
    activeLink: {
      //////////////////////////////////////////////////////////////////
      //
      // This will match the default behavior of the AppBar
      // height: 56,
      // [theme.breakpoints.up('sm')]: { height: 64 }
      // However, this is a better approach:
      //
      //////////////////////////////////////////////////////////////////
      ...theme.mixins.toolbar,
  
      backgroundColor: theme.palette.blue.main,
      '&:hover': {
        backgroundColor: theme.palette.blue.main
      },
      '& .MuiTypography-root': {
        color: '#FFF'
      },
      '& .MuiSvgIcon-root': {
        color: '#FFF'
      }
    }
  };
});


/* =======================================================================

======================================================================= */


export function ResponsiveDrawer(props){
  const value                       = useContext(Context); 
  const { isUser, logout }          = value;
  const { children, window }        = props;
  const classes                     = useStyles();
  const history                     = useHistory();
  const location                    = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  
  const loggedInMenuItems = [
    { 
      text: 'Profile', 
      icon: <AccountCircleOutlined color="primary" />, 
      path: '/profile' 
    },
    { 
      text: 'Private Data', 
      icon: <VerifiedUserOutlined color="primary" />, 
      path: '/private_data' 
    }
  ];


  const loggedOutMenuItems = [
    { 
      text: 'Login', 
      icon: <LockOpenOutlined color="primary" />, 
      path: '/' 
    },
    { 
      text: 'Private Data', 
      icon: <VerifiedUserOutlined color="primary" />, 
      path: '/private_data' 
    }
  ];


  const toggleDrawer = () => { 
    setMobileOpen(!mobileOpen); 
  };


  const renderDrawerContent = () => {
    return (
      <React.Fragment>
        {/* <div className={classes.toolbar} /> */}
        

        <List style={{ paddingTop: 0 }}>
          { 
            isUser && loggedInMenuItems.map(item => {
              return (
                <ListItem 
                  key={item.text} 
                  button 
                  onClick={() => history.push(item.path)}
                  className={ location.pathname === item.path ? classes.activeLink : classes.link }
                >
                  <ListItemIcon style={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText classes={{ primary: classes.listItemTextPrimary }} primary={item.text} />
                </ListItem>
              );
            })
          }


          {
            isUser && (
              <ListItem 
                button 
                onClick={logout}
                className={classes.link}
              >
                <ListItemIcon style={{ minWidth: 40 }}>{<ExitToAppOutlined color="primary" />}</ListItemIcon>
                <ListItemText classes={{ primary: classes.listItemTextPrimary }} primary="Logout" />                 
              </ListItem>
            )
          }


          { 
            !isUser && loggedOutMenuItems.map(item => {
              return (
                <ListItem 
                  key={item.text} 
                  button 
                  onClick={() => history.push(item.path)}
                  className={ location.pathname === item.path ? classes.activeLink : classes.link }
                >
                  <ListItemIcon style={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText classes={{ primary: classes.listItemTextPrimary }} primary={item.text} />
                </ListItem>
              );
            })
          }
        </List>
      </React.Fragment>
    );
  };


  //! Why is this necessary?
  const container = window !== undefined ? () => window().document.body : undefined;  // eslint-disable-line


  return (
    <div className={classes.root}>
      <MenuBar toggleDrawer={toggleDrawer} />


      <nav className={classes.nav}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Hidden lgUp> {/* implementation="css" */}
          <Drawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={toggleDrawer}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          >
            { renderDrawerContent() }
          </Drawer>
        </Hidden>


        <Hidden mdDown> {/* implementation="css" */}
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            { renderDrawerContent() }
          </Drawer>
        </Hidden>
      </nav>

      { children }
    </div>
  );
}

