import React             from 'react';
import Typography        from '@material-ui/core/Typography';
import Divider           from '@material-ui/core/Divider';
import { LoginCardList } from './LoginCardList';


export function LoginPage(props){
  return (
    <React.Fragment>
      <Typography 
        variant="h3"
        component="h1" 
        align="center"
        my={3} 
        className="text-3d" 
        style={{ margin: '0 auto 25px auto', fontWeight: 600 }}
      >Login</Typography>


      <Divider style={{ margin: '25px auto', height: 2, borderRadius: '50%' }} />


      <LoginCardList />
    </React.Fragment>     
  );
}
