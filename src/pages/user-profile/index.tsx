import { Button, Card, Image, useDisclosure } from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoPersonAddOutline,IoPersonRemoveOutline  } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { unfollowUser, useFollowUserMutation, useUnfollowUserMutation } from '@/app/services/followApi';
import { useEffect } from 'react';
import {useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '@/app/services/userApi';
import { resetUser, selectCurrent } from '@/features/user/userSlice';
import GoBack from '@/components/go-back';
import { BASE_URL } from '@/constants';
import ProfileInfo from '@/components/profile-info';
import { formatToClientDate } from '@/app/utils/formatToClientDate';
import CountInfo from '@/components/count-info';
import EditProfile from '@/components/edit-profile';

const UserProfile = () => {
  const {id} = useParams<{id:string}>()
  const currentUser  = useSelector(selectCurrent);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data} = useGetUserByIdQuery(id ?? '')
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnfollowUserMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useDispatch();

useEffect(() => () => {
  dispatch(resetUser())
},[])


if (!data) {
  return null
}

if (!currentUser) {
  return null
}

const handleFollow  = async () => {
  try {
    if(id) {
      data.isFollowing 
        ? await unFollowUser(id).unwrap()
        : await followUser({followingId:id}).unwrap()
      
      
      await triggerGetUserById(id);
      await triggerCurrentQuery();
    }
  } catch (error) {
    console.log(error)
  }
}


  return (
    <>
    <GoBack/>
    <div className='flex items-stretch gap-4'>
    <Card className='flex flex-col items-center text-center space-y-4 p-5 flex-2'>
      <Image
      src={`${BASE_URL}${data.avatarUrl}`}
      alt={data.name}
      width={200}
      height={200}
      className=' border-4 border-white'
      />
      <div className='flex flex-col text-2xl font-bold gap-4 items-center'>
      {data.name}
      {
        currentUser.id !== id  ? (
          <Button
          color={data.isFollowing ? 'default' : 'primary'}
          variant='flat'
          className='gap-2'
          endContent={data.isFollowing ? (<IoPersonRemoveOutline />) : (<IoPersonAddOutline />)}
          onPress={handleFollow}
          >
            {data.isFollowing ? 'Отписаться' : 'Подписаться'}
          </Button>
        )
        : (
          <Button
          endContent={<FaRegEdit />}
          onPress={() => onOpen()}
          >
            Редактировать
          </Button>
        )
      }
      </div>
    </Card>
    <Card className='flex flex-col space-y-4 p-5 flex-1'>
      <ProfileInfo title='Почта' info={data.email} />
      <ProfileInfo title='Местоположение' info={data.location} />
      <ProfileInfo title='Дата рождения' info={formatToClientDate(data.dateOfBirth)} />
      <ProfileInfo title='Обо мне' info={data.bio} />

      <div className="flex gap-2">
        <CountInfo title='Подписчики' count={data.followers.length}/>
        <CountInfo title='Подписки' count={data.following.length}/>
      </div>
    </Card>
    </div>
    <EditProfile isOpen={isOpen} user={data} onClose={onClose} />
    </>
  );
};

export default UserProfile;


