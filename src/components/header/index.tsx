import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import React, { useContext } from 'react';
import {FaRegMoon, FaRegSun,} from 'react-icons/fa'
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@heroui/button';
import { ThemeContext } from '../themeProvider';
import { logout, selectIsAuthenticated } from '@/features/user/userSlice';
import { FcGlobe } from "react-icons/fc";

const Header = () => {

  const {theme, toggleTheme} = useContext(ThemeContext);
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/auth')
  }


  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit mr-2">TalkNet</p>
          <FcGlobe size={20}/>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem className='lg:flex text-3xl cursor-pointer' onClick={() => toggleTheme()} > 
        {theme === 'light' ? <FaRegMoon/> : <FaRegSun/> }
          </NavbarItem>
          <NavbarItem>
            {isAuthenticated && (
              <Button
              color='default'
              variant='flat'
              className='gap-2'
              onPress={handleLogout}
              >
                <CiLogout/> <span>Выйти</span>
              </Button>
            )}
          </NavbarItem>
          </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Header;