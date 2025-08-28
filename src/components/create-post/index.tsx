import { Textarea } from '@heroui/input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@heroui/button';
import {MdCreate} from 'react-icons/md'
import ErrorMessage from '../error-message';
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '@/app/services/postsApi';

const CreatePost = () => {

  const [createPost] = useCreatePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const {
    control,
    setValue,
    formState:{errors},
    handleSubmit
  } = useForm();

  const error = errors.post?.message as string

  const onSubmit = handleSubmit(async(data)=> {
    try {
      await createPost({content:data.post}).unwrap();
      setValue('post', '');
      await triggerGetAllPosts().unwrap();
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Controller
      control={control}
      name='post'
      defaultValue=''
      rules={{
        required:'Обязательное поле'
      }}
      render={({field}) => {
        return <Textarea
          {...field}
          labelPlacement='outside'
          placeholder='О чем думаете?'
          className='mb-5' />;
      }}
      />
      {errors && <ErrorMessage error={error}/>}
      <Button 
      color='success'
      className='flex-end'
      endContent={<MdCreate/>}
      type='submit'
      >
        Добавить пост
      </Button>
    </form>
  );
};

  


export default CreatePost;