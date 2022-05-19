import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';

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

export { FirebaseAuthProvider };
