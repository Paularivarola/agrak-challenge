import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

interface PropsLoading {
  repeatSkeleton?: number;
  id?: string;
}
const Loading = ({ repeatSkeleton = 5, id = 'loading' }: PropsLoading) => {
  const skeletonList = Array.from({ length: repeatSkeleton }, () => 1);

  return (
    <>
      {skeletonList.map((_, index) => (
        <Box key={`skeletonList${index}-${id}`} padding="6" display="flex" alignItems="center" data-testid={id}>
          <SkeletonCircle size="50px" width="50px" />
          <Flex ml="4" minWidth="800px">
            <Skeleton height="40px" width="100px" margin="0 44px" />
            <Skeleton height="40px" width="100px" margin="0 44px" />
            <Skeleton height="40px" width="100px" margin="0 44px" />
            <Skeleton height="40px" width="100px" margin="0 44px" />
            <Skeleton height="40px" width="100px" margin="0 44px" />
            <Skeleton height="40px" width="100px" margin="0 44px" />
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default Loading;
