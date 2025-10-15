"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  user: null,
  jwt: null,
  isAuthenticated: false,
  isLoading: true,
};

const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  UPDATE_USER: 'UPDATE_USER',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        jwt: action.payload.jwt,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        jwt: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadSession = () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const userStr = localStorage.getItem('user');
        
        if (jwt && userStr) {
          const user = JSON.parse(userStr);
          dispatch({
            type: AUTH_ACTIONS.LOGIN,
            payload: { user, jwt },
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Error al cargar la sesión:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    loadSession();
  }, []);

  const login = (user, jwt) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: { user, jwt },
    });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: updatedUser,
    });
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};