import React from 'react';

const ErrorMessage = ({error = ''}:{error:string}) => {
  return (
    error && <p className='text-red-500'>{error}</p>
  );
};

export default ErrorMessage;