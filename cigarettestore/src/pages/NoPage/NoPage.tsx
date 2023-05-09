import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const NoPage = () => {
  return (
    <div>
        <Navbar />
        <div>
            <h2>Whoops!</h2>
            <p>404 Page not found</p>
        </div>
    </div>
  );
}

export default NoPage