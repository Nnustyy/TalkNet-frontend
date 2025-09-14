/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { selectCurrent } from '@/features/user/userSlice';

const GoBack = () => {

  const navigate = useNavigate();
  const handleGoBack  = () => {
    navigate(-1);
  }

  return (
    <div 
      className='flex text-default-500 cursor-pointer items-center gap-2 mb-10 '
      onClick={handleGoBack}
      >
      <RiArrowGoBackLine />
      Назад
    </div>
  );
};

export default GoBack;