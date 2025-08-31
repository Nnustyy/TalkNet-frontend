import { useGetAllPostsQuery } from '@/app/services/postsApi';
import CreatePost from '@/components/create-post';
import Card from '@/components/card';
import React, { useEffect } from 'react';

const Posts = () => {

  const {data} = useGetAllPostsQuery()
  



  return (
    <>
      <div className='mb-10 w-full'>
        <CreatePost/>
        </div>
        {data && (
          data.length > 0 ? (
            data.map(({
              authorId,
              comments,
              content,
              createdAt,
              id,
              likedByUser,
              likes,
              author
            }) => 
            <Card
                key={id}
                authorId={authorId}
                cardFor='post'
                commentsCount={comments.length}
                content={content}
                likedByUser={likedByUser}
                likesCount={likes.length}
                createdAt={createdAt}
                avatarUrl={author.avatarUrl?? ''}
                name={author.name ?? ''}
                id={id}
                />
            )
          )
          :null
        )}
    </>
  );
};

export default Posts;