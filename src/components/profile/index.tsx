import { Card, CardBody, CardHeader, Image } from '@heroui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent } from '@/features/user/userSlice';
import { BASE_URL } from '@/constants';
import { Link } from 'react-router-dom';
import {MdAlternateEmail} from 'react-icons/md'

const Profile = () => {
  const current = useSelector(selectCurrent)


  if(!current) {
    return null
  }

  const {id, email, name, avatarUrl} = current

  return (
    <Card className='py-4 w-[302px]'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
      <Image 
      alt='avatar widget'
      src={`${BASE_URL}${avatarUrl}`}
      className='rounded-xl object-cover'
      width={370}
      />
      </CardHeader>
      <CardBody>
    <Link to={`users/${id}`}>
    <h4 className="font-bold text-large mb-2">{name}</h4>
    </Link>
    <p className="text-default-500 flex items-center gap-2">
    <MdAlternateEmail/>
    {email}
    </p>
      </CardBody>
    </Card>
  );
};

export default Profile;