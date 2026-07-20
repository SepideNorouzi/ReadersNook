import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./app/Router";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
