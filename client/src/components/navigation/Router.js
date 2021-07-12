import React                       from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage  }              from '../pages/LoginPage';
import { ProfilePage  }            from '../pages/ProfilePage';
import { PrivateDataPage  }        from '../pages/PrivateDataPage';
import { NotFoundPage }            from '../pages/NotFoundPage';


const Router = (props) => {
  const { value }  = props;
  const { isUser } = value;
 

  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return isUser ? <Redirect to="/profile" /> : <LoginPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/profile"
        render={(props) => {
          return isUser ? <ProfilePage {...props} value={value}  /> : <Redirect to="/" />;
        }}
      />

      <Route 
        exact path="/private_data"
        render={(props) => {
          return <PrivateDataPage {...props} value={value}  />;
        }}
      />
     
      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

