import React from 'react';
import {User as HeroUser} from "@heroui/user";
import { BASE_URL } from '@/constants';

type Props = {
  name:string,
  avatarUrl:string,
  description?:string,
  className?:string

}


const User:React.FC<Props> = ({
  name = '',
  avatarUrl = '' ,
  description = '',
  className = ''
}) => {
  return (
    <HeroUser 
    name={name}
    className={className}
    description = {description}
    avatarProps={{src: `${BASE_URL}${avatarUrl}`}}
    >
      
    </HeroUser>
  );
};



export default User;