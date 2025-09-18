/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FcLikePlaceholder, FcLike} from "react-icons/fc";
import { FaRegTrashAlt,FaRegComment } from "react-icons/fa";
import {  Card as HeroCard, CardBody, CardFooter, CardHeader, Spinner } from '@heroui/react';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import User from '../user';
import MetaInfo from '../meta-info';
import Typography from '../typography';
import { useLikePostMutation, useUnlikePostMutation } from '@/app/services/likesApi';
import { useCreateCommentMutation, useDeleteCommentMutation } from '@/app/services/commentsApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '@/app/services/postsApi';
import { selectCurrent } from '@/features/user/userSlice';
import { formatToClientDate } from '@/app/utils/formatToClientDate';
import ErrorMessage from "../error-message";
import { hasErrorField } from "@/app/utils/hasErrorFields";


type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

const Card:React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  id = "",
  likesCount = 0,
  commentsCount = 0,
  cardFor = "post",
  likedByUser = false,
  createdAt,
  commentId = "",
}) => {

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const currentUser = useSelector(selectCurrent);
  

  const refetchPosts = async() => {
      switch(cardFor) {
        case 'post':
          await triggerGetAllPosts().unwrap();
          break;

          case 'comment':
            await triggerGetPostById(id).unwrap();
            break;

            case 'current-post':
              await triggerGetAllPosts().unwrap();
              break;

              default: 
              throw new Error('Неверный аргумент cardFor')
      }
    }

  const handleLike =  async () => {
    try {
      {likedByUser 
      ? await unlikePost(id).unwrap()
      : await likePost({postId:id}).unwrap()
      }

      if (cardFor === 'current-post') {
        await triggerGetPostById(id).unwrap();
      }
      await refetchPosts();
    } catch (error) {
      if(hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
}

  const handleDelete = async() => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await refetchPosts();
        break;

          case 'current-post':
            await deletePost(id).unwrap();
            navigate('/')
            break;

            case 'comment':
              await deleteComment(commentId).unwrap();
              await refetchPosts();
              break;
              
              default: 
              throw new Error('Неверный аргумент cardFor')
      }
    } catch (error) {
            if(hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <HeroCard className='mb-5'>
      <CardHeader className='justify-between items-center bg-transparent'>
        <Link to={`users/${authorId}`}>
        <User 
        name={name} 
        className='text-small font-semibold '
        avatarUrl={avatarUrl}
        description={createdAt && formatToClientDate(createdAt)}
        />
        </Link>
        {authorId === currentUser?.id && (
          <div className='cursor-pointer' onClick={handleDelete} >
            {deleteCommentStatus.isLoading || deletePostStatus.isLoading 
            ? <Spinner/>
            : <FaRegTrashAlt />
            }
          </div>
        )}
      </CardHeader>
      <CardBody className='px-3 py-2 mb-5'>
        <Typography>
          {content}
        </Typography>
      </CardBody>
      {cardFor !=='comment' && (
        <CardFooter className='gap-3'>
          <div className=" flex gap-5 items-center">
            <div onClick={handleLike}>
              <MetaInfo count={likesCount} Icon={likedByUser ? FcLike : FcLikePlaceholder} />
            </div>
            <Link to={`posts/${id}`}>
            <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </HeroCard>
  );
};

export default Card;