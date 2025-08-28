import { useCreateCommentMutation, useDeleteCommentMutation } from '@/app/services/commentsApi';
import { useLikePostMutation, useUnlikePostMutation } from '@/app/services/likesApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '@/app/services/postsApi';
import { useCurrentQuery } from '@/app/services/userApi';
import { BASE_URL } from '@/constants';
import { selectCurrent } from '@/features/user/userSlice';
import { Card, CardBody, CardFooter, CardHeader, Spinner } from '@heroui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import User from '../user';
import { formatToClientDate } from '@/app/utils/formatToClientDate';
import { FaRegTrashAlt } from "react-icons/fa";
import Typography from '../typography';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import MetaInfo from '../meta-info';


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

const PostCard:React.FC<Props> = ({
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
  
  // const [comment] = useCreateCommentMutation();


  return (
    <Card className='mb-5'>
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
          <div className='cursor-pointer'>
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
            <div>
              <MetaInfo count={likesCount} Icon={likedByUser ? <FcLike/> : <FcLikePlaceholder />} />
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;