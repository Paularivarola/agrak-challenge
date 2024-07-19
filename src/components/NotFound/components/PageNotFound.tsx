import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../../models/routes';
import { Button } from '@chakra-ui/react';

import { TextPageNotFound } from '../../../constants/generalText';
export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1>{TextPageNotFound.title}</h1>
        <h2>{TextPageNotFound.subTitle}</h2>
      </div>
      <h3>Esta página no existe.</h3>
      <Button onClick={() => navigate(PublicRoutes.HOME)} sx={{ marginTop: '25px' }}>
        {TextPageNotFound.labelButton}
      </Button>
    </div>
  );
};
export default PageNotFound;
