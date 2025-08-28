import { useGetAllPostsQuery } from '@/app/services/postsApi';
import CreatePost from '@/components/create-post';
import PostCard from '@/components/post';
import React, { useEffect } from 'react';

const Posts = () => {

  const {data} = useGetAllPostsQuery()
  

  if(!data) {
    return null
  }


  return (
    <>
      <div className='mb-10 w-full'>
        <CreatePost/>
      </div>
    </>
  );
};

export default Posts;