import { Outlet, useNavigate } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/system';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from '@/components/container';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import { selectIsAuthenticated, selectUser } from '@/features/user/userSlice';

const Layout = () => {
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/auth')
    }
  },[])

  return (
    <HeroUIProvider>
      <Header/> 
      <Container>
        <div className="flex-2 p-4">
          <Navbar/>
        </div>
        <div className='flex-1 p-4'>
          <Outlet/>
        </div>
        {/* <div>
          
        </div> */}
      </Container>
    </HeroUIProvider>
  );
};

export default Layout;