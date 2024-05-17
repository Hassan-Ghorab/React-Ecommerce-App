/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';


export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        const userDetails = await fetchUserDetails(user);
        setUserDetails(userDetails);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setUserDetails(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserDetails = async (user) => {
    const userDetails = {
      name: user.displayName,
      email: user.email,
    };
    return userDetails;
  };

  const handleSignupDetails = (name, email) => {
    setUserDetails({
      name: name,
      email: email,
    });
  };

  const logout = () => {
    auth.signOut().catch((error) => {
      console.error('Error logging out:', error);
    
    });
  };

  const userName = userDetails ? userDetails.name : '';
  const userEmail = userDetails ? userDetails.email : '';

  return (
    <UserAuthContext.Provider
      value={{
        user,
        userDetails,
        userName,
        userEmail,
        isLoggedIn,
        loading,
        logout,
        handleSignupDetails,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;
