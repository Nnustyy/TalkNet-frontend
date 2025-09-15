import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { Card, CardBody } from '@heroui/react';
import { selectCurrent } from '@/features/user/userSlice';
import User from '@/components/user';
const Followers = () => {

  const currentUser = useSelector(selectCurrent);

  if(!currentUser) {
    return null
  }





  return (
    currentUser.followers.length > 0 ? (
      <div className='flex flex-col gap-5'>
        {currentUser.followers.map((user) => 
        <Link key={user.follower.id} to={`/users/${user.follower.id}`}>
        <Card>
          <CardBody className='block'>
          <User
          name={user.follower.name ?? ''}
          avatarUrl={user.follower.avatarUrl ?? ''}
          description={user.follower.email ?? ''}
          />
          </CardBody>
        </Card>
        </Link>
        )}
      </div>
    ) : (
      <div className='flex items-center gap-3 justify-center'>
        <h1>На вас никто не подписан</h1>
        <FaRegFaceSmileWink />
      </div>
    )
  )
};

export default Followers;