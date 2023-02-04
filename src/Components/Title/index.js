import React from 'react';
import './title.css'

export default function Title({children,nome}) {
 return (
   <div className='Conteiner__Title'>
      {children}
     <span>{nome}</span>
   </div>
  );
}