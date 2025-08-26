import { Link } from '@heroui/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@heroui/button';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/input/input';
import { useLazyCurrentQuery, useLoginMutation } from '@/app/services/userApi';
import { hasErrorField } from '@/app/utils/hasErrorFields';
import ErrorMessage from '@/components/error-message';

type Login = {
  email:string;
  password:string
}
type Props = {
  setSelected: (value:string) => void
}


const Login: React.FC<Props> = ({setSelected}) => {

  const {
    handleSubmit,
    control,
    formState:{errors}
  } = useForm<Login>({
    mode:'onChange',
    reValidateMode:'onBlur',
    defaultValues:{email:'', password:''}
  })

  const [login, {isLoading}] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [triggerCurrentUser] = useLazyCurrentQuery();

  const onSubmit = async(data:Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentUser();
      navigate('/');

    } catch (error) {
      if(hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Input 
      control={control}
      name='email'
      label='Email'
      type='email'
      required='Обязательное поле'
      />
      <Input 
      control={control}
      name='password'
      label='Пароль'
      type='password'
      required='Обязательное поле'
      />
      <ErrorMessage error={error}/>
      <p className="text-center text-small">
        Нет аккаунта? {' '}
        <Link
        size='sm'
        className='cursor-pointer'
        onPress={() => setSelected('sign-up')}
        >
        Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color='primary' isLoading={isLoading } type='submit'>
          Войти
        </Button>
        </div>
    </form>
  );
};

export default Login;