import React from 'react';


function capitalize(str){
  return str.charAt(0).toUpperCase() + str.substring(1, str.length);
}


export function LoginCard({ img, name, href, color }){
  const NAME = capitalize(name);

  return (
    <div 
      className="login-card"
      style={{ border: `2px solid ${color}` }}
      onClick={ () => window.location = href }
    >

      <div className="text-center font-montserrat" style={{ color: color }}>{ NAME }</div>

      <div 
        style={{ 
          minWidth: 100,
          minHeight: 80, 
          background: `url("${img}") no-repeat center center / 50% ${color}`
        }}
      />
    </div>
  );
}