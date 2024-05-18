"use client";
// import React from 'react'
// import {getSession} from 'next-auth/client';
import RegisterLogin from './registerlogin';


function AuthCheck({children}) {
  
    let id = window.sessionStorage.getItem("id");


    if (id) {
        return children;
    }
    
  

    
  return (
    <>
        <RegisterLogin/>
    </>
  );
}

export default AuthCheck