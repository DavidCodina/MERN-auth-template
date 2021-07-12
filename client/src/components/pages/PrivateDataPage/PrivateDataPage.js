import React, { useState } from 'react';
import axios               from 'axios';
import Typography          from '@material-ui/core/Typography';
import Divider             from '@material-ui/core/Divider';
import { CustomButton }    from '../../shared';


// This page will be accessible regardless of whether or not the user is logged in.
// However, when clicking the getPrivateData button, the request will only succeed
// When a user is authenticated.
// I have not yet added this page to the Drawer.


export function PrivateDataPage(props){
  const [privateData, setPrivateData] = useState(null);


  /* =============================

  ============================= */


  const getPrivateData = () => {
    axios({
      method:          "GET",
      withCredentials: true,
      url:             "http://localhost:5000/private_data",
    })

    .then(res => {
      if (res.data && res.data.success === true && res.data.data){
        setPrivateData(res.data.data);
      } 
      
      else if (res.data && res.data.success === false && res.data.message){
        alert(res.data.message);
        setPrivateData(null);
      }
    })

    .catch(err => {
      alert("Whoops! That didn't work.");
      console.log(err);
    });
  };


  /* =============================

  ============================= */


  return (
    <React.Fragment>
      <Typography 
        variant="h3"
        component="h1" 
        align="center"
        my={3} 
        className="text-3d" 
        style={{ margin: '0 auto 25px auto', fontWeight: 600 }}
      >Private Data</Typography>


      <Divider style={{ margin: '25px auto', height: 2, borderRadius: '50%' }} />


      <div className="text-center">
        <CustomButton className="font-montserrat" variant="contained" color="blue" onClick={getPrivateData}>Get Private Data</CustomButton>
      </div>


      { privateData && privateData.secretMessage ? <h5 className="mt-5 font-montserrat text-blue text-center">{privateData.secretMessage}</h5> : null }
    </React.Fragment>     
  );
}
