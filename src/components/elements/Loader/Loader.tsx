
import React from 'react';
import './Loader.scss';

export function Loader() {
  const Loaders = 4; 

  const loaderStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100svh',
    marginTop: '300px',
    
  };


  return (
    <div className="ContainerLoader" style={loaderStyle}>
      {Array.from({ length: Loaders }).map((_, index) => (
        <div key={index} className="loader">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
            <div className="line-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

