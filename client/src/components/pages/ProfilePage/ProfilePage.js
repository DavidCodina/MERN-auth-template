import React      from 'react';
import Typography from '@material-ui/core/Typography';
import Divider    from '@material-ui/core/Divider';


// The Profile Page is only accessible if isUser is true.
// This is because we check the value of isUser from within Router.js
// This is more of a UI convenience feature, than an actual security measure.
 

export function ProfilePage(props){
  return (
    <React.Fragment>
      <Typography 
        variant="h3"
        component="h1" 
        align="center"
        my={3} 
        className="text-3d" 
        style={{ margin: '0 auto 25px auto', fontWeight: 600 }}
      >Profile</Typography>


      <Divider style={{ margin: '25px auto', height: 2, borderRadius: '50%' }} />
    </React.Fragment>     
  );
}
