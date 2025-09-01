import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/app/services/postsApi';
import Card from '@/components/card';
import CreateComment from '@/components/create-comment';
import React from 'react';
import GoBack from '@/components/go-back';

const CurrentPost = () => {

  const params = useParams<{id:string}>();
  const {data} = useGetPostByIdQuery(params?.id ?? '');

  if(!data) {
    return <h2>Такого поста не существует</h2>
  }

  const  {
    author,
    authorId,
    comments,
    content,
    createdAt,
    id,
    likedByUser,
    likes,
  } = data

  return (
    <>
    <GoBack/>~
    <div className='mb-5 w-full'>
    <Card
        key={id}
        authorId={authorId}
        cardFor='current-post'
        commentsCount={comments.length}
        content={content}
        likedByUser={likedByUser}
        likesCount={likes.length}
        createdAt={createdAt}
        avatarUrl={author.avatarUrl?? ''}
        name={author.name ?? ''}
        id={id}
    />
    </div>
    <CreateComment/>
      <div className='mt-15'>
        {comments && (
          comments.length > 0 
          ? comments.map(({id, content,createdAt,user,userId}) => 
            <Card
            key={id}
            content={content}
            createdAt={createdAt}
            avatarUrl={user.avatarUrl ?? ''}
            cardFor='comment'
            name={user.name ?? ''}
            id={id}
            authorId={userId}
  
            />
          )
          : <h5 className="text-default-500 text-center">Оставьте первый комментарий!</h5>
        )}
      </div>
    </>
  );
};

export default CurrentPost;