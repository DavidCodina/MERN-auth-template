import React           from 'react';
import { data }        from '../../data';
import { LoginButton } from './LoginButton';


// Gotcha: forwardRef lesson learned :
// You have to wrap function components that are used as direct children of Menu.
// https://stackoverflow.com/questions/62935533/ho-to-fix-react-forwardrefmenu-material-ui
// But be sure to use forwardedRef={ref}
// See here for more info: https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools


export function ButtonList(){
  return data.map(item => {
    return <LoginButton key={item.name} item={item} />;
  });
}


export const LoginButtonList = React.forwardRef(
  (props, ref) => { return <ButtonList {...props} forwardedRef={ref} />; }
);




