import { Link } from '@heroui/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@heroui/button';
import Input from '@/components/input/input';

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
    formState:{errors, isSubmitting}
  } = useForm<Login>({
    mode:'onChange',
    reValidateMode:'onBlur',
    defaultValues:{email:'', password:''}
  })

  const onSubmit:SubmitHandler<Login> = async(data:Login) => {
    try {
      
    } catch (error) {
      
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
      name='password '
      label='Пароль'
      type='password'
      required='Обязательное поле'
      />
      <p className="text-center text-small">
        Нет аккаунта?{' '}
        <Link
        size='sm'
        className='cursor-pointer'
        onPress={() => setSelected('sign-up')}
        >
        Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color='primary' disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Войти' : 'Вход'}
        </Button>
        </div>
    </form>
  );
};

export default Login;