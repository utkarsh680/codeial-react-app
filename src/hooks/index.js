import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { login as userLogin, register,editProfile, fetchUserFriends} from '../api';
import jwt from 'jwt-decode';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async() => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        let friends = [];
        if (response.success) {         
            friends = response.data.friends;
        }
        setUser({
          ...user,
          friends
        });
      }
      
      setLoading(false);

    }
    getUser();
  
  }, []);
  const updateUser = async (userId , name , password, confirm_Password) => {
  const response = await editProfile(userId , name , password, confirm_Password);

  if (response.success) {
    console.log(response.data.user);
    setUser(response.data.user);
    setItemInLocalStorage(
      LOCALSTORAGE_TOKEN_KEY,
      response.data.token ? response.data.token : null
    );
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      message: response.message,
    };
  }
};
  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const signup = async (name, email, password, confirm_Password) => {
    const response = await register(name, email, password, confirm_Password);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  const updateUserFriends = (addFriend, friend) => {
    if(addFriend){
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }else{
      const newFriends = user.friends.filter(f=> f.to_user._id !== friend.to_user._id);

      setUser({
        ...user,
        friends: newFriends,
      });


    }
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};
