import { useGetAllPostsQuery } from '@/app/services/postsApi';
import CreatePost from '@/components/create-post';
import PostCard from '@/components/post';
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
            <PostCard
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
                />
            )
          )
          :null
        )}
    </>
  );
};

export default Posts;