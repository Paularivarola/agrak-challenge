import { Suspense } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import ErrorBoundary from '../components/ErrorBoundary';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from '../routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
      retryDelay: attempt => attempt * 1000,
    },
  },
});
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<span>Cargando..</span>}>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <Routes />
            </ChakraProvider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

