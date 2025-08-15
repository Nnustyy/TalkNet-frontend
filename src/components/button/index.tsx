import React from 'react';
import {Button as HeroButton} from '@heroui/react'

type Props = {
  children: React.ReactElement,
  icon?: JSX.Element,
  fullWidth?:boolean,
  type?:'submit' | 'reset' | 'button',
  className?:string,
  color?:"default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
}

const Button:React.FC<Props> = ({children, icon, fullWidth, type, className, color}) => {
  return (
    <HeroButton className={className} color={color} fullWidth={fullWidth} startContent={icon} type={type} size='lg' variant='light' >
      {children}
    </HeroButton>
  );
};

export default Button;