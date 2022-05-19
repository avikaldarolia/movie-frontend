import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
// import { useNavigate } from 'react-router';

const FirebaseAuthContext = createContext;

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
const useFirebaseAuth = () => {
  // const navigate = useNavigate();
  const context = useContext(FirebaseAuthContext);
  // useEffect(() => {
  //   if (context === undefined) {
  //     navigate('/login');
  //     // return;
  //   }
  // }, [context]);
  console.log(context);
  if (context === undefined) {
    // navigate('/login');
    return;
  }
  return context.user;
};
export { FirebaseAuthProvider, useFirebaseAuth };
