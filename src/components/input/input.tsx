import React from 'react';
import {Control, useController} from 'react-hook-form'
import {Input as HeroInput} from '@heroui/react'


type Props = {
  name:string,
  placeholder?:string,
  type?:string,
  label:string,
  control:Control<any>,
  required?:string,
  endContent?:JSX.Element
}

const Input:React.FC<Props> = ({name,placeholder, type, label, control, required='', endContent}) => {

  const {
    field,
    fieldState: {invalid}, 
    formState: {errors}} = useController({
    name,
    control,
    rules: {
      required
    }
  })

  return (
    <HeroInput 
    id={name}
    placeholder={placeholder}
    type={type}
    label={label}    
    value={field.value}
    name={field.name}
    isInvalid={invalid}
    onChange={field.onChange}
    onBlur={field.onBlur}
    errorMessage={`${errors[name]?.message ?? ''}`}
    />
  );
};

export default Input;