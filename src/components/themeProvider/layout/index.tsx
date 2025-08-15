import { Outlet } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/system';
import Container from '@/components/container';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

const Layout = () => {
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