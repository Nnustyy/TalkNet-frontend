import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { Card, CardBody } from '@heroui/react';
import { selectCurrent } from '@/features/user/userSlice';
import User from '@/components/user';

const Following = () => {


    const currentUser = useSelector(selectCurrent);

  if(!currentUser) {
    return null
  }

  return (
    currentUser.following.length > 0 ? (
      <div className='flex flex-col gap-5'>
        {currentUser.following.map((user) => 
        <Link key={user.following.id} to={`/users/${user.following.id}`}>
        <Card>
          <CardBody className='block'>
          <User
          name={user.following.name ?? ''}
          avatarUrl={user.following.avatarUrl ?? ''}
          description={user.following.email ?? ''}
          />
          </CardBody>
        </Card>
        </Link>
        )}
      </div>
    ) : (
      <div className='flex items-center gap-3 justify-center'>
        <h1>У вас нет подписок</h1>
        <FaRegFaceSmileWink />
      </div>
    )
  )
};

export default Following;