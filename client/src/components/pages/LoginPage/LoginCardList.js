import React         from 'react';
import { LoginCard } from './LoginCard';
import { data }      from '../../../data';


export function LoginCardList(){
  return (
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <div className="d-flex justify-content-between flex-wrap" style={{ margin: '0 -12.5px' }}>
        { data.map(item => <LoginCard key={item.name} {...item} />) }
      </div>
    </div>
  );
}