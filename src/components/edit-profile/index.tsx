import { useParams } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@heroui/react';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineMailOutline } from "react-icons/md";
import Input from '../input/input';
import ErrorMessage from '../error-message';
import { ThemeContext } from '../themeProvider';
import { User } from '@/types';
import { useUpdateUserMutation } from '@/app/services/userApi';


type Props = {
  isOpen:boolean,
  onClose:() => void,
  user?:User
}

const EditProfile:React.FC<Props> = ({
  isOpen,
  onClose,
  user
}) => {


  const {theme} = useContext(ThemeContext);
  const {id} = useParams<{id:string}>();
  const [error, setError] = useState('');
  const [updateUser, {isLoading}] = useUpdateUserMutation();
  const {selectedField, setSelectedField} = useState<File | null>(null);

  const {handleSubmit, control} = useForm<User>({
    mode:'onChange',
    reValidateMode:'onBlur',
    defaultValues:{
      email:user?.email,
      name:user?.name,
      dateOfBirth:user?.dateOfBirth,
      bio:user?.bio,
      location:user?.location
    }
  })


  return (
    <Modal
    isOpen={isOpen}
    className={`${theme} font-foreground`}
    onClose={onClose}
    >
      <ModalContent>
      {(onClose) => (
      <>
        <ModalHeader className='flex flex-col gap-1'>
        Редактирование профиля
        </ModalHeader>
        <ModalBody className='flex flex-col gap-4'>
          <form>
        <Input
        control={control}
        name='email'
        label='Email'
        type='email'
        endContent={<MdOutlineMailOutline />}
        />
        <Input
        control={control}
        name='name'
        label='Имя'
        type='text'
        />
        <input 
        type="file" 
        placeholder='Выберете файл' 
        name='avatarUrl'
        />
        <Input
        control={control}
        name='dateOfBirth'
        label='Дата рождения'
        type='date'
        placeholder='Дата рождения'
        />
        <Controller
        control={control}
        name='bio'
        render={(field) => (
          <Textarea
          {...field}
          rows={4}
          placeholder='Ваша биография'
          />
        )}
        />
        <Input
        control={control}
        name='location'
        label='Местоположение'
        type='text'
        />
        <ErrorMessage error={error} />
        <div className='flex gap-2 justify-end'>
          <Button
          fullWidth
          color='primary'
          type='submit'
          isLoading={isLoading}
          >
            Обновить профиль
          </Button>
        </div>
          </form>

        </ModalBody>
      </>
      )}
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;