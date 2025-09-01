import { Button } from '@heroui/button';
import { Textarea } from '@heroui/input';
import { Controller, useForm } from 'react-hook-form';
import { TfiCommentsSmiley } from "react-icons/tfi";
import { useParams } from 'react-router-dom';
import ErrorMessage from '../error-message';
import { useCreateCommentMutation } from '@/app/services/commentsApi';
import {useLazyGetPostByIdQuery } from '@/app/services/postsApi';

const CreateComment = () => {
  
  const {id} = useParams<{id:string}>()
  const [createComment] = useCreateCommentMutation();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();

  const {
    control,
    setValue,
    formState:{errors},
    handleSubmit
  } = useForm();

  const onSubmit = handleSubmit(async(data) => {
    try {

      if(id) {
        await createComment({content:data.comment, postId:id})
        await triggerGetPostById(id).unwrap()
        setValue('comment', '');
      }
      

    } catch (error) {
      console.log(error)
    }
  })

  const error = errors.comment?.message as string

  return (
    <form onSubmit={onSubmit}>
      <Controller
      control={control}
      name='comment'
      defaultValue=''
      rules={{
        required:'Обязательное поле'
      }}
      render={({field}) => {
        return <Textarea
        {...field}
        labelPlacement='outside'
        placeholder='Что скажете?'
        className='mb-5'
        />
      }}
      />
      {errors && <ErrorMessage error={error}/>}
      <Button
      color='warning'
      className='flex-end'
      endContent={<TfiCommentsSmiley />}
      type='submit'
      >
        Комментировать
      </Button>
    </form>
  );
};

export default CreateComment;