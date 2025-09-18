import { useParams } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineMailOutline } from "react-icons/md";
import Input from '../input/input';
import ErrorMessage from '../error-message';
import { ThemeContext } from '../themeProvider';
import { User } from '@/types';
import { useUpdateUserMutation } from '@/app/services/userApi';
import { hasErrorField } from '@/app/utils/hasErrorFields';


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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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


  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null) {
      setSelectedFile(e.target.files[0]);
    }
  }

  const onSubmit  = async (data:User) => {
    if(id) {
      try {
        const formData = new FormData();
        
        data.name && formData.append('name', data.name);
        data.email && data.email !== user?.email && formData.append('email', data.email);
        data.bio && formData.append('bio', data.bio);
        data.dateOfBirth && formData.append('dateOfBirth', 
          new Date(data.dateOfBirth).toISOString()
        )
        data.location && formData.append('location', data.location);
        selectedFile && formData.append('avatar', selectedFile)

        await updateUser({userData:formData, id}).unwrap();
        onClose();
      } catch (error) {
        if(hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
  }


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
        <ModalBody>
          <form 
          className='flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
          >
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
        {/* <input
        type='file'
        name='avatarUrl'
        className='border-1.5'
        onChange={handleFileChange}
        /> */}

        <div className="relative inline-block">
  <input 
    type="file" 
    id="fileInput" 
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
    onChange={handleFileChange}
  />

  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition">
    Загрузить файл
  </button>
</div>
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
        <ModalFooter>
          <Button 
          color='danger'
          variant='light'
          onPress={() => onClose() }>
            Закрыть
          </Button>
        </ModalFooter>
      </>
      )}
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;