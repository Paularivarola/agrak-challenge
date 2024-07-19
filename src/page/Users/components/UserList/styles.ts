import { Box, Thead } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledBox = styled(Box)`
  border: 1px solid black;
  border-radius: 2rem;
  width: 85vw;
  padding: 2rem;
  margin-top: 1rem;
`;

export const StickyThead = styled(Thead)`
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
`;