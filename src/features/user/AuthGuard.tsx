import { Spinner } from '@heroui/react';
import { useCurrentQuery } from '@/app/services/userApi';
import React from 'react';

const AuthGuard = ({children}:{children: JSX.Element}) => {

  const {isLoading} = useCurrentQuery();

  if(isLoading) {
    return <Spinner/>
  }

  return children
};

export default AuthGuard;