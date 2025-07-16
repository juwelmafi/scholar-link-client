import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client instance
const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
