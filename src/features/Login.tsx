import Input from '@/components/input/input';
import React from 'react';
import { useForm } from 'react-hook-form';

type Login = {
  email:string,
  password:string
}

type Props = {
  setSelected: (value:string) => void
}

const Login:React.FC<Props> = () => {

  const {handleSubmit,control, formState:{errors}} = useForm<Login>({
    mode:'onChange',
    reValidateMode:'onBlur',
    defaultValues:{
      email:'',
      password:''
    }
  })

  return (
    <form className='flex flex-col gap-4'>
      <Input
      control={control}
      
      />
    </form>
  );
};

export default Login;