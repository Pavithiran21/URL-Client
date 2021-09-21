import React from 'react'

import Cookies from 'universal-cookie';
import Header from './Shortener/header';
const cookies = new Cookies();

function Homepage () {
    console.log(cookies.get('user_token'))
    return (
         <>
         <Header/>
         <div className="auth-wrapper">
         <Header/>
            <div className="auth-inner">
              <h2>You Loggin Successfully</h2>
            </div>
        </div>
         </>
    
      
        
    )

}
export default Homepage