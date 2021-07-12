import React, { useEffect, createContext } from 'react';
import { useHistory }                      from 'react-router-dom';
import  useLocalStorage                    from './hooks/useLocalStorage'; 
import axios                               from 'axios';


function isEmpty(obj){
  for (var prop in obj){
    if (obj.hasOwnProperty(prop)){ return false; }
  }
  return true;
}


/* =========================================================================
                               Context.js
========================================================================= */


export const Context  = createContext({});
export const Consumer = Context.Consumer;


export const Provider = (props) => {
  const history = useHistory();
  ////////////////////////////////////////////////////////////////////////////////////////
  //
  //  Rather than doing this: 
  //
  //    const [ user, setUser ] = useState({});  
  //
  //
  //  We can instead implement useLocalStorage()
  //
  //  Technically, it's not necessary because on mount the useEffect will always
  //  attempt to get a user by calling the /user endpoint.
  //  However, that will take a slight amount of time.
  //  In order to provide a better user experience, we can instead route the user
  //  optimistically, and only reroute them if the authentication fails.
  //
  ////////////////////////////////////////////////////////////////////////////////////////
  const [ user, setUser ] = useLocalStorage('user', {});
  const isUser            = !isEmpty(user);


  const logout = () => {
    console.log("logout() called.");

    axios({ method: "GET", withCredentials: true, url: 'http://localhost:5000/auth/logout' })
    .then(() => {
      console.log("Logging out on client.");
      setUser({});

      // The Router will conditionaly redirect the user when logging out from certain pages.
      // However, in cases like the Private Data page it won't redirect the user.
      // Thus it's best to always explicitly redirect back to the login page.
      // This means that BrowserRouter needs to be on the outside of this context provider.
      history.push('/');

    })
    .catch(err => {
      console.error(err);
      setUser({});
      history.push('/');
    });
  };


  ////////////////////////////////////////////////////////////////////////////////////////
  //
  //  When a user first comes to the site, they will not be logged in.
  //  The useEffect will immediately run, and attempt to get user data from http://localhost:5000/user.
  //  Since there will be no cookie attached to the request, the request will not
  //  respond with user data. Why? Because that route is private.
  //
  //  However, let's say the user logs in, then does some stuff, then goes to Youtube for a while.
  //  When they come back to this site, the cookie will be stored, and when the useEffect runs this
  //  time, it will exchange the cookie data for user data. In this case, the user data
  //  is simply {userId: "10210556523223894775234"}, but that's not important.
  //  What's important is that the cookie was able to authenticate the user,
  //  and knowing that the client can consider the user to be logged in.
  //
  //  This process takes a second to complete. If the user is authenticated, but returns to the site,
  //  then initially they will be routed to the login page. In order to speed up the process,
  //  can store user in localStorage. Then immediately retrieve it when the page mounts.
  //  In this sense we are routing the end user optimisticaly.
  //  However, if the useEffect() request comes back without a user, then we still call setUser({}),
  //  which will then boot the user out to the login page.
  //  Thus even though the useEffect request below is slow, if a user is stored in localStorage, then
  //  it will immediately route them to the Profile page upon return.
  //
  ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const getUser = async () => {

      console.log("calling getUser()");
      await new Promise(resolve => setTimeout(resolve, 3000)); //! Simulate slow request -demo only.

      axios({ method: "GET", withCredentials: true, url: "http://localhost:5000/user" })
  
      .then(res => {
        if (res.data && res.data.success === true && res.data.data && res.data.data.userId){
          console.log("The user has been authenticated on the server, and should be considered logged in.");
          console.log(res.data.data);
          setUser(res.data.data); 
        
          // Comment out above setUser, and uncomment this one to test rerouting upon authentication failure.
          // setUser({});
        } 
        
        else if (res.data && res.data.success === false){
          setUser({}); 
          console.log("The user is not authenticated on the server, and therefore not logged in.");
          if (res.data.message){ console.log(res.data.message); }
        }
      })
  
      .catch(err => {
        setUser({}); 
        console.log("Whoops! That didn't work.");
        console.log(err);
      });
    };

    getUser();
  }, [setUser]);


  return (
    <Context.Provider value={{ user, isUser, logout }}>
      { props.children }
    </Context.Provider>
  );
};

