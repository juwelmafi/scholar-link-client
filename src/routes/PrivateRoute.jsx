import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';
const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if(loading){
    return <Loading></Loading>
  }

  if(!user){
   return <Navigate to={'/login'} state={{from: location.pathname}}></Navigate>
  }
  return children;
};

export default PrivateRoute;