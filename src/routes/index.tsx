import { lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { RoutesWithNotFound } from '../components/NotFound/RoutesWithNotFound';
import { PublicRoutes } from '../models/routes';

const Home = lazy(() => import('../page/Home'));
const UserSave = lazy(() => import('../page/UserSave'));

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route index path="/" element={<Home />} />
        <Route path={`${PublicRoutes.USER_CREATE}/:id?`} element={<UserSave />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default Routes;
