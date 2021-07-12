import React, { useState }  from 'react';
import { makeStyles }       from '@material-ui/core';
import Menu                 from '@material-ui/core/Menu';
import { LockOpenOutlined } from '@material-ui/icons';
import { LoginButtonList }  from './LoginButtonList';


const useStyles = makeStyles((theme) =>  {
  return {
    menuPaper: {
      top: '75px !important',
      paddingBottom: 0,
      border: `2px solid ${theme.palette.blue.main}`,
      borderRadius: 10
    },
    menuList: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});


export function LoginDropdown(){
  const [anchorEl, setAnchorEl] = useState(null);
  const classes             = useStyles();

  const handleClick = (e) => { setAnchorEl(e.currentTarget); };
  const handleClose = ()  => { setAnchorEl(null); };


  return (
    <div> 
      <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={handleClick}>
        <LockOpenOutlined fontSize="large" style={{ marginRight: 10 }} />
        <div className="font-montserrat" style={{ fontSize: 20 }}>Login</div>
      </div>
  

      <Menu
        classes={{ 
          paper: classes.menuPaper,
          list:  classes.menuList
        }}
        anchorEl={anchorEl} 
        keepMounted //! ???
        open={Boolean(anchorEl)} 
        onClose={handleClose}
        elevation={3}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <LoginButtonList />
      </Menu>
    </div>
  );
}