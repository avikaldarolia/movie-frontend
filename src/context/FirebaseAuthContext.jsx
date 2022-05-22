/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
// import firebase from 'firebase/compat/app';
import { onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router';
import { auth } from '../firebase-config';
const FirebaseAuthContext = createContext();

const FirebaseAuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState();
  const value = { user };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log('Auth', currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
 
  if (context === undefined) {
    // navigate('/login');
    return undefined;
  }
  return context.user;
};

export { FirebaseAuthProvider, useFirebaseAuth };
