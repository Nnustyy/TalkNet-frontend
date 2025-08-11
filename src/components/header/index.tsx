import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import React, { useContext } from 'react';
import {FaRegMoon, FaRegSun,} from 'react-icons/fa'
import { ThemeContext } from '../themeProvider';


const Header = () => {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="fot-bold text-inherit">TalkNet</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem className='lg:flex text-3xl cursor-pointer '> 
        {theme === 'light' ? <FaRegMoon/> : <FaRegSun/> }
          </NavbarItem>
          <NavbarItem>
            
          </NavbarItem>
          </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Header;