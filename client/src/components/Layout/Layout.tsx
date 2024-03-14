import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
  return (
    <>
      <div className="bg-cottonCandy min-h-screen">
        <header>
          <Menu />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
