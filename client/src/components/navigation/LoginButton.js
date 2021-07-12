import React from 'react';


export function LoginButton({ item }){
  const { img, href, alt, color, txt, name } = item;

  return (
    <a 
      className="login-button"
      style={{ backgroundColor: color }}
      href={href}
      title={txt}
    >
      <img src={img} alt={alt} />
      <span>{name.toUpperCase()} Login</span>
    </a>
  );
}


